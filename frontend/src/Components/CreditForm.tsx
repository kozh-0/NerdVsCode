import { Button, Form, Input, Tooltip, Typography, message } from "antd";
import axios, { AxiosError } from "axios";
import { API_URL, LS_Keys } from "../help";
const { Text } = Typography;

interface FormData {
  passportDetails: string;
  email: string;
  telegram: string;
}

export default function CreditForm() {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div>
      {contextHolder}
      <Form
        style={{ maxWidth: 600 }}
        onFinish={(formData: FormData) => {
          axios
            .post(`${API_URL}api/clients`, formData)
            .then((res) => {
              messageApi.success({
                content: `Одобрено! Ваш кредитный рейтинг - ${res.data.rating}`,
              });
              localStorage.setItem(LS_Keys.rating, res.data.rating);
              localStorage.setItem(LS_Keys.telegram, formData.telegram);
              localStorage.setItem(LS_Keys.email, formData.email);
              localStorage.setItem(LS_Keys.passportDetails, formData.passportDetails);

              setTimeout(() => {
                window.location.reload();
              }, 1000);
              return res;
            })
            .catch((err: AxiosError) => {
              messageApi.error({
                content:
                  err.response?.status === 500
                    ? "Некорректные данные"
                    : "Что-то пошло не так ¯\\_(ツ)_/¯",
              });
              return err;
            });
        }}
        autoComplete="off"
      >
        <Tooltip
          title={
            <ul className="form_tooltip">
              <li>
                Высокий: <Text copyable>564521 9847</Text>
              </li>
              <li>
                Средний: <Text copyable>759842 3564</Text>
              </li>
              <li>
                Низкий: <Text copyable>895468 1287</Text>
              </li>
            </ul>
          }
          // placement="right"
        >
          <Form.Item
            label="Паспортные данные"
            name="passportDetails"
            rules={[{ required: true, message: "Введите паспортные данные!" }]}
          >
            <Input />
          </Form.Item>
        </Tooltip>
        <Tooltip
          title="Телеграм и почта нужны настоящие для отправки кредитного предложения"
          // placement="right"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Введите email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telegram"
            name="telegram"
            rules={[{ required: true, message: "Введите telegram!" }]}
          >
            <Input />
          </Form.Item>
        </Tooltip>

        <Form.Item style={{ textAlign: "right", margin: 0 }}>
          <Button type="primary" htmlType="submit" size="large">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

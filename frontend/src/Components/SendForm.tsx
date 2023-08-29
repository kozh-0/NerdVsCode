import { Button, Form, Input, Tooltip, Typography, message } from "antd";
import axios from "axios";
import { LS_Keys } from "../help";

const { Text } = Typography;

interface SendFormProps {
  monthlyPayment: number;
  rate: number;
  initFee: number;
  year: number;
}

export default function SendForm({ monthlyPayment, rate, initFee, year }: SendFormProps) {
  const [messageApi, contextHolder] = message.useMessage();

  //   начальные значения сформитровать
  console.log({ monthlyPayment, rate, initFee, year });

  const INIT = {
    telegram: localStorage.getItem(LS_Keys.telegram),
    email: localStorage.getItem(LS_Keys.email),
    passportDetails: localStorage.getItem(LS_Keys.passportDetails),
    monthlyPayment,
    rate: rate * 100,
    initFee,
    year,
  };
  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={INIT}
        onFinish={(formData: FormData) => {
          console.log(formData);
          return;
          //   axios
          //     .post("http://localhost:8080/api/clients", formData)
          //     .then((res) => {
          //       console.log("Success:", res);
          //       messageApi.success({
          //         content: `Одобрено! Ваш кредитный рейтинг - ${res.data.rating}`,
          //       });
          //     //   localStorage.setItem(LS_Keys.rating, res.data.rating);
          //       //   localStorage.setItem(LS_Keys.telegram, formData.telegram);
          //       //   localStorage.setItem(LS_Keys.email, formData.email);
          //       // localStorage.setItem(LS_Keys.passportDetails, formData.email);

          //       setTimeout(() => {
          //         window.location.reload();
          //       }, 1000);
          //       return res;
          //     })
          //     .catch((err) => {
          //       console.log("ERR", err);
          //       messageApi.error({ content: "Что-то пошло не так ¯\\_(ツ)_/¯" });
          //       return err;
          //     });
        }}
        onFinishFailed={(errInfo) => console.error(errInfo)}
        autoComplete="off"
      >
        {/* <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: "Введите фамилию!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: "Введите имя!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Отчество"
          name="patronymic"
          rules={[{ required: true, message: "Введите отчество!" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item label="Имя" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Паспортные данные" name="passportDetails">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ежемесячный платеж ₽" name="monthlyPayment">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ставка (%)" name="rate">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Первоначальный взнос ₽" name="initFee">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Срок (в годах)" name="year">
          <Input disabled />
        </Form.Item>
        <Tooltip
          title="Телеграм и почта нужны настоящие для отправки кредитного предложения"
          placement="right"
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

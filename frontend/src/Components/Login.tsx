import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { LS_Keys } from "../help";

interface LoginData {
  username: string;
  password: string;
  passwordConfirm: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
}

interface LoginProps {
  setModal: (obj: React.SetStateAction<{ isOpen: boolean; confirmLoading: boolean }>) => void;
  modal: { isOpen: boolean; confirmLoading: boolean };
}

export default function Login({ setModal, modal }: LoginProps) {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={(formData: LoginData) => {
          setModal((p) => ({ ...p, confirmLoading: true }));
          console.log(formData);
          axios
            .post("http://localhost:8080/api/users", formData)
            .then((res) => {
              console.log("Success:", res);
              localStorage.setItem(LS_Keys.rating, res.data.rating);
              messageApi.success({
                content: `Одобрено! Ваш кредитный рейтинг - ${res.data.rating}`,
              });
              setModal({ isOpen: false, confirmLoading: false });
              return res;
            })
            .catch((err) => {
              console.log("ERR", err);
              messageApi.error({ content: "Что-то пошло не так ¯\\_(ツ)_/¯" });
              setModal((p) => ({ ...p, confirmLoading: false }));
              return err;
            });
        }}
        onFinishFailed={(errInfo) => console.error(errInfo)}
        autoComplete="off"
      >
        <Form.Item
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
        </Form.Item>

        <Form.Item
          label="Паспортные данные"
          name="passportDetails"
          rules={[{ required: true, message: "Введите паспортные данные!" }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item style={{ textAlign: "right", margin: 0 }}>
          <Button type="primary" htmlType="submit" loading={modal.confirmLoading} size="large">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

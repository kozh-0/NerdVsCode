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
          setTimeout(() => {
            axios
              .post("http://localhost:8080/api/users", { body: formData })
              .then((res) => {
                console.log("Success:", res);
                localStorage.setItem(LS_Keys.username, formData.username);
                messageApi.success({ content: "Вы успешно зарегистрировались!" });
                setModal({ isOpen: false, confirmLoading: false });
                return res;
              })
              .catch((err) => {
                console.log("ERR", err);
                messageApi.error({ content: "Что-то пошло не так ¯\\_(ツ)_/¯" });
                setModal((p) => ({ ...p, confirmLoading: false }));
                return err;
              });
          }, 2000);
        }}
        onFinishFailed={(errInfo) => console.error(errInfo)}
        autoComplete="off"
      >
        <Form.Item
          label="ФИО"
          name="username"
          rules={[{ required: true, message: "Введите ФИО!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Паспортные данные"
          name="passport"
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
          <Button type="primary" htmlType="submit" loading={modal.confirmLoading}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

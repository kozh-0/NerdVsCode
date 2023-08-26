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

export default function Login({
  setIsAuth,
}: {
  setIsAuth: (value: React.SetStateAction<boolean>) => void;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="auth">
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={(formData: LoginData) =>
          axios
            .post("http://localhost:8080/api/users", { body: formData })
            .then((res) => {
              console.log("Success:", res);
              localStorage.setItem(LS_Keys.username, formData.username);
              setIsAuth(true);
              messageApi.success({ content: "Вы успешно зарегистрировались!" });
              return res;
            })
            .catch((err) => {
              console.log("ERR", err);
              messageApi.error({ content: "Что-то пошло не так ¯\\_(ツ)_/¯" });
              return err;
            })
        }
        onFinishFailed={(errInfo) => console.error(errInfo)}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="passwordConfirm"
          rules={[{ required: true, message: "Repeat your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Patronymic"
          name="patronymic"
          rules={[{ required: true, message: "Please input your patronymic!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

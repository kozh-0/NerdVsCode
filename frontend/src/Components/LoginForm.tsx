import { Button, Form, Input, Tooltip, message } from "antd";
import axios from "axios";
import { LS_Keys } from "../help";
import { useEffect, useState } from "react";

interface FormSendProps {
  monthlyPayment: number;
  rate: number;
  initFee: number;
  year: number;
  rubPrice: number;
  carName: string;
  carId: number;
  setModal: (obj: React.SetStateAction<{ isOpen: boolean; confirmLoading: boolean }>) => void;
}

interface SendDataForm extends FormSendProps {
  email: string;
  telegram: string;
  name: string;
  passportDetails: string;
}

export default function LoginForm({
  monthlyPayment,
  rate,
  initFee,
  year,
  rubPrice,
  carName,
  carId,
  setModal,
}: FormSendProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [resetKey, setRestKey] = useState(0);

  const INIT = {
    telegram: localStorage.getItem(LS_Keys.telegram),
    email: localStorage.getItem(LS_Keys.email),
    passportDetails: localStorage.getItem(LS_Keys.passportDetails),
    monthlyPayment,
    rate: rate * 100,
    initFee,
    year,
    carPrice: rubPrice,
    carName,
    carId,
    name: "",
  };

  useEffect(() => setRestKey((p) => p + 1), [monthlyPayment]);

  return (
    <div key={resetKey}>
      {contextHolder}
      <Form
        style={{ maxWidth: 600 }}
        initialValues={INIT}
        onFinish={(formData: Omit<SendDataForm, "setModal">) => {
          axios
            .post("http://localhost:8080/api/orders", formData)
            .then((res) => {
              setModal({ confirmLoading: false, isOpen: false });
              messageApi.success({ content: "Заявка отправлена!" });
              return res;
            })
            .catch((err) => {
              messageApi.error({ content: "Что-то пошло не так ¯\\_(ツ)_/¯" });
              return err;
            });
        }}
        autoComplete="off"
      >
        <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Введите имя!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Машины" name="carName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Цена машины ₽" name="carPrice">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Цена машины"
          name="carPrice"
          style={{ height: 0, margin: 0, opacity: 0, pointerEvents: "none" }}
        >
          <Input disabled />
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

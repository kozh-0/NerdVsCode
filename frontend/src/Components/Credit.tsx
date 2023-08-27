import { Button, Modal, Radio } from "antd";
import { useState } from "react";
import Login from "./Login";

const radioOptions = [
  { label: "Автокредит 8%", value: 0.08 },
  { label: "Потреб кредит 10%", value: 0.1 },
  { label: "Первая машина 4%", value: 0.04 },
];

export default function Credit({ price }: { price: number }) {
  const [modal, setModal] = useState({ isOpen: false, confirmLoading: false });
  const [rate, setRate] = useState(0.08);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src="https://yt3.googleusercontent.com/ytc/AOPolaRXAKJt-rFPOjizQl5FOGX8ylGNPpRMhJaaY9EbTQ=s900-c-k-c0x00ffffff-no-rj"
          alt="ПСБ"
          style={{ width: "50px", borderRadius: "7px" }}
        />
        &nbsp;Предложение от ПСБ
      </h2>
      <Radio.Group
        options={radioOptions}
        onChange={(e) => {
          console.log(e);
          setRate(e.target.value);
        }}
        value={rate}
        optionType="button"
      />
      <div className="center">
        <p>
          {price * rate}₽ сегодня <br />
          {/* 31 649Р потом */}
        </p>
        <Button type="primary" onClick={() => setModal((p) => ({ ...p, isOpen: true }))}>
          Оформить
        </Button>
      </div>

      <Modal
        title="Basic Modal"
        open={modal.isOpen}
        footer={[
          <Button key="back" onClick={() => setModal({ confirmLoading: false, isOpen: false })}>
            Назад
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modal.confirmLoading}
            onClick={() => {
              setModal((p) => ({ ...p, confirmLoading: true }));
              setTimeout(() => {
                setModal({ confirmLoading: false, isOpen: false });
              }, 2000);
            }}
          >
            Отправить
          </Button>,
        ]}
      >
        <Login />
      </Modal>
    </div>
  );
}

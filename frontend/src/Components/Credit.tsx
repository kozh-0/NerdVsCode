import { Button, Modal, Radio, Slider } from "antd";
import { useState } from "react";
import Login from "./Login";
import declOfNum from "../help";

export default function Credit({ price }: { price: number }) {
  const [modal, setModal] = useState({ isOpen: false, confirmLoading: false });
  const [rate, setRate] = useState(0.08);
  const [year, setYear] = useState(5);

  const radioOptions = [
    { label: "Автокредит 8%", value: 0.08 },
    { label: "Потреб кредит 10%", value: 0.1 },
    { label: "Первая машина 4%", value: 0.04 },
  ];

  const months = year * 12;
  const ratioA = +(
    ((rate / 12) * (1 + rate / 12) ** months) /
    ((1 + rate / 12) ** months - 1)
  ).toFixed(2);

  console.log(ratioA);

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
        onChange={(e) => setRate(e.target.value)}
        value={rate}
        optionType="button"
      />
      <div className="center">
        <Slider
          style={{ width: "84%" }}
          value={year}
          min={1}
          max={10}
          onChange={(val) => {
            console.log(val);
            setYear(val);
          }}
        />
        {year} лет
      </div>
      <div className="center">
        <p>
          {price * rate}₽ сегодня на {year} {declOfNum(year, ["год", "года", "лет"])}
          <br />
          {/* {price * ratioA}₽ сегодня <br /> */}
          {/* 31 649Р потом */}
        </p>
        <Button
          type="primary"
          onClick={() => {
            Modal.info({
              title: "Расчитать ваш кредит",
              open: modal.isOpen,
              closable: true,
              centered: true,
              content: <Login modal={modal} setModal={setModal} />,
              footer: null,
            });
            setModal((p) => ({ ...p, isOpen: true }));
          }}
        >
          Оформить
        </Button>
      </div>
    </div>
  );
}

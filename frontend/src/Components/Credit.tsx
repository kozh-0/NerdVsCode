import { Button, Modal, Radio, Slider, Tooltip, Typography } from "antd";
import { useState } from "react";
import Login from "./Login";
import declOfNum, { LS_Keys } from "../help";
import { creditRates } from "../help";
import { QuestionCircleTwoTone } from "@ant-design/icons";
const { Text } = Typography;

type LS_RATING = "Высокий" | "Низкий" | "Средний" | null;

export default function Credit({ price }: { price: number }) {
  const rubPrice = price * 100;
  const scoring = localStorage.getItem(LS_Keys.rating) as LS_RATING;
  const userRating = creditRates[scoring as keyof typeof creditRates];

  const [modal, setModal] = useState({ isOpen: false, confirmLoading: false });

  const [rate, setRate] = useState(userRating ? userRating.rate : 0.1);
  const [year, setYear] = useState(5);

  const initFee = userRating ? Math.round(rubPrice * userRating.initialFee) : rubPrice * 0.2;
  const [initialFee, setInitialFee] = useState(initFee);

  const radioOptions = [
    { label: `Потреб кредит ${rate * 100}%`, value: rate },
    { label: "Автокредит 8%", value: 0.08, disabled: userRating ? false : true },
    { label: "Первая машина 4%", value: 0.04, disabled: true },
  ];
  const months = year * 12;
  const monthsRate = rate / 12;

  const ratioA = +(
    (monthsRate * (1 + monthsRate) ** months) /
    ((1 + monthsRate) ** months - 1)
  ); /* .toFixed(2) */

  const creditBody = (rubPrice - initialFee) * ratioA;

  console.log(rubPrice, initialFee, ratioA, userRating);
  console.log(creditRates, radioOptions);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/psb.jpg" alt="ПСБ" style={{ width: "50px", borderRadius: "7px" }} />
        &nbsp;Предложение от ПСБ
      </h2>
      <div className="center" style={{ justifyContent: "space-evenly" }}>
        <Radio.Group
          // buttonStyle="solid"
          style={{ display: "flex", justifyContent: "center" }}
          options={radioOptions}
          onChange={(e) => setRate(e.target.value)}
          value={rate}
          optionType="button"
        />
        {!userRating && (
          <Tooltip
            title='Для просмотра заблокированных продуктов, нажмите на кнопку "Узнать"'
            placement="right"
          >
            <QuestionCircleTwoTone style={{ transform: "scale(1.5)" }} />
          </Tooltip>
        )}
      </div>
      <div style={{ marginTop: "12px" }}>
        Срок
        <div className="center">
          <Slider
            style={{ width: "84%" }}
            value={year}
            min={1}
            max={10}
            onChange={(val) => setYear(val)}
          />
          {year} {declOfNum(year, ["год", "года", "лет"])}
        </div>
      </div>
      Первоначальный взнос
      <div className="center">
        <Slider
          style={{ width: "80%" }}
          value={initialFee}
          min={initFee}
          max={rubPrice * 0.6}
          step={10000}
          onChange={(val) => setInitialFee(val)}
        />
        <Tooltip title="Вы не можете внести более 60% от стоимости машины" placement="right">
          {Math.round(initialFee)}₽
        </Tooltip>
      </div>
      <div className="center" style={{ marginTop: "10px" }}>
        <Tooltip
          title={
            userRating
              ? "Предлагаем вам такие условия"
              : 'Это усредненные значения, для уточнения условий нажмите на кнопку "Узнать"'
          }
          placement="left"
        >
          <Text keyboard style={{ fontSize: "20px" }}>
            {Math.round(creditBody)}₽
          </Text>{" "}
          в месяц на {year} {declOfNum(year, ["год", "года", "лет"])}
        </Tooltip>
        {userRating ? (
          <Button size="large" type="primary" danger style={{ fontWeight: "bold" }}>
            Оформить
          </Button>
        ) : (
          <Button
            size="large"
            type="primary"
            onClick={() => {
              Modal.info({
                // maskClosable: true,
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
            Узнать
          </Button>
        )}
      </div>
    </div>
  );
}

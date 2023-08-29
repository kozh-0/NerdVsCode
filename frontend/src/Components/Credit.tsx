import { Button, Modal, Radio, Slider, Tooltip, Typography } from "antd";
import { useState } from "react";
import CreditForm from "./CreditForm";
import declOfNum, { LS_Keys } from "../help";
import { creditScoring } from "../help";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import SendForm from "./SendForm";
import CreditTable from "./CreditTable";
const { Text } = Typography;

interface CarProps {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: string[];
  owners: number;
  image: string;
}

type LS_RATING = "Высокий" | "Низкий" | "Средний" | null;

export default function Credit({ car }: { car: CarProps }) {
  const rubPrice = car.price * 100;
  const scoring = localStorage.getItem(LS_Keys.rating) as LS_RATING;
  const userRating = creditScoring[scoring as keyof typeof creditScoring];

  const [modal, setModal] = useState({ isOpen: false, confirmLoading: false });

  const [rate, setRate] = useState(userRating ? userRating.rate : 0.1);
  const duplicateRate = userRating ? userRating.rate : 0.1;
  const [year, setYear] = useState(5);

  const initFee = userRating ? Math.round(rubPrice * userRating.initialFee) : rubPrice * 0.2;
  const [initialFee, setInitialFee] = useState(initFee);

  const radioOptions = [
    { label: `Потреб кредит ${duplicateRate * 100}%`, value: duplicateRate },
    { label: "Автокредит 8%", value: 0.08, disabled: userRating ? false : true },
    { label: "Первая машина 4%", value: 0.04, disabled: true },
  ];

  const months = year * 12;
  const monthsRate = rate / 12;

  const ratioA = +((monthsRate * (1 + monthsRate) ** months) / ((1 + monthsRate) ** months - 1));

  const monthlyPayment = (rubPrice - initialFee) * ratioA;

  return (
    <div style={{ justifyContent: "center", alignItems: "flex-start" }} className="center">
      <div style={{ marginRight: "4%" }}>
        <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/psb.jpg" alt="ПСБ" style={{ width: "50px", borderRadius: "7px" }} />
          &nbsp;СмартКредит от ПСБ
        </h2>
        <div className="center" style={{ justifyContent: "space-evenly" }}>
          <Radio.Group
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
          <Tooltip
            title={`Вы не можете внести более 60% и менее ${
              userRating ? userRating.initialFee * 100 : 0.2 * 100
            }% от стоимости машины`}
            placement="right"
          >
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
              {Math.round(monthlyPayment)}₽
            </Text>{" "}
            в месяц на {year} {declOfNum(year, ["год", "года", "лет"])}
          </Tooltip>

          <Modal
            style={{ position: "relative" }}
            footer={[
              <Button
                style={{ position: "absolute", left: 20, bottom: 30 }}
                size="large"
                danger
                key="back"
                onClick={() => setModal({ confirmLoading: false, isOpen: false })}
              >
                Отменить
              </Button>,
            ]}
            open={modal.isOpen}
            title="Отправка данных"
          >
            <SendForm
              carId={car.id}
              carName={`${car.make} ${car.model}`}
              rubPrice={rubPrice}
              year={year}
              initFee={initialFee}
              rate={rate}
              monthlyPayment={Math.round(monthlyPayment)}
              setModal={setModal}
            />
          </Modal>
          {userRating ? (
            <Button
              size="large"
              type="primary"
              danger
              style={{ fontWeight: "bold" }}
              onClick={() => {
                setModal((p) => ({ ...p, isOpen: true }));
              }}
            >
              Оформить
            </Button>
          ) : (
            <Button
              size="large"
              type="primary"
              onClick={() => {
                Modal.info({
                  title: "Расчитать ваш кредит",
                  open: modal.isOpen,
                  closable: true,
                  centered: true,
                  content: <CreditForm />,
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

      {userRating && (
        <CreditTable
          year={year}
          creditBody={rubPrice - initialFee}
          monthlyPayment={Math.round(monthlyPayment)}
        />
      )}
    </div>
  );
}

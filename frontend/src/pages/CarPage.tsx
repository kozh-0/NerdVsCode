import { Button, Descriptions, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../help/data";
import Credit from "../Components/Credit";
const { Item } = Descriptions;
const { Title } = Typography;

export default function CarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <h2>Что-то пошло не так</h2>;

  const car = data[id as any];

  return (
    <div>
      <Button type="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className="car_info">
        <div
          className="image"
          style={{ background: `#333 url(${car.image}) no-repeat right top / cover` }}
        />
        <div className="car_info_parent">
          <div className="car_info_parent_title">
            <Title level={1}>
              {car.make} {car.model}
            </Title>

            <Title level={2} className="price_tag">
              {car.price * 100} руб.
            </Title>
          </div>

          <Descriptions
            style={{ maxWidth: "100%" }}
            column={1}
            bordered
            layout="horizontal"
            size="middle"
          >
            <Item label="Год выпуска">{car.year}</Item>
            <Item label="Владельцев">{car.owners}</Item>
            <Item label="Двигатель">{car.engine}</Item>
            <Item label="Лошадиных сил">{car.horsepower}</Item>
            <Item label="Коробка">{car.transmission}</Item>
            <Item label="Тип топлива">{car.fuelType}</Item>
            <Item label="Опции">
              {car.features.map((el) => (
                <div key={el}>{el}</div>
              ))}
            </Item>
          </Descriptions>
        </div>
      </div>

      <Credit car={car} />
    </div>
  );
}

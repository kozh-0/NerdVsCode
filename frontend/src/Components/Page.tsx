import { useQuery } from "@tanstack/react-query";
import { Button, Descriptions, Result, Spin, Typography } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../help/data";
import Credit from "./Credit";
const { Item } = Descriptions;
const { Text, Title } = Typography;

export default function Page() {
  const { id } = useParams();
  const navigate = useNavigate();

  //   const { data, isLoading, error } = useQuery({
  //     queryFn: () =>
  //       axios
  //         .get(`https://freetestapi.com/api/v1/cars/${id}`)
  //         .then((res) => res)
  //         .catch((err) => err),
  //     queryKey: ["cars", id],
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //   });

  //   useEffect(() => {
  //     axios("https://freetestapi.com/api/v1/cars")
  //       .then((res) => {
  //         console.log(res);
  //         return res;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return err;
  //       });
  //   }, []);

  //   if (isLoading) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  //   if (error) {
  //     return (
  //       <Result
  //         status="error"
  //         title="Что-то пошло не так"
  //         // subTitle="Please check and modify the following information before resubmitting."
  //         // extra={[
  //         //   <Button type="primary" key="console">
  //         //     Go Console
  //         //   </Button>,
  //         //   <Button key="buy">Buy Again</Button>,
  //         // ]}
  //       />
  //     );
  //   }
  if (!id) return <h2>Что-то не так</h2>;

  const car = data[id as any];
  console.log(car);

  return (
    <div>
      <Button type="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className="car_info">
        <img src={car.image} alt={car.model} />
        <div style={{ marginLeft: "2%" }}>
          <div className="car_info_title">
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
      <Credit price={car.price} />
    </div>
  );
}

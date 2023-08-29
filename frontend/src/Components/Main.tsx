import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { data } from "../help/data";
import Meta from "antd/es/card/Meta";
const { Text } = Typography;

export default function Main() {
  const { data: kek } = useQuery({
    queryFn: () =>
      axios
        .get(`http://localhost:8080/api/users`)
        // .get(`https://freetestapi.com/api/v1/cars`)
        // .get(`https://myfakeapi.com/api/cars`)
        .then((res) => res)
        .catch((err) => err),
    queryKey: ["cars"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  //   if (isLoading) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  //   if (error) return <Result status="error" title="Что-то пошло не так" />;

  console.log(kek, data);

  return (
    <div className="center" style={{ justifyContent: "space-evenly" }}>
      {data.map((el) => (
        <Card
          key={el.id}
          style={{ width: 400, margin: "5px" }}
          cover={<img alt="example" src={el.image} />}
        >
          <Meta
            title={
              <div>
                {el.make} {el.model} <span style={{ float: "right" }}>{el.year}</span>
                <br />
                {el.horsepower}hp, {el.engine}
                <span style={{ float: "right" }}>{el.transmission}</span>
              </div>
            }
            description={
              <div className="center" style={{ width: "100%" }}>
                <Text keyboard>{el.price * 100}₽</Text>
                <Link to={`/car/${el.id - 1}`}>
                  <Button type="primary" style={{ float: "right" }}>
                    More
                  </Button>
                </Link>
              </div>
            }
          />
        </Card>
      ))}
    </div>
  );
}

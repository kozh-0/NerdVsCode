import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Card, Result, Spin } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { data } from "../help/data";
import Meta from "antd/es/card/Meta";

export default function Main() {
  //   const { data, isLoading, error } = useQuery({
  //     queryFn: () =>
  //       axios
  //         .get(`https://myfakeapi.com/api/cars`)
  //         .then((res) => res)
  //         .catch((err) => err),
  //     queryKey: ["cars"],
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //   });

  //   if (isLoading) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  //   if (error) return <Result status="error" title="Что-то пошло не так" />;

  console.log(data);

  return (
    <div>
      <h1>Main</h1>
      <div className="center">
        {data.map((el) => (
          <Card style={{ width: 400 }} cover={<img alt="example" src={el.image} />}>
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
                <div style={{ width: "100%" }}>
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
    </div>
  );
}

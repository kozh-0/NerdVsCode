import { useQuery } from "@tanstack/react-query";
import { Result, Spin } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Main() {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      axios
        .get(`https://myfakeapi.com/api/cars`)
        .then((res) => res)
        .catch((err) => err),
    queryKey: ["cars"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  if (error) return <Result status="error" title="Что-то пошло не так" />;

  console.log(data);

  return (
    <div>
      <h1>Main</h1>
      <div>
        {new Array(10).fill(0).map((_, idx) => (
          <div key={idx}>
            <Link to={`/car/${idx + 1}`}>car {idx + 1}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

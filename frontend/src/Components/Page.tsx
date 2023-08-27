import { useQuery } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Page() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      axios
        .get(`https://freetestapi.com/api/v1/cars/${id}`)
        .then((res) => res)
        .catch((err) => err),
    queryKey: ["cars", id],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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

  if (isLoading) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  if (error) {
    return (
      <Result
        status="error"
        title="Что-то пошло не так"
        // subTitle="Please check and modify the following information before resubmitting."
        // extra={[
        //   <Button type="primary" key="console">
        //     Go Console
        //   </Button>,
        //   <Button key="buy">Buy Again</Button>,
        // ]}
      />
    );
  }

  console.log(data);
  return (
    <div>
      <Button type="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h1>Тут будет тачка {id}</h1>
    </div>
  );
}

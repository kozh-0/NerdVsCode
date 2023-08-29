import { useQuery } from "@tanstack/react-query";
import { Result, Spin } from "antd";
import axios from "axios";

export default function ModalUsers() {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      axios(`http://localhost:8080/api/users`)
        .then((res) => res)
        .catch((err) => err),
    queryKey: ["users"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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

  return <div>ModalUsers</div>;
}

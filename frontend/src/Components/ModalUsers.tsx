import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Result, Spin, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
const { Text } = Typography;

interface UserI {
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  passportDetails: string;
  email: string;
  age: number;
  workExperience: number;
  loanSecurity: string;
  debtLoad: number;
  numberOpenLoans: number;
}

export default function ModalUsers() {
  const { data, isSuccess, error } = useQuery<{ data: UserI[] }>({
    queryFn: () =>
      axios(`http://localhost:8080/api/clients`)
        .then((res) => res)
        .catch((err) => err),
    queryKey: ["users"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (!isSuccess) return <Spin tip="Загрузка..." size="large" style={{ width: "100%" }} />;

  if (error) return <Result status="error" title="Что-то пошло не так" />;

  const users = data.data;

  return (
    <div>
      {users.map((el, idx) => (
        <Card style={{ marginTop: 16 }}>
          <Meta
            avatar={
              <Avatar size="large" src={`https://randomuser.me/api/portraits/lego/${idx}.jpg`} />
            }
            title={`${el.firstName} ${el.lastName} ${el.patronymic}`}
            description={
              <ul>
                <li>
                  Паспорт -{" "}
                  <Text copyable strong>
                    {el.passportDetails}
                  </Text>
                </li>
                <li>
                  Кредитный рейтинг - <Text strong>{el.debtLoad}</Text>
                </li>
              </ul>
            }
          />
        </Card>
      ))}
    </div>
  );
}

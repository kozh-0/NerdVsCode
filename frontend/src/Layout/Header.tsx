import { Menu, MenuProps, Modal } from "antd";
import { LS_Keys } from "../help";
import { LogoutOutlined, StarOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ModalUsers from "../Components/ModalUsers";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Header() {
  const rating = localStorage.getItem(LS_Keys.rating);

  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="/" style={{ fontSize: "30px", height: "100%" }} className="center">
          <img src="/favicon.ico" alt="" style={{ height: "38px", margin: "0 10px" }} />
          Cars
        </Link>
      ),
      key: "app",
    },
    {
      label: "Список доступных пользователей",
      key: "users",
      icon: <UsergroupAddOutlined />,
      onClick() {
        Modal.info({
          width: 500,
          title: "Список доступных пользователей",
          maskClosable: true,
          closable: true,
          content: (
            <QueryClientProvider client={new QueryClient()}>
              <ModalUsers />
            </QueryClientProvider>
          ),
        });
      },
    },
    {
      style: { marginLeft: "auto" },
      icon: <StarOutlined />,
      label: rating ? `Рейтинг ${rating}` : "Нет рейтинга",
      key: "rating",
    },
    {
      label: "Выйти",
      key: "Log out",
      icon: <LogoutOutlined />,
      onClick() {
        localStorage.removeItem(LS_Keys.rating);
        localStorage.removeItem(LS_Keys.email);
        localStorage.removeItem(LS_Keys.telegram);
        window.location.reload();
      },
    },
  ];
  return <Menu theme={"dark"} mode="horizontal" items={items} className="HEADER" />;
}

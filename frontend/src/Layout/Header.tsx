import { Button, Menu, MenuProps, Modal } from "antd";
import { LS_Keys } from "../help";
import { AppstoreOutlined, LogoutOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import ModalUsers from "../Components/ModalUsers";

export default function Header() {
  const rating = localStorage.getItem(LS_Keys.rating);
  const items: MenuProps["items"] = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Показать всех существующих пользователей",
      key: "app",
      icon: <AppstoreOutlined />,
      onClick() {
        Modal.info({
          content: <ModalUsers />,
        });
      },
    },
    {
      style: { marginLeft: "auto" },
      label: rating ? `Рейтинг ${rating}` : "Нет рейтинга",
      key: "rating",
    },
    {
      label: "Выйти",
      key: "Log out",
      icon: <LogoutOutlined />,
      onClick() {
        localStorage.removeItem(LS_Keys.rating);
        window.location.reload();
      },
    },
  ];
  return <Menu theme={"dark"} mode="horizontal" items={items} className="HEADER" />;
}

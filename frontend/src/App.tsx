import { useEffect, useState } from "react";
import Login from "./Components/Login";
import { Button, Typography } from "antd";
import { LS_Keys } from "./help";
import axios from "axios";

export default function App() {
  const username = localStorage.getItem(LS_Keys.username);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios("http://localhost:8080/api/users")
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  if (!username) return <Login setIsAuth={setIsAuth} />;

  return (
    <div className="App">
      <h1>
        Пользователь <Typography.Text keyboard>{username}</Typography.Text> авторизован
      </h1>
      <Button
        onClick={() => {
          localStorage.removeItem(LS_Keys.username);
          window.location.reload();
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
}

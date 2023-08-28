import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Page from "./Components/Page";

export default function App() {
  return (
    <div className="App">
      {/* <div className="center">
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
      </div> */}
      {/* <br /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/car/:id" element={<Page />} />
      </Routes>
    </div>
  );
}

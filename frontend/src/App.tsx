import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Page from "./Components/Page";
import Header from "./Layout/Header";

export default function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/car/:id" element={<Page />} />
        </Routes>
      </div>
    </>
  );
}

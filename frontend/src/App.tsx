import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Page from "./Components/Page";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { FloatButton } from "antd";

export default function App() {
  return (
    <main>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/car/:id" element={<Page />} />
        </Routes>
      </div>
      <Footer />
      <FloatButton.BackTop type="primary" />
    </main>
  );
}

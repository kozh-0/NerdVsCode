import { Button } from "antd";
import { LS_Keys } from "../help";

export default function Header() {
  return (
    <header>
      <div className="center">
        Header
        <Button
          onClick={() => {
            localStorage.removeItem(LS_Keys.rating);
            window.location.reload();
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}

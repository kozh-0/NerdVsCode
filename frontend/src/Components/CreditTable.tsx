import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { CSVLink } from "react-csv";
import { addZero } from "../help";

interface CreditTableProps {
  year: number;
  creditBody: number;
  monthlyPayment: number;
}

export default function CreditTable({ year, creditBody, monthlyPayment }: CreditTableProps) {
  const arr: { year: number; payment: number; debt: number }[] = [];
  const d = new Date();

  let todayYear = d.getFullYear();
  const payment = monthlyPayment * 12;
  let totalDebt = payment * year;

  for (let i = 0; i < todayYear + year - todayYear; i++) {
    totalDebt -= payment;
    arr.push({
      year: todayYear++,
      payment: payment,
      debt: totalDebt < 0 ? 0 : totalDebt,
    });
  }

  return (
    <Table
      bordered
      pagination={false}
      footer={() => (
        <CSVLink
          data={arr}
          filename={`Кредитный расчет ${addZero(d.getDay())}.${addZero(
            d.getMonth()
          )}.${d.getFullYear()} ${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(
            d.getSeconds()
          )}.csv`}
          target="_blank"
        >
          <Button type="primary">CSV</Button>
        </CSVLink>
      )}
      dataSource={arr}
      scroll={{ y: 300 }}
      style={{ width: "500px", height: "400px", marginTop: "20px" }}
    >
      <Column title="Года" dataIndex="year" />
      <Column title="Сумма платежа" dataIndex="payment" />
      <Column title="Оставшийся долг" dataIndex="debt" />
    </Table>
  );
}

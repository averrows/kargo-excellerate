import { Button, Table, Input } from "antd";
import { drivers } from "./mockData";
import "./style.scss";
const { Search } = Input;

export default function Driver() {
  const column = [
    {
      title: "Driver Name",
      key: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: "Phone Number",
      key: "phone_number",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
      render: (phone_number) => <h3>{phone_number}</h3>,
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      render: (created_at) => <h3>{created_at}</h3>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => <h3>{status}</h3>,
    },
    {
      key: "action",
      render: () => <Button type="primary">update</Button>,
    },
  ];
  return (
    <div>
      <div className="driver-search_container">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          style={{ width: "200px" }}
        />
      </div>
      <Table
        columns={column}
        dataSource={drivers}
        onChange={(sorter) => console.log(sorter)}
      />
    </div>
  );
}

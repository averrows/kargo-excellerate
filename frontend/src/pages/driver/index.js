import { useState } from "react";
import { Table, Input, Modal } from "antd";
import { drivers } from "./mockData";
import "./style.scss";
import { DriverTableColumns } from "./tableColumns";
const { Search } = Input;

export default function Driver() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const AddDriverModal = (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={hideModal}
      onCancel={hideModal}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );

  const onClickUpdate = (id) => {
    showModal();
    console.log(id);
  };

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
        columns={DriverTableColumns(onClickUpdate)}
        dataSource={drivers}
        // onClickUpdate={(id) => {
        //   showModal();
        //   console.log(id);
        // }}
      />
    </div>
  );
}

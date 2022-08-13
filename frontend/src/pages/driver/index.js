import { useState } from "react";
import { Table, Input, Modal, Button, Form, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { drivers } from "./mockData";
import "./style.scss";
import { DriverTableColumns } from "./tableColumns";
import { margin, width } from "../../constant";
const { Search } = Input;

export default function Driver() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [driverId, setDriverId] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
    setDriverId(null);
    setInputName("");
    setInputPhoneNumber("");
  };

  const showModal = () => {
    setIsModalVisible(true);
    openNotificationWithIcon("warning");
  };

  const hideModal = () => {
    setDriverId(null);
    setInputName("");
    setInputPhoneNumber("");
    setIsModalVisible(false);
  };

  const deactiveDriver = () => {
    console.log(driverId);
    hideModal();
  };

  const AddDriverModal = () => (
    <Modal
      title="Add or Update Driver"
      visible={isModalVisible}
      footer={false}
      onCancel={hideModal}
    >
      <Form onFinish={onFinish}>
        {driverId !== null && (
          <Button
            onClick={() => deactiveDriver()}
            danger
            style={{ marginBottom: margin.medium }}
          >
            Deactive Driver
          </Button>
        )}
        <Form.Item
          initialValue={inputName}
          label="Driver Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={inputPhoneNumber}
          label="Phone Number"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="ID Card" name="id">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Driver License" name="license">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <div className="driver-search_container">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );

  const onClickUpdate = (driver) => {
    setDriverId(driver.name);
    setInputName(driver.name);
    setInputPhoneNumber(driver.phone_number);
    showModal();
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Warning",
      description:
        "driver will receive an SMS on this phone number to register on Driver App",
    });
  };

  return (
    <div>
      <AddDriverModal />
      <div className="driver-search_container">
        <Button
          type="primary"
          onClick={() => showModal()}
          style={{ marginRight: margin.medium }}
        >
          Add Driver
        </Button>
        <Search
          placeholder="input search text"
          allowClear
          style={{ width: width.search, marginBottom: margin.medium }}
        />
      </div>
      <Table columns={DriverTableColumns(onClickUpdate)} dataSource={drivers} />
    </div>
  );
}

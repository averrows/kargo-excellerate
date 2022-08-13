import { useState } from "react";
import {
  Table,
  Input,
  Modal,
  Button,
  Form,
  Upload,
  Tooltip,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style.scss";
import { DriverTableColumns } from "./tableColumns";
import { margin, width } from "../../constant";
import { useEffect } from "react";
import Api from "../../service/Api";
const { Search } = Input;

export default function Driver() {
  const [driversData, setDriversData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    Api.drivers.list().then((resp) => setDriversData(resp.data.data));
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    setDriverId(null);
    setInputName("");
    setInputPhoneNumber("");
    Api.drivers.add(values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setDriverId(null);
    setInputName("");
    setInputPhoneNumber("");
    setIsModalVisible(false);
  };

  const deactiveDriver = () => {
    hideModal();
    notification["success"]({
      message: "Success",
      description: `Driver with ID ${driverId} successfully deactivated`,
    });
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
        <Tooltip title="Driver will receive an SMS on this phone number to register on Driver App">
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
        </Tooltip>
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
      <Table
        columns={DriverTableColumns(onClickUpdate)}
        dataSource={driversData}
      />
    </div>
  );
}

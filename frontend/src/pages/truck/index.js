import { useEffect, useState } from "react";
import { Select, Table, Input, Form, Upload, Modal, Space, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style.scss";
import { trucks } from "./mockData";
import Navbar from '../../components/Navbar/Navbar';
import { margin, width } from '../../constant';
import { TruckTableColumns } from "./tableColumns";
import Api from "../../service/Api";
const {Option} = Select;
const {Search} = Input;

function Truck() {
  const [setSortedInfo] = useState({});
  const [setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const [inputLicenseNumber, setInputLicenseNumber] = useState("");
  const [inputLicenseType, setInputLicenseType] = useState("");
  const [inputTruckType, setInputTruckType] = useState("");
  const [inputProductionYear, setInputProductionYinputProductionYear] = useState("");
  const [truckId, setTruckId] = useState(null);
  const[trucksData, setTrucksData] = useState([]);

  useEffect(() => {
    Api.trucks.list().then((resp) => {
        setTrucksData(resp.data.data)
    })
  }, [])
  const onFinish = (values) => {
    console.log("Success:", values);
    setTruckId(null);
    setInputLicenseNumber("");
    setInputLicenseType("yellow");
    setInputTruckType("");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const deactiveTruck = () => {
    console.log(truckId);
    hideModal();
  };

  const AddTruckModal = () => (
    <Modal
      title="Add or Update Truck"
      visible={isModalVisible}
      footer={false}
      onCancel={hideModal}
    >
      <Form onFinish={onFinish}>
        {truckId !== null && (
          <Button
            onClick={() => deactiveTruck()}
            danger
            style={{ marginBottom: margin.medium }}
          >
            Deactive Truck
          </Button>
        )}
        <Form.Item
          initialValue={inputLicenseNumber}
          label="License Number"
          name="license"
          rules={[
            {
              required: true,
              message: "Please input your license number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="License Type"
          name="plateType"
          rules={[
            {
              required: true,
            }
          ]}>
            <Select defaultValue={inputLicenseType}>
              <Option value="yellow">Yellow</Option>
              <Option value="black">Black</Option>
            </Select>
        </Form.Item>
        <Form.Item
          label="Truck Type"
          name="truckType"
          rules={[
            {
              required: true,
            }
          ]}>
            <Select defaultValue={inputTruckType}>
              <Option value="tronton">Tronton</Option>
              <Option value="cde">CDE</Option>
              <Option value="container">Container</Option>
            </Select>
        </Form.Item>
        <Form.Item
          initialValue={inputProductionYear}
          label="Production Year"
          name="productionYear"
          rules={[
            {
              required: true,
              message: "Please input your production year!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="STNK" name="stnk">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="KIR" name="kir">
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

  const onClickUpdate = (truck) => {
    setTruckId(truck.license_number)
    setInputLicenseNumber(truck.license_number)
    setInputLicenseType(truck.plate_type)
    setInputTruckType(truck.truck_type)
    setInputProductionYinputProductionYear(truck.production_year)
    showModal();
  };

  const uniqueTrucksType = [];
  trucks.map((item) => {
    var findItem = uniqueTrucksType.find((x) => x.truckType == item.truckType);
    if(!findItem) uniqueTrucksType.push({label: item.truckType, value: item.truckType})
  });

  return (
    <div className="truck">
      <div className="truck-header">
        <Navbar shipper={true} />
        <Space style={{ width: "100%", marginBottom: margin.medium }}>
          <Select 
              className="truck-typeFilter"
              placeholder="Truck Type"
              mode="multiple" 
              options={uniqueTrucksType}>
          </Select>
          <AddTruckModal />
          <div className="truck-search_container">
            <Button
              type="primary"
              onClick={() => showModal()}
              style={{ marginRight: margin.medium }}
            >
              Add Truck
            </Button>
            <Search
              placeholder="input search text"
              allowClear
              style={{ width: width.search }}/>
          </div>
        </Space>
        <div>
            <Table columns={TruckTableColumns(onClickUpdate)} dataSource={trucksData} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default Truck;

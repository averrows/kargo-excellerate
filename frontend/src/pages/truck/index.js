import { useState } from "react";
import { Select, Table, Input, Modal, Space } from "antd";
import "./style.scss";
import { trucks } from "./mockData";
import Navbar from '../../components/Navbar/Navbar';
import Constant from '../../constant';
import { TruckTableColumns } from "./tableColumns";
const {Search} = Input;

function Truck() {
  const [setSortedInfo] = useState({});
  const [setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  

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

  const uniqueTrucksType = [];
  trucks.map((item) => {
    var findItem = uniqueTrucksType.find((x) => x.truckType == item.truckType);
    if(!findItem) uniqueTrucksType.push({label: item.truckType, value: item.truckType})
  });

  return (
    <div className="truck">
        <div className="truck-header">
            <Navbar shipper={true} />
            <Space style={{ width: "100%" }}>
              <Select 
                  className="truck-typeFilter"
                  placeholder="Truck Type"
                  mode="multiple" 
                  options={uniqueTrucksType}>
              </Select>
              <Search
                className="truck-search"
                placeholder="input search text"
                allowClear
                enterButton="Search"
                style={{ width: "200px" }}/>
            </Space>
            <div>
                <Table columns={TruckTableColumns(onClickUpdate)} dataSource={trucks} onChange={handleChange} />
            </div>
        </div>
    </div>
  );
}

export default Truck;

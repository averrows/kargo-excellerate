import { Radio, Space, Table, Tag, Select, Button, Input, Modal, Form, DatePicker } from "antd";
import React, { useState } from "react";
import { data } from "./data";
import { margin, width } from "../../constant";
import moment from 'moment'

const { Option } = Select;
 

const columns = (clickModal, shipment) => [
  {
    title: "Shipment",
    dataIndex: "shipment",
    key: "shipment",
    sorter: (a, b) => a.shipment.localeCompare(b.shipment),
    // sorter:
  },
  {
    title: "License",
    dataIndex: "license",
    key: "license",
    sorter: (a, b) => a.license.localeCompare(b.license),
  },
  {
    title: "Driver's Name",
    dataIndex: "driversName",
    key: "driversName",
    sorter: (a, b) => a.driversName.localeCompare(b.driversName),
  },
  {
    title: "Origin",
    dataIndex: "origin",
    key: "origin",
    sorter: (a, b) => a.origin.localeCompare(b.origin),
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
    sorter: (a, b) => a.destination.localeCompare(b.destination),
  },
  {
    title: "Loading Date",
    dataIndex: "loadingDate",
    key: "loadingDate",
    sorter: (a, b) => a.loadingDate.localeCompare(b.loadingDate),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Action",
    key: "action",
    render: (data) => (
      <Space size="middle">
        <Select
          style={{ width: "180px", textAlign: "center" }}
          placeholder="Action"
          onChange={(event)=>{
            (event == "allocate") ? clickModal(`Allocate Shipment ${data.shipment}`, data) : clickModal(`Update Status ${data.shipment}`,data)
          }
          }
        >
          <Option value="allocate" style={{ textAlign: "center" }}>
            Allocate Shipment
          </Option>
          <Option value="status" style={{ textAlign: "center" }}>
              Update Status
          </Option>
        </Select>
        {/* <Button style={{width: "150px"}} type="dash" onClick={() => clickModal("Allocate Shipment")}>Allocate Shipment</Button>
        <Button type="primary" onClick={() => clickModal("Update Status")}>Update Status</Button> */}
      </Space>
    ),
  },
];

const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];


const Shipment = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const [visibleModalAdd, setVisibleModalAdd] = useState(false);

  const showModalAdd = () => {
    setVisibleModalAdd(true);
  }

  const handleCancelAdd = () => {
    setVisibleModalAdd(false);
  }

  const handleSubmitAdd = () => {
    setVisibleModalAdd(false)
  }

  const showModal = (titleModal, shipment) => {
    setVisible(true);
    setTitleModal(titleModal);
    console.log(shipment);
  };

  const handleOk = () => {
      setLoading(false);
      setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(moment(values.loadingDate).format("DD/MM/YYYY"))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div style={{ margin: margin.medium }}>
          <Button onClick={showModalAdd} type="primary">Add Shipment</Button>
        </div>
        <div style={{ margin: margin.medium }}>
          <Input.Group compact>
            <Input placeholder="Search" style={{ width: width.search }} />
            <Button type="default">Go!</Button>
          </Input.Group>
        </div>
      </div>
      <Table
        columns={columns(showModal)}
        pagination={{
          position: ["bottomCenter"],
        }}
        dataSource={data}
      />
      <>
      <Modal
        visible={visible}
        title={titleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >

        <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <Form.Item
                label="Truck"
                name="truck"
                rules={[{ required: true, message: 'Please input all mandatory fields' }]}
            >
            <Select mode="multiple" placeholder="Search truck here">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
            </Select>
            </Form.Item>
            <Form.Item
                label="Driver"
                name="driver"
                rules={[{ required: true, message: 'Please input all mandatory fields' }]}
            >
            <Select mode="multiple" placeholder="Search driver here">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
            </Select>      
            </Form.Item>
      <Form.Item {...tailLayout}>
          <Button style={{margin: margin.medium}} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{margin: margin.medium}} htmlType="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      </Modal>

      <Modal
        visible={visibleModalAdd}
        title="Add Shipment"
        onOk={handleSubmitAdd}
        onCancel={handleCancelAdd}
        footer={false}
      >
        <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <Form.Item
                label="Origin"
                name="origin"
                rules={[{ required: true, message: 'Please input all mandatory fields' }]}
            >
            <Select mode="multiple" placeholder="Search district here">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
            </Select>
            </Form.Item>
            <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Please input all mandatory fields' }]}
            >
            <Select mode="multiple" placeholder="Search district here">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
            </Select>      
            </Form.Item>
            <Form.Item
                label="Loading Date"
                name="loadingDate"
                rules={[{ required: true, message: 'Please input all mandatory fields' }]}
            >
            <DatePicker /> 
            </Form.Item>
      <Form.Item {...tailLayout}>
          <Button style={{margin: margin.medium}} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{margin: margin.medium}} htmlType="button" onClick={handleCancelAdd}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
    </div>
  );
};

export default Shipment;

import { Radio, Space, Table, Tag, Select, Button, Input } from "antd";
import React, { useState } from "react";

const actions = [
  { label: "Allocate Shipment", value: "allocate" },
  { label: "Update Status", value: "status" },
];

const columns = [
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
    render: (_) => (
      <Space size="middle">
        <Select
          style={{ width: "150px", textAlign: "center" }}
          placeholder="Action"
          options={actions}
        />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    shipment: "DO-1",
    license: "B 32 UT",
    driversName: "Budi",
    origin: "Jakarta",
    destination: "Surabaya",
    loadingDate: "21 Agustus",
    status: "Ongoing",
  },
  {
    key: "2",
    shipment: "DO-2",
    license: "B 322 UT",
    driversName: "Cudi",
    origin: "Jakarta",
    destination: "Surabaya",
    loadingDate: "21 Agustus",
    status: "Ongoing",
  },
  {
    key: "3",
    shipment: "DO-3",
    license: "B 323 UT",
    driversName: "Cudi",
    origin: "Jakarta",
    destination: "Surabaya",
    loadingDate: "21 Agustus",
    status: "Ongoing",
  },
  {
    key: "4",
    shipment: "DO-4",
    license: "B 324 UT",
    driversName: "dudi",
    origin: "Jakarta",
    destination: "Surabaya",
    loadingDate: "21 Agustus",
    status: "Ongoing",
  },
  {
    key: "5",
    shipment: "DO-4",
    license: "B 324 UT",
    driversName: "adi",
    origin: "Jakarta",
    destination: "Surabaya",
    loadingDate: "21 Agustus",
    status: "Ongoing",
  },
];

const Shipment = () => {
  return (
    <div>
      <div style={{display: "flex", justifyContent: "end", }}>
        <div style={{margin: "1rem 20px"}}>
        <Button type="primary">Add Shipment</Button>

        </div>
        <div style={{margin: "1rem 20px"}}>
        <Input.Group compact >
          <Input
          placeholder="Search"
            style={{ width: "200px"}}
          />
          <Button type="default">Go</Button>
        </Input.Group>
        </div>
        
      </div>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Shipment;

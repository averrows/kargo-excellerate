import { useState } from "react";
import { Button } from "antd";

export const TruckTableColumns = (onClickUpdate) => {
  const [sortedInfo] = useState({}); 
  const columns = [
    {
      title: 'License Number',
      dataIndex: 'license',
      key: 'license',
      sorter: (a, b) => a.license.localeCompare(b.license),
      sortOrder: sortedInfo.columnKey === 'license' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Truck Type',
      dataIndex: 'truckType',
      key: 'truckType',
      sorter: (a, b) => a.truckType.localeCompare(b.truckType),
      sortOrder: sortedInfo.columnKey === 'truckType' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Plate Type',
      dataIndex: 'plateType',
      key: 'plateType',
      sorter: (a, b) => a.plateType.localeCompare(b.plateType),
      sortOrder: sortedInfo.columnKey === 'plateType' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Production Year',
      dataIndex: 'productionYear',
      key: 'productionYear',
      sorter: (a, b) => a.productionYear - b.productionYear,
      sortOrder: sortedInfo.columnKey === 'productionYear' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => <h3>{status}</h3>,
    },
    {
      key: 'action',
      render: (name) => (
        <Button type="primary" onClick={() => onClickUpdate(name)}>
          Update
        </Button>
      ),
    },
  ];
  return columns;
}
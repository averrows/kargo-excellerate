import { Button } from "antd";

const handleUpdate = (e) => {

}
export const trucks = [
  {
    key: '1',
    license: 'B 2021 ABC',
    truckType: 'Tronton',
    plateType: 'Yellow',
    productionYear: 2001,
    status: "active",
    action: <Button onClick={handleUpdate}>Update</Button>
  },
  {
    key: '2',
    license: 'B 2213 CDE',
    truckType: 'Container',
    plateType: 'Yellow',
    productionYear: 2002,
    status: "inactive",
    action: <Button onClick={handleUpdate}>Update</Button>
  },
  {
    key: '3',
    license: 'B 7713 FGH',
    truckType: 'CDE',
    plateType: 'Black',
    productionYear: 2000,
    status: "active",
    action: <Button onClick={handleUpdate}>Update</Button>
  },
];
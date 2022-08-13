import { actionType } from "./type";

const initialState = {
  shipment: [
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
  ]
}

export const ShipmentStore = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return { ...state,shipment: action.payload };
    default:
      return initialState;
  }
};

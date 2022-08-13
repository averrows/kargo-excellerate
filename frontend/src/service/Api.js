import {backend} from "./Backend";
export default {
    trucks:{
        list: async () => {
            return backend.get("/trucks");
        },
        add: async (data) => {
            return backend.post("/trucks", data)
        },
        get: async (license) => {
            return backend.get(`/trucks/${license}`);
        }
    },
    drivers: {
        list: async () => {
            return backend.get("/drivers");
        },
        add: async (data) => {
            return backend.post("/drivers", data)
        },
        get: async (license) => {
            return backend.get(`/drivers/${license}`);
        }
    },
    shipments: {
        list: async () => {
            return backend.get("/shipments");
        },
        add: async (data) => {
            return backend.post("/shipments", data)
        },
        get: async (ship_num) => {
            return backend.get(`/shipments/${ship_num}`);
        },
        allocate: async (ship_num,data) => {
            return backend.post(`/shipments/${ship_num}/allocate`,data)
        }
    },
}
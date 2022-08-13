import { actionType } from "./type";

const initialState = {
  username: "",
  password: "",
};

export const LoginStore = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return { ...state };
    default:
      return initialState;
  }
};

import { useReducer } from "react";
import dataReducer from "./reducer";

import { usersTableContext as UsersTableContext } from "./context";


const initialState = {
  states: null,
  nodes: null,
  objects: null,
  arrays: null,
  refVars: null,
  vars: null,
  triggered: false
};     


const ContextProvider = ({ children }) => {

  const [data, dispatch] = useReducer(dataReducer, initialState);

  return (
    <UsersTableContext.Provider value = {{ data, dispatch }}>
      {children}
    </UsersTableContext.Provider>
  );
}

export default ContextProvider;
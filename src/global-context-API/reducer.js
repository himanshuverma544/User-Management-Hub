import { STORE_DATA, REMOVE_DATA } from "./action.types";

const dataReducer = (state, action) => {
  
  const { typeOfData, data: newData } = action.payload;

  switch (action.type) {

    case STORE_DATA:
      return {
        ...state,
        [typeOfData]: {
          ...state[typeOfData], 
          ...newData
        },
        triggered: true
      }
    
    case REMOVE_DATA:
      return state;

    default:
      return state;
  }
}

export default dataReducer;
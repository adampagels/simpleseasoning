import { combineReducers } from "redux";
import fetchUsers from "../slices/user";

export default combineReducers({
  fetchUsers,
});

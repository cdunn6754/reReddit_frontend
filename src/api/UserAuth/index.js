import axios from "axios";

import {
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL,
  USER_DETAIL_URL
} from "../constants";
import { tokenContextObj } from "../apiUtils";

export const userLoginApi = credentials =>
  axios.post(USER_LOGIN_URL, credentials).then(response => response.data);

export const userLogoutApi = token =>
  axios
    .post(USER_LOGOUT_URL, null, tokenContextObj(token))
    .then(response => response.data);

export const userRegisterApi = userData =>
  axios.post(USER_REGISTER_URL, userData).then(response => response.data);

export const userUpdateApi = (username, updateData, token) =>
  axios
    .patch(USER_DETAIL_URL(username), updateData, tokenContextObj(token))
    .then(response => response.data);

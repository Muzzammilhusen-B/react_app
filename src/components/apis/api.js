import axios from "axios";

export default axios.create({
  baseURL: "https://dev-api.alldaydr.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

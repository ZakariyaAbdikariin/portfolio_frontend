import axios from "axios";

const api = axios.create({
  baseURL: "https://sakariyeabdikariin.co.uk/api", // use your domain name
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

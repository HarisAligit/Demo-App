import axios from "axios";

export const jarvisClient = axios.create({
  baseURL: "https://revforce-dev.empgautos.com/api/crm/"
});
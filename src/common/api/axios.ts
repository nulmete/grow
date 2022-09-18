import axios from "axios";
import { SWAPI_BASE_URL } from "../lib/strings";

export default axios.create({
  baseURL: SWAPI_BASE_URL,
});

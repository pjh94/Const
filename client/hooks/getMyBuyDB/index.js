import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchMyBuyDB = async () => {
  const data = await axios.get("http://localhost:8080/api/getMyBuyDB", {});

  return data;
};

export { fetchMyBuyDB };

import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNowAuction = async () => {
  const data = await axios.get("http://localhost:8080/api/getNowAuction", {});

  return data;
};

export { fetchNowAuction };

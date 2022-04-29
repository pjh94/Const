import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNowAuctionAll = async () => {
  const data = await axios.get("http://localhost:8080/api/getNowAuctionAll", {});

  return data;
};

export { fetchNowAuctionAll };

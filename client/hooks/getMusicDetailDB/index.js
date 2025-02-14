import axios from "axios";

const fetchMusicDetailDB = async (param) => {
  if (param === undefined) {
    return;
  } else {
    const data = await axios.post(
      "http://localhost:8080/api/getMusicDetailDB",
      {
        CID: param,
      }
    );
    return data;
  }
};

export { fetchMusicDetailDB };

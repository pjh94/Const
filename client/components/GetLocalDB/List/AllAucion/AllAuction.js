import {
    Button,
    Typography,
    Grid,
    Box,
    TextField,
    Container,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchNowNFT } from "../../../../hooks";
import { useQuery } from "react-query";
import React, { useState, useEffect } from "react";

import Posts from "./ac";
import Pagination from "./ab";

function AllAuction() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);



  const { data, isLoading, isFetching } = useQuery(["getNowAuction"], () =>
  fetchNowAuction()
);

let a = 0;
let auctionNowData = [];
console.log(data);

if (data) {
  if (data.data.length > 0) {
      a = 1;
      for (let i = 0; i < data.data.length; i++) {
          auctionNowData[i] = data.data[i];
          auctionNowData[
              i
          ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
      }
  }
}

console.log(a);
console.log(auctionNowData);
useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setPosts(auctionNowData);
      setLoading(false);
    }
    fetchData();
  }, []);
  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

    const theme = createTheme();
  return (
    <div>
    
    <ThemeProvider theme={theme}>


    <Container maxWidth="lg" sx={{ py: 15 }}>

   
  
                                
    <Posts auctionNowData={currentPosts(auctionNowData)} loading={loading}></Posts>
                      

      
           
    <Pagination postsPerPage={postsPerPage} totalPosts={auctionNowData.length} paginate={setCurrentPage}></Pagination>
    </Container>
  
    </ThemeProvider>
 
</div>
  );
}

export default AllAuction;
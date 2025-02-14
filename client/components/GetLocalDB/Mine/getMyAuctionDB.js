import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useQuery } from "react-query";
import { fetchMyAuctionDB } from "../../../hooks";

import Link from "next/link";

const theme = createTheme();

const GetMyAuctionDB = () => {
  const { data, isLoading, isFetching } = useQuery(["getMyAuctionDB"], () =>
    fetchMyAuctionDB()
  );

  let a = 0;
  let auctionMyData = [];

  console.log(data);
  if (data) {
    if (data.data.length > 0) {
      a = 1;
    }
    auctionMyData = data.data;
    // if (data.data.length > 0) {
    //   a = 1;
    //   for (let i = 0; i < data.data.length; i++) {
    //     auctionMyData[i] = data.data[i];
    //     auctionMyData[
    //       i
    //     ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
    //   }
    // }
  }

  console.log(auctionMyData);
  console.log(a);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={5} textAlign="center">
            {a === 1 ? (
              auctionMyData.map((a) => (
                <Link href={`/auction/${encodeURIComponent(a.CID)}`}>
                  <Grid item key={a.CID} xs={4}>
                    <Card
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 0 }}>
                        <Typography> {a.AuctionMusic_CID.artist}</Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{
                          height: "70%",
                          width: "100%",
                          objectFit: "fill",
                        }}
                        image={a.AuctionMusic_CID.s3}
                        alt="random"
                      />

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography>{a.AuctionMusic_CID.title}</Typography>
                        <Typography>
                          조회수 : {a.AuctionMusic_CID.playCount}
                        </Typography>
                        <Typography>판매수 : {a.auction}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Link>
              ))
            ) : (
              <div>
                <h1>아직 경매로 올린 상품이 없습니다</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetMyAuctionDB;

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
import { fetchMyNFTDB } from "../../../hooks";

import Link from "next/link";

const theme = createTheme();

const GetMyNFTDB = () => {
  const { data, isLoading, isFetching } = useQuery(["getMyNFTDB"], () =>
    fetchMyNFTDB()
  );

  let a = 0;
  let nftMyData = [];

  if (data) {
    a = 1;
    nftMyData = data.data;
    // if (data.data.length > 0) {
    //   a = 1;
    //   for (let i = 0; i < data.data.length; i++) {
    //     nftMyData[i] = data.data[i];
    //     nftMyData[
    //       i
    //     ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
    //   }
    // }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={5} textAlign="center">
            {a === 1 ? (
              nftMyData.map((a) => (
                <Grid item key={a.CID} xs={3}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        m: 1,
                        height: "100%",
                        width: "100%",
                        objectFit: "fill",
                      }}
                      image={a.s3}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography>Title : {a.title}</Typography>
                      <Typography>조회수 : {a.playCount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              // <div>{JSON.stringify(data)}</div>
              <div>
                <h1>아직 판매로 나온 상품이 없어용</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetMyNFTDB;

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import web3 from "../connection/web3";

import { fetchBestCollections } from "../../hooks";
import axios from "axios";
//
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
//
import Link from "next/link";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ImageCard from "../ImageCard/ImageCard";

import GetMyBuy from "../GetContract/Mine/getMyBuy";
import GetMyNFT from "../GetContract/Mine/getMyBuy";
// import GetMyAuction from "../GetContract/Mine/getMyAuction";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";
//
import Web3 from "web3";
//
const theme = createTheme();

async function setupWeb3() {
  console.log("hihid");
  if (window.ethereum) {
    console.log("확인");
    window.web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum.send("eth_requestAccounts");
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("주입된 web3가 감지되었습니다.");
  }
  // Fallback to localhost; use dev console port by default...
  else {
    console.alert(
      "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
    );
  }
}

const Mypage1 = () => {
  //
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions, setAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState(false);

  const [b, seta] = useState(true);

  const setupBlockchain = async () => {
    seta(false);
    let ImageNFTMarketplace = {};

    try {
      ImageNFTMarketplace = require("../../../build/contracts/ImageMarketplace.json");
    } catch (e) {
      console.log(e);
    }
    try {
      // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);
      // Get the contract instance.
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");

      console.log("balance", balance);

      const networkId = await web3.eth.net.getId();
      let NFTMarketplaceInstance = null;
      let deployedNetwork = null;

      // Create instance of contracts

      console.log("networkId", networkId);

      if (ImageNFTMarketplace.networks) {
        deployedNetwork = ImageNFTMarketplace.networks[networkId];
        if (deployedNetwork) {
          NFTMarketplaceInstance = new web3.eth.Contract(
            ImageNFTMarketplace.abi,
            deployedNetwork.address
          );
        }
      }
      console.log("ImageNFTMarketplace", ImageNFTMarketplace);
      console.log("deployedNetwork", deployedNetwork);
      console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);
      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();
        console.log(ImageCount);
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods
            .imageStorage(i)
            .call();
          setImages((Images) => [...Images, image]);
          console.log(...Images, image);
          let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
          let auction2 = [...Auctions, auction];
          console.log(auction2);
          setAuctions((Auctions) => [...Auctions, auction]);
          console.log(auction.endTime);
          // console.log("auction",auction);
          console.log("auctions", Auctions);
        }
        console.log(Auctions);
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
        // setReady(true)
      } else throw "스마트 연락처에 연결하지 못했습니다.";
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
      );
      console.error(error);
    }
  };

  (async function componentWillMount() {
    if (b == true) {
      setReady(false);
      setupWeb3();
      setupBlockchain();
    }
  })();

  // 여기서부터 쓰면 댐 위에 볼 필요 없음

  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const data1 = useUser1();

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }

  const claimFundsHandler = async () => {
    let pra2;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();

    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;
    praaccounts = accounts1;

    pra2.methods
      .claimFunds()
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해쉬해쉬", hash);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <button onClick={claimFundsHandler} className="btn btn-success">
              구매 완료 된 이더 받기
            </button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              버튼버튼
            </Button>
            {a === 1 ? (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    마이페이지
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    {userSession.name}님 반갑습니다
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 수익 현황
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    회원정보 수정
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    소유한 NFTS의 총 수:{ImageNumOfAccount}
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  {/* <Link href={`/buysell/${encodeURIComponent(a.Key)}`}> */}
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      NFT 관리하기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={9}>
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      나의 전체 NFT
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyNFTDB></GetMyNFTDB>
                  {/* <GetMyNFT></GetMyNFT> */}
                </Grid>
                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    판매 중인 나의 NFT
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myBuy/${accountAddress}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyBuyDB></GetMyBuyDB>
                  {/* <GetMyBuy></GetMyBuy> */}
                </Grid>

                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    경매 중인 나의 NFT
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myAuction/${accountAddress}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyAuctionDB></GetMyAuctionDB>
                  {/* <GetMyAuction></GetMyAuction> */}
                </Grid>

                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    이용권 정보
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 음원의 총 재생시간
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 음원을 들은 총 횟 수
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내가 최근 들은 곡 Recently Played 등등
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <div>오류임</div>
            )}
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Mypage1;

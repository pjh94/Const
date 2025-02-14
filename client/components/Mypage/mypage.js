import { useEffect, useState, useRef } from "react";

import { useForm } from "react-hook-form";

import { useQuery } from "react-query";
import { fetchUserSession, fetchMyNFTDB } from "../../hooks";
import Sidebar from "./sidebar";

import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";

import styled from "styled-components";

import web3 from "../connection/web3";

import axios from "axios";

import Link from "next/link";

import GetMyBuy from "../GetContract/Mine/getMyBuy";
import GetMyNFT from "../GetContract/Mine/getMyBuy";
import GetMyAuction from "../GetContract/Mine/getMyAuction";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";

const Smallertext = styled.div`
  font-weight: normal;
  font-size: 0.7rem;
  color: hsl(0, 0%, 50%);
  text-align: center;
  letter-spacing: 1px;
  padding-bottom: 20px;
  line-height: 5px;
`;
const Cardcontainer = styled.div`
  background-color: white;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
  box-shadow: 0px 10px 20px hsl(185, 75%, 35%);
`;
const Cardcontainer2 = styled.div`
  background-color: white;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
`;
const Followers = styled.div`
  flex: 1;
`;
const Socialcontainer = styled.div`
  display: flex;
  border-top: solid rgb(206, 206, 206) 1px;
  text-align: center;
`;
const Normaltext = styled.div`
  font-weight: normal;
  font-size: 0.95rem;
  color: hsl(0, 0%, 50%);
  text-align: center;
  padding-bottom: 10px;
`;
const Boldtext = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const Header = styled.div`
  background-position: 0px 0px;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
`;
const Img = styled.img`
  margin: auto;
  width: 15%;
  border: solid white 4px;
  border-radius: 50%;
  margin-top: 75px;
`;

const theme = createTheme();

const Mypage1 = () => {
  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const useUser2 = () => {
    const result = useQuery(["getMyNFTDB"], () => fetchMyNFTDB());
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

  const [accountBalance, setAccountBalance] = useState("");

  useEffect(() => {
    async function loadBalance() {
      const accounts = await web3.eth.getAccounts();
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");
      setAccountBalance(balance);
    }
    loadBalance();
  }, []);

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }

  let b = 0;
  let myNFTData;
  let count = 1;
  if (data2.data) {
    b = 1;
    myNFTData = data2.data.data;
  }
  console.log(myNFTData);

  const claimFundsHandler = async () => {
    let pra2;
    let praaccounts;
    const marketContractJSON = require("../../../build/contracts/NFTMarketplace.json");
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
        alert("이더받기성공")
        window.location.reload(true);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });
  };

  let lastTime;
  if (userSession && userSession.ticket !== "이용권 없음") {
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime();
    lastTime = Math.ceil((dday - today) / (1000 * 60 * 60 * 24));
  } else if (userSession && userSession.ticket === "이용권 없음") {
    lastTime = 0;
  }

  if (userSession) {
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime();

    if (dday - today <= 0 && userSession.ticket !== "이용권 없음") {
      console.log(dday - today);
      const rere = axios.post("http://localhost:8080/api/updateUserTicket", {
        ticket: `이용권 없음`,
        ticketTime: "0",
        id: userSession.id,
      });
    }
  }

  const fileInput = useRef(null);

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append("image", image);
      imageFormData.append("id2", userSession.id2);

      const resultImage = await axios.post(
        "http://localhost:8080/api/updateImage",
        imageFormData
      );
      const rere = axios.post(
        "http://localhost:8080/api/updateUserProfileImg",
        {
          profileImg: `https://const123.s3.ap-northeast-2.amazonaws.com/profile/${userSession.id2}.jpg`,
          id2: userSession.id2,
        }
      );
    }

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setImage(reader.result)
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 24 }}>
          {a === 1 && b === 1 ? (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Cardcontainer>
                  <Header>
                    <Img
                      src={`${userSession.profileImg}`}
                      style={{ margin: "20px" }}
                      size={200}
                      onClick={() => {
                        fileInput.current.click();
                      }}
                    />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/jpg,impge/png,image/jpeg"
                      name="profile_img"
                      onChange={onChange}
                      ref={fileInput}
                    />
                  </Header>

                  <Link href={`/userUpdate`}>
                    <Followers>
                      <Smallertext>회원 정보 수정하기</Smallertext>
                    </Followers>
                  </Link>
                  <Followers>
                    <Smallertext>
                      <div
                        onClick={claimFundsHandler}
                        className="btn btn-success"
                      >
                        구매 완료 된 이더 받기
                      </div>
                    </Smallertext>
                  </Followers>
                  <Boldtext>
                    {userSession.name}
                    <span className="normal-text">나이/랭크</span>
                  </Boldtext>
                  <Normaltext>{userSession.artist}</Normaltext>
                  <Socialcontainer>
                    <Followers>
                      <Boldtext>{count}</Boldtext>
                      <Smallertext> 소유한 NFTS의 총 수</Smallertext>
                    </Followers>
                    <Followers className="likes">
                      <Boldtext>{`${Math.floor(accountBalance)}/eth`}</Boldtext>
                      <Smallertext>잔액</Smallertext>
                    </Followers>
                    <Followers className="photos">
                      <Boldtext>{`${userSession.ticket}${lastTime}일남음`}</Boldtext>
                      <Smallertext>이용권 정보</Smallertext>
                    </Followers>
                  </Socialcontainer>
                  <Grid item xs={12}>
                    <Sidebar />
                  </Grid>
                </Cardcontainer>
              </Grid>
            </Grid>
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Mypage1;

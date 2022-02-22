import { networkType, myStxAddress, getUserData } from "./auth";
import { userSession } from "../pages/_app";
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
  stringAsciiCV,
  bufferCV,
  responseErrorCV,
  responseOkCV,
  trueCV,
  falseCV,
  uintCV,
  intCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from "@stacks/transactions";

import { Storage } from '@stacks/storage';

import { openContractCall } from "@stacks/connect";

import { createSha2Hash } from "@stacks/encryption";
import { v4 as uuidv4 } from "uuid";

import { fetchUserInfo } from "./profile";

import { fetchEquityInfo } from "./equity-info";

import Email from "./smtp";

import {
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  makeContractNonFungiblePostCondition,
  bufferCVFromString,
  makeContractSTXPostCondition
} from '@stacks/transactions';

// import Logo from "../assets/img/Amortize-pics/amortize-nft-logo.jpeg"
import { fetchHomeInfo } from "./home-reg";
import { getBTC, getSTX } from "./crypto-api";
// import { superUser } from "./auth";
// import { homedir } from "os";

const ContractDeployerAddress = "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6";
const nftContractName = "A-nft-minting-V6";
const btcLockContractName = "A-btc-lock-V6";

var download = function (data) {
  var link = document.createElement('a');
  link.download = 'amortize-nft-logo.jpeg';
  link.href = data;
  link.click();
}

function generatePicNFT(Equity, HomeAddress) {
  const valueOfHome = "Value of Home:" + Equity.ValueOfHome;
  const Loan = "Loan:" + Equity.CurrentMorgageBalance;
  const length = "Term Length:" + Equity.TermLength;
  const country = "Estate:" + HomeAddress.Estate;
  var c = document.createElement("canvas");
  c.width = 300;
  c.height = 500;
  // var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, c.width, c.height);
  // var img = document.createElement('img');
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = Logo;

  img.onload = () => {
    ctx.drawImage(img, c.width / 3, 50, 100, 100);
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(valueOfHome, 150, c.height / 2);
    ctx.fillText(Loan, 150, c.height / 2 + 50);
    ctx.fillText(length, 150, c.height / 2 + 100);
    ctx.fillText(country, 150, c.height / 2 + 150);
    var dataURL = c.toDataURL("image/jpeg", 1.0);
    download(dataURL);
  }

}
export default async function appCallReadOnlyFunction(optionsProps) {
  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    senderAddress: myStxAddress(),
  };

  return callReadOnlyFunction(options)
    .then((response) => {
      const responseJson = cvToJSON(response);

      return new Promise((resolve, reject) => resolve(responseJson));
    })
    .catch((e) => {
      return new Promise((resolve, reject) => reject(e));
    });
}

async function appCallPublicFunction(optionsProps) {

  if (!optionsProps)
    return new Promise((resolve, reject) => reject("no arguments provided"));

  const options = {
    ...optionsProps,
    network: networkType(),
    appDetails: {
      name: "Amortize",
      icon: window.location.origin + "/img/Logo.svg",
    },
    senderAddress: myStxAddress(),
  };


  openContractCall(options);

};

async function Mint(AgentName, AgentSTXAddress) {

  let FetchUserName = await fetchUserInfo(userSession);

  //console.log(FetchUserName);

  const UserName = FetchUserName.FirstName + " " + FetchUserName.LastName;

  // console.log(UserName);

  const EquityData = await fetchEquityInfo(userSession);

  const HomeAddress = await fetchHomeInfo(userSession);

  const BTCPrice = await getBTC();

  // generatePicNFT(EquityData, HomeAddress);

  // const data = {
  //   HomeAddress: JSON.stringify(HomeAddress),
  //   EquityData: JSON.stringify(EquityData),
  // }
  // sendEmail(data);

  const fileContent = JSON.stringify({
    AgentName: AgentName,
    UserName: UserName,
    AgentAddress: AgentSTXAddress,
    UserAddress: myStxAddress(),
    TermLength: EquityData.TermLength,
    ValueOfHome: EquityData.ValueOfHome,
    CurrentMorgageBalance: EquityData.CurrentMorgageBalance,
    HomeAddress: HomeAddress.Address,
    UserPhone: HomeAddress.Phone,
    AreaZipCode: HomeAddress.Zipcode,
    CityName: HomeAddress.City,
    Estate: HomeAddress.Estate,
  });

  // console.log(fileContent);

  const fileOptions = {
    encrypt: false,
    contentType: "application/json",
    dangerouslyIgnoreEtag: true,
  };

  const propDataBuf = Buffer.from(fileContent);

  const randomId = uuidv4().toString().slice(0, 29);
  const fileName = randomId + "-PropInfo.json";

  const tokenUri = getUserData().gaiaHubConfig.address + "/" + randomId;

  const storage = new Storage({ userSession });

  createSha2Hash().then((sha2Hash) => {
    sha2Hash.digest(propDataBuf, "sha256").then((resultBuff) => {
      Promise.all([
        storage.putFile(fileName, fileContent, fileOptions),
      ])
        .then(() => {
          // Successfully placed all the files

          const functionArgs = [
            standardPrincipalCV(myStxAddress()),
            bufferCV(resultBuff),
            stringAsciiCV(tokenUri),
            uintCV(EquityData.ValueOfHome),
            uintCV(BTCPrice[0]),
            standardPrincipalCV(AgentSTXAddress)
          ];

          const options = {
            contractAddress: ContractDeployerAddress,
            contractName: nftContractName,
            functionName: "mint",
            functionArgs,
            network: networkType(),
            appDetails: {
              name: "Amortize",
              //icon: "https://thumb.tildacdn.com/tild3764-3035-4261-b839-376338376239/-/cover/360x230/center/center/-/format/webp/blocktech_1.png",
            },
            onFinish: (data) => {
              console.log("Stacks Transaction:", data.stacksTransaction);
              console.log("Transaction ID:", data.txId);
              console.log("Raw transaction:", data.txRaw);
            },
          };

          openContractCall(options);
        })
        .catch((e) => {
          console.log(e.message);
          // setShowLoader(false);
          setUploadErrorDegree(
            "There were some troubles uploading information on your Gaia Hub, kindly retry. If this error persists then please try back in a few minuters"
          );
        });
    });
  });
}

function sendEmail(data) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "amortize.testing@gmail.com",
    Password: "amortize123",
    To: 'aliraza.ali954@gmail.com', // Jame's Email Address
    From: "amortize.testing@gmail.com", // Amortize Email Address
    Subject: "NFT Minted!",
    Body: data,
  })
    .then(function (message) {
      alert("mail sent successfully")
    });
}

export async function isSuperUser() {
  if (userSession.isUserSignedIn()) {
    appCallReadOnlyFunction({
      contractAddress: ContractDeployerAddress,
      contractName: nftContractName,
      functionName: "is-super-user",
      functionArgs: [],
      // enter all your function arguments here but cast them to CV first
      //   standardPrincipalCV(myStxAddress()),
      // ],
    })
      .then((value) => {
        const isNewUser = value.value;
        // console.log(isNewUser);
        return isNewUser;
        // if (isNewUser) {
        //   window.location.assign("/profile");
        // }
        // superUser = isNewUser;
        // if (!isNewUser) {
        //   window.location.assign("/landing");
        // }
      })
      .catch((e) => {
        alert(e.message);
      });
  }
  // return false;
}


export async function LockEquity(AgentName, AgentSTXAddress, beneficiary, unlock, amount) {

  // const postConditionAddress = myStxAddress();
  // const postConditionCode = FungibleConditionCode.GreaterEqual;
  // const postConditionAmount = uintCV(amount).value;
  // const postConditions = [
  //   makeStandardSTXPostCondition(postConditionAddress, postConditionCode, postConditionAmount),
  // ];

  // appCallPublicFunction({
  //   contractAddress: "STYMF4ARBZEVT61CKV8RBQHC6NCGCAF7AQWH979K",
  //   contractName: "lock",
  //   functionName: "lock",
  //   postConditions,
  //   functionArgs: [
  //     // enter all your function arguments here but cast them to CV first
  //     standardPrincipalCV(beneficiary),
  //     uintCV(unlock),
  //     uintCV(amount)
  //   ],
  // });
  // console.log(AgentName);
  // console.log(AgentSTXAddress);
  Mint(AgentName, AgentSTXAddress);
};

function getUnlockDate(unlock) {
  var value = parseInt(unlock);
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  // var c = new Date(year + value, month, day, hours, minutes + 20);
  var c = new Date(year, month, day, hours, minutes + 1);
  var secondsSinceEpoch = Math.round(c.getTime() / 1000);
  return secondsSinceEpoch;
}

export async function ApproveEquity(beneficiary, unlock, amount) {
  const stxTousd = await getSTX();
  let value = parseInt(amount / stxTousd[0]);
  console.log(value);
  const postConditionAddress = myStxAddress();
  const postConditionCode = FungibleConditionCode.GreaterEqual;
  const postConditionAmount = uintCV(value).value;
  const postConditions = [
    makeStandardSTXPostCondition(postConditionAddress, postConditionCode, postConditionAmount),
  ];

  return await appCallPublicFunction({
    contractAddress: ContractDeployerAddress,
    contractName: btcLockContractName,
    functionName: "lock",
    postConditions,
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      standardPrincipalCV(beneficiary),
      uintCV(getUnlockDate(unlock)),
      uintCV(parseInt(value))
    ],
  });
}

export async function Claim(nft_id, agent) {
  const stxTousd = await getSTX();
  let value = parseInt(20 / stxTousd[0]);
  console.log(value);
  let add = myStxAddress() + "." + btcLockContractName;
  const postConditionAddress = add.toString();
  const postConditionCode = FungibleConditionCode.GreaterEqual;
  const postConditionAmount = uintCV(value).value;

  // With a standard principal
  const postConditionAddressto = myStxAddress();
  const postConditionCodeto = NonFungibleConditionCode.DoesNotOwn;
  const assetAddress = ContractDeployerAddress;
  const assetContractName = nftContractName;
  const assetName = 'amortize-nft';
  // const tokenAssetName = bufferCVFromString('test-token-asset');
  const tokenAssetName = uintCV(nft_id);
  const nonFungibleAssetInfo = createAssetInfo(assetAddress, assetContractName, assetName);

  // const standardNonFungiblePostCondition = 
  const postConditions = [
    makeContractSTXPostCondition(
      myStxAddress(),
      btcLockContractName,
      postConditionCode,
      postConditionAmount
    ),
    makeStandardNonFungiblePostCondition(
      postConditionAddressto,
      postConditionCodeto,
      nonFungibleAssetInfo,
      tokenAssetName
    ),


  ];

  return await appCallPublicFunction({
    contractAddress: ContractDeployerAddress,
    contractName: btcLockContractName,
    functionName: "claim",
    postConditions,
    functionArgs: [
      // enter all your function arguments here but cast them to CV first
      uintCV(nft_id),
      standardPrincipalCV(agent)
      // uintCV(getUnlockDate(unlock)),
      // uintCV(parseInt(value))
    ],
  });
}

export function AddBeneficiary(beneficiary) {
  const functionArgs = [
    standardPrincipalCV(beneficiary)
  ];

  appCallPublicFunction("equity-multi-claim", "add-beneficiary", functionArgs);
}

export function ClaimEquity() {
  const functionArgs = [
  ];

  appCallPublicFunction("equity-multi-claim", "multi-claim", functionArgs);
}

export async function getNftData(nft_id) {
  if (userSession.isUserSignedIn()) {
    try {
      const value = await appCallReadOnlyFunction({
        contractAddress: ContractDeployerAddress,
        contractName: nftContractName,
        functionName: "get-price",
        functionArgs: [
          uintCV(nft_id)
        ],
      });
      // console.log(value.value);
      return value.value.value;
    }
    catch(error){
      console.log(error);
      return;
    }
  }

}


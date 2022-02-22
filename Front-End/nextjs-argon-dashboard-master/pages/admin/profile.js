import React, { useEffect } from "react";
// import { myStxAddress, userSession  } from "../../components/auth";

import { useState } from "react";

import { saveUserInfo } from "../../components/profile";

import { fetchUserInfo } from "../../components/profile";

import { getUserData, myStxAddress } from "../../components/auth";

import { userSession } from "../_app";

import { v4 as uuid } from "uuid";

import getNFTS, { getUserNFTs } from "../../components/get-nfts";

import { saveUserPic } from "../../components/profile";

import { fetchUserPic } from "../../components/profile";

import defaultimage from "../../assets/img/Amortize-pics/btc-amortize.jpeg"

import { Table } from "reactstrap";

import { getBTC } from "../../components/crypto-api";

import { lockTrans } from "../../components/public-transactions";

import { getNftData } from "../../components/contractCalls";

// import fileUpload from "../../components/file-upload";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { Claim } from "../../components/contractCalls";

function Profile() {

  const [isFetching, setFetching] = useState(false);

  // const [tryFetchNFT, setFetchNFT] = useState(false);

  const [data, setData] = useState([]);
  // console.log(data);

  // const [data2, setData2] = useState([]);
  // const data2 = lockTrans();
  // console.log(data2);
  // const [nfts, setNfts] = useState([]);

  const nfts = getNFTS(myStxAddress());
  console.log(nfts);
  useEffect(async () => {
    if (nfts.length > 0) {
      // setData(nfts);
      // console.log(nfts);
      // let myNftData = [];
      const btc = await getBTC();
      nfts.forEach(async (nft) => {
        // setData(myNftData);
        let nftid = nft.nft_id.slice(1, nft.nft_id.length);
        nftid = parseInt(nftid);
        const nftdata = await getNftData(nftid);
        let dashData = {
          nft_id: nftid,
          nft_pic: defaultimage,
          price: nftdata['usd-price'].value,
          btcLock: (nftdata['usd-price'].value / btc[0]).toFixed(3),
          btcAppr: ((btc[0] - nftdata['btc-usd-price'].value) / nftdata['btc-usd-price'].value) * 100,
          tx_id: nft.tx_id,
          agentAddress: nftdata.agent.value,
          // unlockTime: data2[0].unlockTime  
          unlockTime: 1000
        };
        
        setData(data => [...data, dashData] );
        // setData({
        //     ...data,
        //     // [name]: value
        //     dashData
        // })
        console.log(nftdata);
        console.log("123");
        // myNftData.push(dashData);
        // setData(myNftData);
      });
      // if (myNftData.length > 0) {
      //   setData(myNftData);
      //   console.log(data);
      // }
      // setData(myNftData);
    };

  }, [nfts]);

  // getNFTS(myStxAddress()).then((value) => {
  //   setNfts(value);
  //   console.log(value);

  // });
  // console.log(nfts);
  // const data = getUserNFTs(nfts, myStxAddress());
  // console.log(data);
  // useEffect(async () => {
  //   // getUserNFTs(nfts, myStxAddress()).then((value) => {
  //   //   setData(value);
  //   //   console.log(value);
  //   // });
  //   console.log("changed");
  //   console.log(nfts);
  //   if (nfts.length > 0) {
  //     console.log("123");
  //     const btc = await getBTC();
  //     // const data2 = lockTrans();
  //     fetch(
  //       // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
  //       `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${myStxAddress()}/transactions`
  //     )

  //       .then((fetchData) => {
  //         fetchData.json().then((fetchDataJson) => {
  //           let myProps = [];

  //           fetchDataJson.results.forEach((value, index, array) => {

  //             if (index < array.length - 1) {
  //               nfts.forEach(async (nft) => {
  //                 // console.log(value.tx_id + "\n" + nft.tx_id);
  //                 // console.log(myStxAddress());
  //                 // if (nft.tx_id === value.tx_id) {
  //                 //   console.log("nft");
  //                 //   let Price = value.contract_call.function_args[3].repr;
  //                 //   Price = Price.slice(1, Price.length);
  //                 //   Price = parseInt(Price);
  //                 //   let BTCPrice = value.contract_call.function_args[4].repr;
  //                 //   BTCPrice = BTCPrice.slice(1, BTCPrice.length);
  //                 //   BTCPrice = parseInt(BTCPrice);
  //                 //   let agent = value.contract_call.function_args[5].repr;
  //                 //   // console.log(btc);
  //                 //   let dashData = {
  //                 //     nft_id: nft.nft_id,
  //                 //     nft_pic: defaultimage,
  //                 //     price: Price,
  //                 //     btcLock: (Price / btc[0]).toFixed(3),
  //                 //     btcAppr: ((btc[0] - BTCPrice) / BTCPrice) * 100,
  //                 //     tx_id: nft.tx_id,
  //                 //     agentAddress: agent,
  //                 //     // unlockTime: data2[0].unlockTime  
  //                 //     unlockTime: 1000
  //                 //   };
  //                 //   myProps.push(dashData);
  //                 // }
  //                 // let nftid = nft.nft_id.slice(1, nft.nft_id.length);
  //                 // nftid = parseInt(nftid);
  //                 // const nftdata = await getNftData(nftid);
  //                 // console.log(nftdata);
  //                 // if (nftdata) {
  //                 //   let dashData = {
  //                 //     nft_id: nftid,
  //                 //     nft_pic: defaultimage,
  //                 //     price: nftdata['usd-price'].value,
  //                 //     btcLock: (nftdata['usd-price'].value / btc[0]).toFixed(3),
  //                 //     btcAppr: ((btc[0] - nftdata['btc-usd-price'].value) / nftdata['btc-usd-price'].value) * 100,
  //                 //     tx_id: nft.tx_id,
  //                 //     agentAddress: nftdata.agent.value,
  //                 //     // unlockTime: data2[0].unlockTime  
  //                 //     unlockTime: 1000
  //                 //   };
  //                 //   console.log(dashData);
  //                 //   myProps.push(dashData);
  //                 // }
  //                 myProps.push(nftid);
  //               });
  //             }
  //           });
  //           setData(myProps);
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e.message);
  //       });
  //   }
  // }, [nfts]);

  // getUserNFTs(nfts, myStxAddress()).then((value) => {
  //   setData(value);
  //   console.log(value);
  // });
  //console.log(data);

  const [state, setState] = useState({
    Username: "",
    EmailAddress: "",
    FirstName: "",
    LastName: "",
  });

  // useEffect(() => {
  //   if (!tryFetchNFT) {
  //     // setData(nfts);
  //     if (nfts.length > 0) {
  //       setData(getUserNFTs(nfts, myStxAddress()));
  //       console.log(data);
  //       setFetchNFT(true);
  //     }
  //   }
  // })

  useEffect(() => {
    if (!isFetching) {
      fetchUserInfo(userSession).then((userinfo) => {
        setState({
          Username: userinfo.Username,
          EmailAddress: userinfo.EmailAddress,
          FirstName: userinfo.FirstName,
          LastName: userinfo.LastName,
        });
      });
      fetchUserPic(userSession).then((profilePic) => {
        if (profilePic) {
          const objImg = { img: null }
          objImg.img = new Buffer.from(profilePic).toString("base64")
          console.log(profilePic);
          setfilestate({ selectedFile: "data:image/png;base64," + objImg.img });
        }
      });
      setFetching(true);
      // setData(nfts);
      // console.log(nfts);
      console.log("Tried Fetching");
    }
  }, []);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    const UserInfo = {
      Username: state.Username,
      EmailAddress: state.EmailAddress,
      FirstName: state.FirstName,
      LastName: state.LastName,
      id: uuid(),
    };

    if (userSession.isUserSignedIn()) {
      saveUserInfo(UserInfo).then((result) => {
        console.log(result);
      });
    }
    else {
      console.log('User is not Signed in!');
    }
  };

  const [filestate, setfilestate] = useState({

    // Initially, no file is selected
    selectedFile: null
  });

  // On file select (from the pop up)
  const onFileChange = (event) => {

    // Update the state
    setfilestate({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button)
  const onFileUpload = () => {

    // Create an object of formData
    // const formData = new FormData();

    // const objectUrl = URL.createObjectURL(filestate.selectedFile);
    // setfilestate({ selectedFile: objectUrl });
    // Update the formData object
    // formData.append(
    //   "profilePic",
    //   filestate.selectedFile,
    //   filestate.selectedFile.name
    // );



    // Details of the uploaded file
    console.log(filestate.selectedFile);
    if (userSession.isUserSignedIn()) {
      saveUserPic(filestate.selectedFile).then((result) => {

        console.log(result);
      });
    }
    else {
      console.log('User is not Signed in!');
    }
    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  const ClaimEquity = evt => {
    const name = evt.target.name;
    const value = evt.target.value.split(",");
    // console.log(value);
    // ApproveEquity(value[0], value[1], value[2]);
    let nft_id = value[0].slice(1, value[0].length);
    nft_id = parseInt(nft_id);
    Claim(nft_id, value[1]);
  }



  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={filestate.selectedFile ? filestate.selectedFile : defaultimage}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <div></div>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{nfts.length}</span>
                        <span className="description">Property Minted</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">STX</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {state.FirstName} {state.LastName}
                  </h3>
                  <h4>
                    <span className="font-weight-light"> {state.Username}</span>
                  </h4>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {state.EmailAddress}
                  </div>

                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {/* {myStxAddress()} */}
                    {/* <fileUpload/> */}
                    <input type="file" onChange={onFileChange} />
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={onFileUpload}
                      // onChange={onFileChange()}
                      size="sm"
                    >
                      Upload
                    </Button>

                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            name="Username"
                            onChange={handleChange}
                            // value={state.Username}
                            defaultValue={state.Username}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="EmailAddress"
                            onChange={handleChange}
                            // value={state.EmailAddress}
                            defaultValue={state.EmailAddress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            name="FirstName"
                            onChange={handleChange}
                            // value={state.FirstName}
                            defaultValue={state.FirstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            // value={state.LastName}
                            defaultValue={state.LastName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Properties Minted</h3>
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NFT ID</th>
                    <th scope="col">NFT PIC</th>
                    <th scope="col">Price</th>
                    <th scope="col">BTC Locked</th>
                    <th scope="col">BTC APPR</th>
                    <th scope="col">Agent</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(nft => 
                    // const btc = await getBTC();
                    // let nftid = nft.nft_id.slice(1, nft.nft_id.length);
                    // nftid = parseInt(nftid);
                    // const nftdata = await getNftData(nftid);
                    <tr>
                      <th scope="row">{nft.nft_id}</th>
                      <td>
                        <a href={nft.nft_pic}></a>
                      </td>
                      <td>{nft.price}</td>
                      <td>{nft.btcLock}</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{nft.btcAppr}
                      </td>
                      <td>{nft.agentAddress}</td>
                      <td>{new Date(nft.unlockTime * 1000).toLocaleString()}</td>
                      <Button onClick={ClaimEquity} value={[nft.nft_id, nft.agentAddress]}>Claim</Button>
                      
                    </tr>
                  
                  )}
                  {/* {data2.map(Props => {
                    <tr>
                      <td>{new Date(Props.unlockTime * 1000).toLocaleString()}</td>
                    </tr>
                  })} */}
                  {/* <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

Profile.layout = Admin;

export default Profile;

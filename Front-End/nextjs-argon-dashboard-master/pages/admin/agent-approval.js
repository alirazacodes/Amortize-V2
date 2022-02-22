import React, { useEffect } from "react";
// import { myStxAddress  } from "../../components/auth";
import { useState } from "react";

import { saveAgentInfo } from "../../components/agent-reg";

import { fetchAgentInfo } from "../../components/agent-reg";

import { removeAgentInfo } from "../../components/agent-reg";

import { ApproveEquity } from "../../components/contractCalls";

// import { userSession } from "../../components/auth";
// import { userSession } from "../pages/_app";

import { userSession } from "../_app";

import { v4 as uuid } from "uuid";

import navigation from "react";

import { Table } from "reactstrap";
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

import verifyEquity, { getNFTID } from "../../components/get-claimable-nfts";
import { myStxAddress } from "../../components/auth";
import getNFTS from "../../components/get-nfts";
// import { json } from "stream/consumers";

// let data = [];

// function equityData(equity2) {
//     const [nftData, setNFTData] = useState([]);




//     // const imageUrl =
//     //     "https://gaia.blockstack.org/hub/" + data.tokenUri + "-image.jpg";

//     // setImageSource(imageUrl);

//     useEffect(() => {
//         let equities = [];
//         equity2.forEach((value) => {
//             const uri = value.token_uri.slice(1, value.token_uri.length - 1)
//             const fileUrl =
//                 "https://gaia.blockstack.org/hub/" + uri + "-PropInfo.json";
//             fetch(fileUrl)
//                 .then((response) => {
//                     response
//                         .text()
//                         .then((data) => {
//                             console.log(JSON.parse(data));
//                             // setNftData(JSON.parse(data));
//                             let equityData2 = JSON.parse(data);
//                             const data2 = {
//                                 nft_id: value.nft_id,
//                                 OwnerSTXAddress: value.HouseOwner,
//                                 TermLength: equityData2.TermLength,
//                                 HomeValue: equityData2.ValueOfHome,
//                                 CurrentMortgageBalance: equityData2.CurrentMortgageBalance,
//                                 CustomerName: equityData2.UserName,
//                                 Estate: equityData2.Estate,
//                                 HomeAddress: equityData2.HomeAddress
//                             }
//                             equities.push(data2);
//                         })
//                         .catch((e) => {
//                             console.log(e.message);
//                         });
//                 })
//                 .catch((e) => {
//                     console.log(e.message);
//                 });
//                 setNFTData(equities);
//         });
//     }, []);
//     return nftData;
// }


function AgentApprove() {
    const [data2, setData2] = useState([]);
    const [data, setData] = useState([]);

    useEffect(async () => {
        const response = await verifyEquity(myStxAddress());
        if (data.length < 1) {
            setData(response);
            console.log("fetch");
            console.log(data.length);
            console.log(data);
        }
        // else {
        //     const NFTIDs = await getNFTID(data);
        //     if (NFTIDs.length != 0 || NFTIDs != undefined) {
        //         console.log(NFTIDs[0]);
        //     }
        // }
        setData2(response);
    }, [data2]);

    // const [state, setState] = useState({
    //     STXAddress: "",
    //     Phone: "",
    //     FirstName: "",
    //     LastName: "",
    //     Estate: ""
    // });

    // const data = verifyEquity(myStxAddress());


    // if(!isFetching){
    //     data = verifyEquity(myStxAddress());
    //     setFetching(true);
    // }

    // const [data3, setData3] = useState([]);

    // const data3 = equityData(data2);

    // console.log(data3);

    // useEffect(() => {

    //     data.forEach((verifyNFTs) => {
    //         console.log();
    //         fetch(
    //             `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${verifyNFTs.Owner}/assets`
    //         )

    //             .then((fetchData) => {
    //                 fetchData.json().then((fetchDataJson) => {
    //                     let myNfts = [];
    //                     // console.log(fetchDataJson);
    //                     fetchDataJson.results.forEach((value) => {
    //                         // data.forEach((verifyNFTs) => {
    //                         if (value.event_type === "non_fungible_token_asset") {
    //                             // console.log(value);
    //                             if (
    //                                 // value.asset.asset_id ===
    //                                 // "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-nft-minting-V5::amortize-nft"
    //                                 value.tx_id == verifyNFTs.tx_id
    //                             ) {
    //                                 // console.log(value.asset.value.repr);
    //                                 // const nft = { tx_id: value.tx_id, nft_id: value.asset.value.repr };
    //                                 // getUserNFTs(nft, principal).then((value2) => {
    //                                 //     myNfts.push(value2);
    //                                 // });
    //                                 const data = {
    //                                     nft_id: value.asset.value.repr,
    //                                     token_uri: verifyNFTs.token_uri,
    //                                     HouseOwner: verifyNFTs.Owner
    //                                 }
    //                                 // const equityData2 = equityData(data.token_uri);
    //                                 // console.log(equityData2);
    //                                 myNfts.push(data);
    //                             }
    //                         }
    //                     });

    //                     setData2(myNfts);
    //                     // setNumberOfDegrees(myNfts.length);
    //                 });
    //             })
    //             .catch((e) => {
    //                 console.log(e.message);
    //             });
    //     });
    // }, [data]);

    // useEffect(() => {
    //     if (data2.length > 0) {
    //         let equities = [];
    //         data2.forEach((value) => {
    //             const uri = value.token_uri.slice(1, value.token_uri.length - 1)
    //             console.log(uri);
    //             const equityData2 = equityData(uri);
    //             const data = {
    //                 nft_id: value.nft_id,
    //                 OwnerSTXAddress: value.HouseOwner,
    //                 TermLength: equityData2.TermLength,
    //                 HomeValue: equityData2.ValueOfHome,
    //                 CurrentMortgageBalance: equityData2.CurrentMortgageBalance,
    //                 CustomerName: equityData2.UserName,
    //                 Estate: equityData2.Estate,
    //                 HomeAddress: equityData2.HomeAddress
    //             }
    //             equities.push(data);
    //             // console.log(equityData2);
    //         });
    //         setData3(equities);
    //     }
    // }, [data2]);

    const [selectedProp, setSelectedProp] = useState([]);

    const Approve = evt => {
        const name = evt.target.name;
        const value = evt.target.value.split(",");
        // console.log(value);
        // ApproveEquity(value[0], value[1], value[2]);
        ApproveEquity(value[0], value[1], 25);
    }

    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Equities to be Approved</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        {/* <th scope="col">NFT id</th> */}
                                        <th scope="col">Owner Wallet Address</th>
                                        <th scope="col">Owner Name</th>
                                        <th scope="col">Term Length</th>
                                        <th scope="col">Home Value</th>
                                        <th scope="col">Current Mortgage Balance</th>
                                        <th scope="col">Home Address</th>
                                        <th scope="col">Estate</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(dataProps =>
                                        <tr>
                                            {/* <th scope="row">{dataProps.STXAddress}</th>
                                            <td>{dataProps.Phone}</td>
                                            <td>{dataProps.FirstName +" "+ dataProps.LastName}</td>
                                            <td>{dataProps.Estate}</td>
                                            <Button onClick={() => removeAgent(dataProps.STXAddress)}>Remove Agent</Button> */}
                                            {/* <td>{dataProps.nft_id}</td> */}
                                            <td>{dataProps.OwnerSTXAddress}</td>
                                            <td>{dataProps.CustomerName}</td>
                                            <td>{dataProps.TermLength}</td>
                                            <td>{dataProps.HomeValue}</td>
                                            <td>{dataProps.CurrentMortgageBalance}</td>
                                            <td>{dataProps.HomeAddress}</td>
                                            <td>{dataProps.Estate}</td>
                                            <Button value={[dataProps.OwnerSTXAddress, dataProps.TermLength, dataProps.HomeValue]} onClick={Approve}>
                                                Approve
                                            </Button>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

AgentApprove.layout = Admin;

export default AgentApprove;


// Address, phone no, zip code, city, estate,

// math: TermLen, ValOfHom, curMortBalance
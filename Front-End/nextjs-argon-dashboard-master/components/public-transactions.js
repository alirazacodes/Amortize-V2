import React, { useEffect, useState } from "react";
import { ToastHeader } from "reactstrap";
import { myStxAddress } from "./auth";

// import { useAtom } from "jotai";
// import { numberOfDegreesAtom } from "./StateAtoms";

import { getBTC } from "./crypto-api";

const principal = 'ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-nft-minting-V5';
const lockPrincipal = 'ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-btc-lock-V6';
export default function pTrans() {
    // const btcPrice = 50000;



    // const [isFetching, setFetching] = useState(false);
    const [myTrans, setTrans] = useState([]);
    // if (!isFetching || BTC == 1) {

    // getBTC().then((value) => {
    //     setBTC(value[0]);
    //     // setBTCchange(value[1]);
    //     console.log("fetched");
    //     // console.log("btc" + value[0]);

    //     // setFetching(true);
    // });
    // setFetching(true);
    // let btcPrice = 0;
    // }

    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(async () => {
        // if (!principal) return;

        const btc = await getBTC();

        fetch(
            // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myProps = [];
                    // let currNftID = fetchDataJson.results.length;
                    let totalNfts = 0;
                    fetchDataJson.results.forEach((value, index, array) => {
                        if (index < array.length - 1) {
                            if (value.contract_call.function_name === "mint" && value.tx_status === "success") {
                                totalNfts++;
                            }
                        }
                    });
                    totalNfts++;
                    fetchDataJson.results.forEach((value, index, array) => {
                        // if (
                        //     value.asset_identifier ===
                        //     "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        // ) {
                        //     console.log(value);
                        //     myNfts.push(value.value.repr);
                        // }
                        if (index < array.length - 1) {
                            // if (value.contract_call.function_name === "mint" && value.tx_status === "success!") {
                            // totalNfts++;

                            let Owner = value.contract_call.function_args[0].repr;
                            let Price = value.contract_call.function_args[3].repr;
                            let BTCPrice = value.contract_call.function_args[4].repr;
                            Price = Price.slice(1, Price.length);
                            Price = parseInt(Price);
                            BTCPrice = BTCPrice.slice(1, BTCPrice.length);
                            BTCPrice = parseInt(BTCPrice);
                            // console.log(btc);
                            let dashData = {
                                nftID: totalNfts,
                                owner: Owner,
                                price: Price,
                                btcLock: (Price / btc[0]).toFixed(3),
                                btcAppr: ((btc[0] - BTCPrice) / BTCPrice) * 100
                            };
                            myProps.push(dashData);
                            totalNfts--;
                            // }
                            // console.log(dashData);

                            // console.log(value.contract_call.function_args);
                        }

                    });
                    console.log(totalNfts);
                    // if (totalNfts > 0) {
                    //     totalNfts++;
                    //     fetchDataJson.results.forEach((value, index, array) => {
                    //         if (index < array.length - 1) {
                    //             let Owner = value.contract_call.function_args[0].repr;
                    //             let Price = value.contract_call.function_args[3].repr;
                    //             let BTCPrice = value.contract_call.function_args[4].repr;
                    //             Price = Price.slice(1, Price.length);
                    //             Price = parseInt(Price);
                    //             BTCPrice = BTCPrice.slice(1, BTCPrice.length);
                    //             BTCPrice = parseInt(BTCPrice);
                    //             // console.log(btc);
                    //             let dashData = {
                    //                 nftID: totalNfts,
                    //                 owner: Owner,
                    //                 price: Price,
                    //                 btcLock: (Price / btc[0]).toFixed(3),
                    //                 btcAppr: ((btc[0] - BTCPrice) / BTCPrice) * 100
                    //             };
                    //             checkOwner(dashData).then(() => {
                    //                 myProps.push(dashData);
                    //                 totalNfts--;
                    //             });
                    //             // myProps.push(dashData);
                    //             // totalNfts--;
                    //         }
                    //     });
                    // }

                    setTrans(myProps);
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myTrans;
}

export function equityMonthWise() {
    const [myTrans, setTrans] = useState({
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
    });
    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        // if (!principal) return;

        fetch(
            // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myProps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    fetchDataJson.results.forEach((value, index, array) => {
                        // if (
                        //     value.asset_identifier ===
                        //     "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        // ) {
                        //     console.log(value);
                        //     myNfts.push(value.value.repr);
                        // }
                        if (index < array.length - 1) {

                            let date = value.burn_block_time_iso;
                            date = date.slice(5, 7);
                            date = parseInt(date);
                            // console.log(date);
                            myProps[date] += 1;

                            // myProps.push(dashData);
                            // console.log(dashData);

                            // console.log(value.contract_call.function_args);
                        }

                    });

                    setTrans({
                        January: myProps[1],
                        February: myProps[2],
                        March: myProps[3],
                        April: myProps[4],
                        May: myProps[5],
                        June: myProps[6],
                        July: myProps[7],
                        August: myProps[8],
                        September: myProps[9],
                        October: myProps[10],
                        November: myProps[11],
                        December: myProps[12]
                    });
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myTrans;
}

export function performanceMonthWise() {
    const [myTrans, setTrans] = useState({
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
    });
    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        // if (!principal) return;

        fetch(
            // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myProps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    fetchDataJson.results.forEach((value, index, array) => {
                        // if (
                        //     value.asset_identifier ===
                        //     "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        // ) {
                        //     console.log(value);
                        //     myNfts.push(value.value.repr);
                        // }
                        if (index < array.length - 1) {

                            let date = value.burn_block_time_iso;
                            date = date.slice(5, 7);
                            date = parseInt(date);
                            let Price = value.contract_call.function_args[3].repr;
                            Price = Price.slice(1, Price.length);
                            Price = parseInt(Price);
                            myProps[date] += Price;

                            // myProps.push(dashData);
                            // console.log(dashData);

                            // console.log(value.contract_call.function_args);
                        }

                    });

                    setTrans({
                        January: myProps[1],
                        February: myProps[2],
                        March: myProps[3],
                        April: myProps[4],
                        May: myProps[5],
                        June: myProps[6],
                        July: myProps[7],
                        August: myProps[8],
                        September: myProps[9],
                        October: myProps[10],
                        November: myProps[11],
                        December: myProps[12]
                    });
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myTrans;
}

export function statsTrans() {
    // const btcPrice = 50000;



    // const [isFetching, setFetching] = useState(false);
    const [myTrans, setTrans] = useState([]);
    // if (!isFetching || BTC == 1) {

    // getBTC().then((value) => {
    //     setBTC(value[0]);
    //     // setBTCchange(value[1]);
    //     console.log("fetched");
    //     // console.log("btc" + value[0]);

    //     // setFetching(true);
    // });
    // setFetching(true);
    // let btcPrice = 0;
    // }

    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        // if (!principal) return;

        // const btc = await getBTC();

        fetch(
            // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myProps = [];

                    fetchDataJson.results.forEach((value, index, array) => {
                        // if (
                        //     value.asset_identifier ===
                        //     "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        // ) {
                        //     console.log(value);
                        //     myNfts.push(value.value.repr);
                        // }
                        if (index < array.length - 1) {
                            let nftID = (array.length - 1) - index;
                            let Price = value.contract_call.function_args[3].repr;
                            Price = Price.slice(1, Price.length);
                            Price = parseInt(Price);
                            let status = value.tx_status;
                            // console.log(btc);
                            let dashData = {
                                ID: nftID,
                                price: Price,
                                status: status,

                            };
                            myProps.push(dashData);
                            // console.log(dashData);

                            // console.log(value.contract_call.function_args);
                        }

                    });

                    setTrans(myProps);
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myTrans;
}

export function lockTrans() {
    // const btcPrice = 50000;



    // const [isFetching, setFetching] = useState(false);
    const [myTrans, setTrans] = useState([]);
    // if (!isFetching || BTC == 1) {

    // getBTC().then((value) => {
    //     setBTC(value[0]);
    //     // setBTCchange(value[1]);
    //     console.log("fetched");
    //     // console.log("btc" + value[0]);

    //     // setFetching(true);
    // });
    // setFetching(true);
    // let btcPrice = 0;
    // }

    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        // if (!principal) return;

        // const btc = await getBTC();

        fetch(
            // `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nft_events`
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${lockPrincipal}/transactions`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myProps = [];

                    fetchDataJson.results.forEach((value, index, array) => {
                        // if (
                        //     value.asset_identifier ===
                        //     "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-nft-minting-V2::amortize-nft"
                        // ) {
                        //     console.log(value);
                        //     myNfts.push(value.value.repr);
                        // }
                        if (index < array.length - 1) {
                            if (value.contract_call.function_name === "lock") {
                                let beneficiary = value.contract_call.function_args[0].repr;
                                let unlockTime = value.contract_call.function_args[1].repr;
                                // let BTCPrice = value.contract_call.function_args[4].repr;
                                unlockTime = unlockTime.slice(1, unlockTime.length);
                                unlockTime = parseInt(unlockTime);
                                // BTCPrice = BTCPrice.slice(1, BTCPrice.length);
                                // BTCPrice = parseInt(BTCPrice);
                                // console.log(btc);
                                if (beneficiary == myStxAddress()) {
                                    let dashData = {
                                        beneficiary: beneficiary,
                                        unlockTime: unlockTime,
                                        // btcLock: (Price / btc[0]).toFixed(3),
                                        // btcAppr: ((btc[0] - BTCPrice) / BTCPrice) * 100
                                    };
                                    myProps.push(dashData);
                                }
                            }
                            // console.log(dashData);

                            // console.log(value.contract_call.function_args);
                        }

                    });

                    setTrans(myProps);
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myTrans;
}

// export function checkOwner(DATA) {

//     DATA.forEach(async (dashData) => {
//         try {

//             const response = await fetch(
//                 `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${lockPrincipal}/transactions?limit=50`
//             );

//             const fetchDataJson = await response.json();

//             fetchDataJson.results.every((value) => {
//                 // console.log(value);
//                 if (value.post_conditions && value.tx_status === "success") {
//                     // console.log(value.post_conditions);
//                     if (value.post_conditions.length == 2) {
//                         console.log("xyz");
//                         let nftid = value.post_conditions[1].asset_value.repr;
//                         nftid = nftid.slice(1, nftid.length);
//                         nftid = parseInt(nftid);
//                         console.log(nftid);
//                         console.log(dashData.nftID);
//                         if (nftid == dashData.nftID) {
//                             console.log("NewOwner");
//                             const NewOwner = value.contract_call.function_args[1].repr;

//                             dashData.owner = NewOwner;
//                             return false;
//                         }
//                         return true;
//                     }
//                 }
//             });
//         }
//         catch (err) {
//             console.log(err);
//             return;
//         }
//     });


// }

export async function checkOwner(DATA) {

    try {

        const response = await fetch(
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${lockPrincipal}/transactions?limit=50`
        );

        const fetchDataJson = await response.json();

        fetchDataJson.results.forEach((value) => {

            DATA.forEach((dashData) => {
                // console.log(value);
                if (value.post_conditions && value.tx_status === "success") {
                    // console.log(value.post_conditions);
                    if (value.post_conditions.length == 2) {
                        console.log("xyz");
                        let nftid = value.post_conditions[1].asset_value.repr;
                        nftid = nftid.slice(1, nftid.length);
                        nftid = parseInt(nftid);
                        console.log(nftid);
                        console.log(dashData.nftID);
                        if (nftid == dashData.nftID) {
                            console.log("NewOwner");
                            const NewOwner = value.contract_call.function_args[1].repr;

                            dashData.owner = NewOwner;
                            // return false;
                        }

                        // return true;
                    }
                }

            });
        });
    }
    catch (err) {
        console.log(err);
        return;
    }

}
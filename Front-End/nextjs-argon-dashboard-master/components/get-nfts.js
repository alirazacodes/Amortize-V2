import { useEffect, useState } from "react";

// import { useAtom } from "jotai";
// import { numberOfDegreesAtom } from "./StateAtoms";

import { getBTC } from "./crypto-api";

import defaultimage from "../assets/img/Amortize-pics/btc-amortize.jpeg";


export default function getNFTS(principal) {
    const [myNfts, setMyNfts] = useState([]);
    // const [, setNumberOfDegrees] = useAtom(numberOfDegreesAtom);

    useEffect(() => {
        if (!principal) return;

        fetch(
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/assets`
        )

            .then((fetchData) => {
                fetchData.json().then((fetchDataJson) => {
                    let myNfts = [];
                    let transferedNFTs = [];
                    // console.log(fetchDataJson);
                    fetchDataJson.results.forEach((value) => {
                        // console.log(value);
                        if (value.event_type === "non_fungible_token_asset") {
                            // console.log(value);
                            if (
                                value.asset.asset_id ===
                                "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-nft-minting-V6::amortize-nft"

                            ) {
                                // console.log(value.asset.value.repr);
                                const nft = { tx_id: value.tx_id, nft_id: value.asset.value.repr };
                                // getUserNFTs(nft, principal).then((value2) => {
                                //     myNfts.push(value2);
                                // });
                                if (value.asset.sender === principal) {
                                    transferedNFTs.push(nft.nft_id);
                                    console.log();
                                }
                                else if(value.asset.recipient === principal && !transferedNFTs.includes(nft.nft_id)) {
                                    myNfts.push(nft);
                                }
                                
                            }
                        }
                    });

                    setMyNfts(myNfts);
                    // setNumberOfDegrees(myNfts.length);
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [principal]);

    return myNfts;

}

export async function getUserNFTs(nfts, principal) {
    // const btcPrice = 50000;
    // if (nfts.length == 0) {
    //     console.log(nfts.length);
    //     return; 
    // }
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
        if (!principal) return;

        const btc = await getBTC();

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
                            nfts.forEach((nft) => {
                                if (nft.tx_id == value.tx_id) {
                                    console.log("nft");
                                    let Price = value.contract_call.function_args[3].repr;
                                    Price = Price.slice(1, Price.length);
                                    Price = parseInt(Price);
                                    let BTCPrice = value.contract_call.function_args[4].repr;
                                    BTCPrice = BTCPrice.slice(1, BTCPrice.length);
                                    BTCPrice = parseInt(BTCPrice);
                                    // console.log(btc);
                                    let dashData = {
                                        nft_id: nft.nft_id,
                                        nft_pic: defaultimage,
                                        price: Price,
                                        btcLock: (Price / btc[0]).toFixed(3),
                                        btcAppr: ((btc[0] - BTCPrice) / BTCPrice) * 100,
                                        tx_id: nft.tx_id
                                    };
                                    myProps.push(dashData);
                                }
                            });
                            // let Owner = value.contract_call.function_args[0].repr;
                            // let Price = value.contract_call.function_args[3].repr;
                            // Price = Price.slice(1, Price.length);
                            // Price = parseInt(Price);
                            // // console.log(btc);
                            // let dashData = {
                            //     owner: Owner,
                            //     price: Price,
                            //     btcLock: (Price / btc[0]).toFixed(3),
                            //     btcAppr: "20%"
                            // };
                            // myProps.push(dashData);
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

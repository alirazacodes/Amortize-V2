import React, { useEffect, useState } from "react";

import { getBTC } from "./crypto-api";

import getNFTS from "./get-nfts";

const principal = 'ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-nft-minting-V6';

export default async function verifyEquity(AgentSTXAddress) {

    // if (!AgentSTXAddress) return [];

    try {

        const response = await fetch(
            `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`
        );

        const fetchDataJson = await response.json();

        let myProps = [];

        fetchDataJson.results.forEach((value, index, array) => {

            if (index < array.length - 1) {
                let AgentAddress = value.contract_call.function_args[5].repr;
                if (AgentSTXAddress == AgentAddress) {
                    let tx_id = value.tx_id;
                    let ownerSTXAddress = value.contract_call.function_args[0].repr;
                    let token_uri = value.contract_call.function_args[2].repr;
                    const data = { tx_id: tx_id, Owner: ownerSTXAddress, token_uri: token_uri };
                    myProps.push(data);
                }
            }

        });
        // console.log(myProps);
        // const NFTIDs = await getNFTID(myProps);
        const equityData = await getEquityData(myProps);
        // console.log(equityData);
        return equityData;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

async function getEquityData(NftData) {
    // const NFTIDs = await getNFTID(NftData);
    let myEquityData = [];
    // console.log(NFTIDs);
    // NFTIDs.forEach((value) => {
    //     console.log(value);
    // });
    NftData.forEach(async (value, index, array) => {

        try {
            const uri = value.token_uri.slice(1, value.token_uri.length - 1)
            const fileUrl =
                "https://gaia.blockstack.org/hub/" + uri + "-PropInfo.json";

            const response = await fetch(fileUrl);

            const data = await response.text();
            // const nftid = await getNFTID(value);
            // console.log(nftid);
            const equityData = JSON.parse(data);
            // console.log(equityData);
            const completeEquityData = {
                nft_id: 0,
                OwnerSTXAddress: value.Owner,
                TermLength: equityData.TermLength,
                HomeValue: equityData.ValueOfHome,
                CurrentMortgageBalance: equityData.CurrentMorgageBalance,
                CustomerName: equityData.UserName,
                Estate: equityData.Estate,
                HomeAddress: equityData.HomeAddress,
                tx_id: value.tx_id
            }
            // console.log(completeEquityData);
            myEquityData.push(completeEquityData);
        }
        catch (err) {
            console.log(err);
            return [];
        }

    });

    return myEquityData;

}

export async function getNFTID(data) {

    // let NFTIDs = [];
    let nftid = [];
    // console.log(data);
    data.forEach(async (verifyNFTs) => {
        // console.log(verifyNFTs);
        try {

            const response = await fetch(
                `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${verifyNFTs.OwnerSTXAddress}/assets`
            );

            const fetchDataJson = await response.json();
            // console.log(fetchDataJson);
            // console.log("Hi!");
            fetchDataJson.results.forEach((value) => {
                // console.log(value);
                if (value.event_type == "non_fungible_token_asset") {
                    // console.log("nft found");
                    if (value.tx_id == verifyNFTs.tx_id) {
                        // console.log("id-found");
                        // nftid.push(value.asset.value.repr);
                        // console.log(nftid);
                        const completeEquityData = {
                            nft_id: value.asset.value.repr,
                            OwnerSTXAddress: verifyNFTs.OwnerSTXAddress,
                            TermLength: verifyNFTs.TermLength,
                            HomeValue: verifyNFTs.HomeValue,
                            CurrentMortgageBalance: verifyNFTs.CurrentMortgageBalance,
                            CustomerName: verifyNFTs.CustomerName,
                            Estate: verifyNFTs.Estate,
                            HomeAddress: verifyNFTs.HomeAddress,
                            tx_id: verifyNFTs.tx_id
                        }
                        nftid.push(completeEquityData);
                        // return nftid;
                        // console.log(nftid);
                        // NFTIDs.push(nftid);
                        // return nftid.toString();
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            // return;
        }

    });
    return nftid;
    // return NFTIDs;

}
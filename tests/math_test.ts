
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

// Clarinet.test({
//     name: "Ensure that all formulas work",
//     async fn(chain: Chain, accounts: Map<string, Account>) {
//         let wallet_1 = accounts.get('wallet_1')!;
//         let block = chain.mineBlock([
//             Tx.contractCall('math', 'minting-equity', [], wallet_1.address),
//             Tx.contractCall('math', 'get-minting-equity', [], wallet_1.address),
//             Tx.contractCall('math', 'btc-to-contract', [], wallet_1.address),
//             Tx.contractCall('math', 'get-btc-to-contract', [], wallet_1.address),
//             Tx.contractCall('math', 'amortize-Rate', [], wallet_1.address),
//             Tx.contractCall('math', 'get-amortize-rate', [], wallet_1.address),
//             Tx.contractCall('math', 'rate-per-Period', [], wallet_1.address),
//             Tx.contractCall('math', 'get-rate-per-Period', [], wallet_1.address),
//             Tx.contractCall('math', 'btc-appreciation', [], wallet_1.address),
//         ]);

//         assertEquals(block.receipts.length, 9);
//         assertEquals(block.height, 2);
        
    
//         block.receipts[0].result
//         .expectOk()
//         .expectBool(true);

//         block.receipts[1].result
//         .expectInt(50000);

//         block.receipts[2].result
//         .expectOk()
//         .expectBool(true);

//         block.receipts[3].result
//         .expectInt(1);

//         block.receipts[4].result
//         .expectOk()
//         .expectBool(true);

//         block.receipts[5].result
//         .expectInt(15);

//         block.receipts[6].result
//         .expectOk()
//         .expectBool(true);

//         // Will fail due to Decimal Issues 
//         block.receipts[7].result
//         .expectInt(15);

//         block.receipts[8].result
//         .expectInt(15);
//     },
// });

// Constants 

let Y = 0.50; // Bitcoin Appreciation Percentage, Default -> 50%
let X = 0.05; // Property Apprection Percentage, Default -> 5%
let OptionFee = 0.05; // Default -> 5%
let StartNumHom = 500;
let AnualProtGrow = 1; // Percentage, Default -> 100% 
let AvgNumOptCall = 0.50; // Percentage, Default -> 50%

// Variables

let HomeOwnerCal = new HomeOwner(50000, 500000, 5, 200000);
let WithDraws = new WithdrawlContract(1, HomeOwnerCal.BtcToCot, HomeOwnerCal.TermLength);

// Array Initialization

let DataProts = new Array(HomeOwnerCal.TermLength + 1);

for (let N = 0; N < HomeOwnerCal.TermLength + 1; N++) {
    DataProts[N] = new DataForProtocol();
}

let BTCApprections = new Array(HomeOwnerCal.TermLength + 1);

for (let N = 0; N < HomeOwnerCal.TermLength + 1; N++) {
    BTCApprections[N] = new BTCAppreciate();
}

let ProtRev = new Array(HomeOwnerCal.TermLength + 1);

for (let N = 0; N < HomeOwnerCal.TermLength + 1; N++) {
    ProtRev[N] = new PropRev();
}

let InvestNFT = new Array(HomeOwnerCal.TermLength + 1);

for (let N = 0; N < HomeOwnerCal.TermLength + 1; N++) {
    InvestNFT[N] = new NFTInvestCal();
}


// User-defined-objects

export function HomeOwner(PriceBTC, ValueOfHome, TermLength, CurrMorBalance) {
    this.PriceBTC = PriceBTC;
    this.ValueOfHome = ValueOfHome;
    this.TermLength = Number(TermLength);
    this.CurrMorBalance = CurrMorBalance;
    this.HomeEquity = Math.min((this.ValueOfHome - this.CurrMorBalance) / 2, this.PriceBTC);
    this.BtcToCot = this.HomeEquity / this.PriceBTC;
}

export function WithdrawlContract(PaymentFrequency, BtcToCot, TermLength) {
    this.BTCAmount = BtcToCot;

    if (TermLength === 10) {
        this.AmortizeRate = 15;
    }

    else if (TermLength === 7) {
        this.AmortizeRate = 18;
    }

    else if (TermLength === 5) {
        this.AmortizeRate = 23;
    }

    this.PaymentFrequency = PaymentFrequency;

    this.RatePerPeriod = Math.round((((1 + ((this.AmortizeRate / 100) / this.BTCAmount)) ** (this.BTCAmount / this.PaymentFrequency)) - 1) * 100);

    this.AmortizeConstant = ((this.BTCAmount * (this.RatePerPeriod / 100)) / (1 - ((1 + (this.RatePerPeriod / 100)) ** (-1 * (TermLength * this.PaymentFrequency)))));
}

export function BTCAppreciate(ValueOfHome, CurrMorBalance, Balance, PriceBTC) {
    this.HomeEquity = ValueOfHome - CurrMorBalance;
    this.BTCinContract = Balance;
    this.ESTPriceBTC = PriceBTC;
    this.ESTValCot = this.BTCinContract * this.ESTPriceBTC;
    this.CotPrice = 0;
    this.ESTProfit = 0;
}

export function DataForProtocol(BtcToCot, HomeEquity, PriceBTC) {
    this.Payment = 0;
    this.Balance = BtcToCot;
    this.AnuityWithdraw = 0;
    this.TxFee = 2.5;
    this.BTCYieldNFT = 0;
    this.NFTYieldUSD = 0;
    this.CotAppr = 0;
    this.NFTRevOptCall = (HomeEquity * this.CotAppr) + HomeEquity;
    this.OptCallFee = 0.05;
    this.ESTBTCPrice = PriceBTC;
}

function PropRev() {
    this.homes = 0;
    this.btcincot = 0;
    this.txrevbtc = 0;
    this.txrevusd = 0;
    this.futvaltxinbtc = 0;
    this.avgbtccotpr = 0;
}

function NFTInvestCal() {
    this.btcnftyield = 0;
    this.nftrevusd = 0;
    this.contprice = 0;
    this.usdroci = 0;
    this.roioptcal = 0;
    this.irroptcal = 0;
}


// Calculation Functions

export function CalculateAppreciation(BTCApp, HomeOwnerCal, DataProts) {

    if (BTCApp != undefined) 
    {
        BTCApp[1].HomeEquity = ((HomeOwnerCal.ValueOfHome - HomeOwnerCal.CurrMorBalance) * X)
            + (HomeOwnerCal.ValueOfHome - HomeOwnerCal.CurrMorBalance);

        BTCApp[1].BTCinContract = DataProts[1].Balance;

        BTCApp[1].ESTPriceBTC = (HomeOwnerCal.PriceBTC * Y) + HomeOwnerCal.PriceBTC;

        BTCApp[1].ESTValCot = BTCApp[1].BTCinContract * BTCApp[1].ESTPriceBTC;

        BTCApp[1].CotPrice = DataProts[1].NFTRevOptCall + DataProts[1].OptCallFee;

        BTCApp[1].ESTProfit = Math.max(((BTCApp[1].ESTValCot - BTCApp[1].CotPrice) - (BTCApp[1].ESTValCot * OptionFee)), 0);

        for (let N = 2; N < BTCApp.length; N++) {
            BTCApp[N].HomeEquity = (BTCApp[N - 1].HomeEquity * X) + BTCApp[N - 1].HomeEquity;
            BTCApp[N].BTCinContract = DataProts[N].Balance;
            BTCApp[N].ESTPriceBTC = DataProts[N].ESTBTCPrice;
            BTCApp[N].ESTValCot = BTCApp[N].ESTPriceBTC * BTCApp[N].BTCinContract;
            BTCApp[N].CotPrice = DataProts[N].NFTRevOptCall + DataProts[N].OptCallFee;
            BTCApp[N].ESTProfit = Math.max(((BTCApp[N].ESTValCot - BTCApp[N].CotPrice) - (BTCApp[N].ESTValCot * OptionFee)), 0);
        }
    }

}

export function CalculateDataProtocol(DataProtocols, RatePerPeriod, AmortizeConstant, Length) {
    let TermLength = Number(Length);

    for (let N = 1; N < TermLength + 1; N++) {
        DataProtocols[N].Payment = DataProtocols[N - 1].Balance * (RatePerPeriod / 100);
        DataProtocols[N].Balance = DataProtocols[N - 1].Balance - AmortizeConstant + DataProtocols[N].Payment;
        DataProtocols[N].AnuityWithdraw = AmortizeConstant - DataProtocols[N].Payment;
    }

    for (let N = 1; N < TermLength + 1; N++) {
        let searchVal = TermLength - N + 1;
        DataProtocols[N].CotAppr = DataProtocols[Number(searchVal)].AnuityWithdraw * 100;
    }

    for (let N = 1; N < TermLength + 1; N++) {
        DataProtocols[N].TxFee = (DataProtocols[N].CotAppr * 0.025) / 100;
        DataProtocols[N].BTCYieldNFT = (DataProtocols[N].AnuityWithdraw - DataProtocols[N].TxFee) * 100;
        DataProtocols[N].ESTBTCPrice = (DataProtocols[N - 1].ESTBTCPrice * Y) + DataProtocols[N - 1].ESTBTCPrice;
        DataProtocols[N].NFTYieldUSD = (DataProtocols[N].BTCYieldNFT / 100) * DataProtocols[N].ESTBTCPrice;
        DataProtocols[N].NFTRevOptCall = (DataProtocols[N - 1].NFTRevOptCall * (DataProtocols[N].CotAppr / 100)) + DataProtocols[N - 1].NFTRevOptCall;
        DataProtocols[N].OptCallFee *= DataProtocols[N].NFTRevOptCall;
    }
}

function CalculatePropRev() {
    ProtRev[1].avgbtccotpr = (HomeOwnerCal.PriceBTC + DataProts[1].ESTBTCPrice) / 2;
    ProtRev[1].homes = (StartNumHom * AnualProtGrow) + StartNumHom;
    ProtRev[1].btcincot = (ProtRev[1].homes * HomeOwnerCal.HomeEquity) / ProtRev[1].avgbtccotpr;
    ProtRev[1].txrevbtc = (ProtRev[1].btcincot * (DataProts[0].TxFee / 100));
    ProtRev[1].txrevusd = (ProtRev[1].txrevbtc * DataProts[1].ESTBTCPrice) / 1000;
    ProtRev[1].futvaltxinbtc = ProtRev[1].txrevusd;


    for (let N = 2; N < ProtRev.length; N++) {
        ProtRev[N].avgbtccotpr = (HomeOwnerCal.PriceBTC + DataProts[N].ESTBTCPrice) / 2;
        ProtRev[N].homes = (ProtRev[N - 1].homes * AnualProtGrow) + ProtRev[N - 1].homes;
        ProtRev[N].btcincot = (ProtRev[N].homes * HomeOwnerCal.HomeEquity) / ProtRev[N].avgbtccotpr;
        ProtRev[N].txrevbtc = (ProtRev[N].btcincot * (DataProts[0].TxFee / 100));
        ProtRev[N].txrevusd = (ProtRev[N].txrevbtc * DataProts[N].ESTBTCPrice) / 1000;
        ProtRev[N].futvaltxinbtc = ((ProtRev[N - 1].txrevbtc + ProtRev[N].txrevbtc) * DataProts[N].ESTBTCPrice) / 1000;
    }
}

function CalculateNFTInvest() {
    InvestNFT[1].btcnftyield = DataProts[1].AnuityWithdraw - DataProts[1].TxFee;
    InvestNFT[1].nftrevusd = InvestNFT[1].btcnftyield * DataProts[1].ESTBTCPrice;
    InvestNFT[1].contprice = DataProts[1].NFTRevOptCall;
    InvestNFT[1].usdroci = InvestNFT[1].contprice - HomeOwnerCal.HomeEquity;
    InvestNFT[1].roioptcal = (InvestNFT[1].usdroci / HomeOwnerCal.HomeEquity) * 100;
    InvestNFT[1].irroptcal = (InvestNFT[1].usdroci / HomeOwnerCal.HomeEquity) * 100;

    for (let N = 2; N < InvestNFT.length; N++) {
        InvestNFT[N].btcnftyield = DataProts[N].AnuityWithdraw - DataProts[N].TxFee;
        InvestNFT[N].nftrevusd = InvestNFT[N].btcnftyield * DataProts[N].ESTBTCPrice;
        InvestNFT[N].contprice = DataProts[N].NFTRevOptCall;
        InvestNFT[N].usdroci = InvestNFT[N].contprice - HomeOwnerCal.HomeEquity;
        InvestNFT[N].roioptcal = (InvestNFT[N].usdroci / HomeOwnerCal.HomeEquity) * 100;
        InvestNFT[N].irroptcal = ((InvestNFT[N].usdroci / HomeOwnerCal.HomeEquity) / N) * 100;
    }
}

// Logging Functions

function printDataProts() {
    for (let N = 0; N < DataProts.length; N++) {
        console.log("YEAR: " + N + "\n");
        console.log("Payment: " + DataProts[N].Payment);
        console.log("Balance: " + DataProts[N].Balance);
        console.log("Annuity Withdrawal: " + DataProts[N].AnuityWithdraw);
        console.log("Contract Appreciation: " + DataProts[N].CotAppr);
        console.log("2.5% TxFee: " + DataProts[N].TxFee);
        console.log("BTC-NFT Yield: " + DataProts[N].BTCYieldNFT);
        console.log("EST-BTC-Price: " + DataProts[N].ESTBTCPrice);
        console.log("NFT Yield USD: " + DataProts[N].NFTYieldUSD);
        console.log("NFT Revenue on Option Call: " + DataProts[N].NFTRevOptCall);
        console.log("Option Call Fee: " + DataProts[N].OptCallFee);

        console.log("\n\n");
    }

    console.log("Rate Per Period: " + WithDraws.RatePerPeriod / 100);
    console.log("Amortize Constant: " + WithDraws.AmortizeConstant);
}

function printBTCApprection() {
    for (let N = 0; N < BTCApprections.length; N++) {
        console.log("YEAR: " + N + "\n");
        console.log("Home Equity: " + BTCApprections[N].HomeEquity);
        console.log("BTC-in-Contract: " + BTCApprections[N].BTCinContract);
        console.log("EST-BTC-Price: " + BTCApprections[N].ESTPriceBTC);
        console.log("EST-Contract Value: " + BTCApprections[N].ESTValCot);
        console.log("Contract Price: " + BTCApprections[N].CotPrice);
        console.log("EST-Profit: " + BTCApprections[N].ESTProfit);

        console.log("\n\n");
    }
}

function printPropRev() {
    for (let N = 0; N < ProtRev.length; N++) {
        console.log("YEAR: " + N + "\n");

        console.log("Homes: " + ProtRev[N].homes);
        console.log("BTC in Contract: " + ProtRev[N].btcincot);
        console.log("Tx Rev BTC: " + ProtRev[N].txrevbtc);
        console.log("Tx Rev USD: " + ProtRev[N].txrevusd);
        console.log("Future TX Rev BTC: " + ProtRev[N].futvaltxinbtc);
        console.log("Avg BTC Contract Price: " + ProtRev[N].avgbtccotpr);

        console.log("\n\n");
    }
}

function printNFTInvest() {
    for (let N = 0; N < InvestNFT.length; N++) {
        console.log("YEAR: " + N + "\n");

        console.log("BTC NFT Yield: " + InvestNFT[N].btcnftyield);
        console.log("NFT Revenue USD: " + InvestNFT[N].nftrevusd);
        console.log("Contract Price: " + InvestNFT[N].contprice);
        console.log("USD ROC: " + InvestNFT[N].usdroci);
        console.log("ROI Option Call: " + InvestNFT[N].roioptcal);
        console.log("IRR Option Call: " + InvestNFT[N].irroptcal);

        console.log("\n\n");
    }
}


// Main/Test Block

CalculateDataProtocol();

// printDataProts();

CalculateAppreciation();

// printBTCApprection();

CalculatePropRev();

// printPropRev();

CalculateNFTInvest();

// printNFTInvest();





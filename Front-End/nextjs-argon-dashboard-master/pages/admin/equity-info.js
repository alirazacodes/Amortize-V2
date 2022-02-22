import React, { useEffect, useRef } from "react";
// import { myStxAddress  } from "../../components/auth";
import { HomeOwner, WithdrawlContract, DataForProtocol, BTCAppreciate } from "../../math";

import { CalculateDataProtocol, CalculateAppreciation } from "../../math";

import { useState } from "react";

import { saveEquityInfo } from "../../components/equity-info";

import { fetchEquityInfo } from "../../components/equity-info";

// import { userSession } from "../../components/auth";
// import { userSession } from "../pages/_app";

import { userSession } from "../_app";

import { v4 as uuid } from "uuid";

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
    Table,
    Row,
    Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import Slide from "components/Sliders/Slide.js"


function EquityInfo() {

    const [isFetching, setFetching] = useState(false);

    const [state, setState] = useState({
        ValueOfHome: "",
        CurrentMorgageBalance: ""
    });

    const [SliderState, SliderSetState] = useState(5);

    const handleChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setState({
            ...state,
            [name]: value
        })
    };

    // useEffect(() => {
    if (!isFetching) {
        fetchEquityInfo(userSession).then((equityinfo) => {
            setState({
                ValueOfHome: equityinfo.ValueOfHome,
                CurrentMorgageBalance: equityinfo.CurrentMorgageBalance
            });

            SliderSetState(equityinfo.TermLength);

        });
        setFetching(true);
        console.log("Tried Fetching");
    }
    // }, []);


    let HomeOwnerCal = new Array(1);
    HomeOwnerCal[0] = new HomeOwner(50000, state.ValueOfHome, SliderState, state.CurrentMorgageBalance);

    let Withdrawal = new Array(1);
    Withdrawal[0] = new WithdrawlContract(1, HomeOwnerCal[0].BtcToCot, SliderState);

    let DataProts = new Array(HomeOwnerCal[0].TermLength + 1);

    for (let N = 0; N < HomeOwnerCal[0].TermLength + 1; N++) {
        DataProts[N] = new DataForProtocol(HomeOwnerCal[0].BtcToCot, HomeOwnerCal[0].HomeEquity, HomeOwnerCal[0].PriceBTC);
    }

    if (DataProts.length > 1) {
        CalculateDataProtocol(DataProts, Withdrawal[0].RatePerPeriod, Withdrawal[0].AmortizeConstant, SliderState);
    }

    let BtcApp = new Array(HomeOwnerCal[0].TermLength + 1);

    for (let N = 0; N < HomeOwnerCal[0].TermLength + 1; N++) {
        BtcApp[N] = new BTCAppreciate(HomeOwnerCal[0].ValueOfHome, HomeOwnerCal[0].CurrMorBalance, DataProts[0].Balance, HomeOwnerCal[0].PriceBTC);
    }

    if (BtcApp.length > 1) {
        CalculateAppreciation(BtcApp, HomeOwnerCal[0], DataProts);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const EquityInfo = {
            ValueOfHome: state.ValueOfHome,
            CurrentMorgageBalance: state.CurrentMorgageBalance,
            TermLength: SliderState,
            id: uuid(),
        };

        if (userSession.isUserSignedIn()) {
            saveEquityInfo(EquityInfo).then((result) => {
                console.log(result);
            });
        }
        else {
            console.log('User is not Signed in!');
        }
    };

    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-black border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Equity Information</h3>
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
                                        Equity Information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-valhome"
                                                    >
                                                        Value of Home
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        name="ValueOfHome"
                                                        placeholder="$ 230000"
                                                        type="number"
                                                        defaultValue={state.ValueOfHome}
                                                        onChange={handleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="5">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-termlen"
                                                    >
                                                        Term Length
                                                    </label>
                                                    {/* <Input
                                                        className="form-control-alternative"
                                                        name="TermLength"
                                                        placeholder="5, 7, 10"
                                                        type="number"
                                                        value={state.TermLength}
                                                        onChange={handleChange}
                                                    /> */}
                                                    <Slide set={SliderSetState} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-currMortBal"
                                                    >
                                                        Current Mortgage Balance
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        name="CurrentMorgageBalance"
                                                        placeholder="$ 400000"
                                                        type="number"
                                                        defaultValue={state.CurrentMorgageBalance}
                                                        onChange={handleChange}
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
                                        <h3 className="mb-0">Home Owner Calculator</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Price BTC</th>
                                        <th scope="col">Value Of Home</th>
                                        <th scope="col">Term Length</th>
                                        <th scope="col">Current Mortgage Balance</th>
                                        <th scope="col">Home Equity</th>
                                        <th scope="col">BTC To Contract</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HomeOwnerCal.map(HomeOwn =>
                                        <tr>
                                            <th scope="row">{HomeOwn.PriceBTC}</th>
                                            <td>{HomeOwn.ValueOfHome}</td>
                                            <td>{HomeOwn.TermLength}</td>
                                            <td>{HomeOwn.CurrMorBalance}</td>
                                            <td>{HomeOwn.HomeEquity}</td>
                                            <td>{HomeOwn.BtcToCot}</td>

                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Withdrawal Calculator</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">BTC Amount</th>
                                        <th scope="col">Amortize Rate</th>
                                        <th scope="col">Payment Frequency</th>
                                        <th scope="col">Rate Per Period</th>
                                        <th scope="col">Amortize Constant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Withdrawal.map(Withdraw =>

                                        <tr>
                                            <th scope="row">{Withdraw.BTCAmount}</th>
                                            <td>{Withdraw.AmortizeRate}%</td>
                                            <td>{Withdraw.PaymentFrequency}</td>
                                            <td>{Withdraw.RatePerPeriod}%</td>
                                            <td>{Withdraw.AmortizeConstant}</td>

                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>

                {/* Data Protocols */}
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Data Protocols</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>

                                        <th scope="col">Year</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Anuity Withdrawal</th>
                                        <th scope="col">Tx-Fee</th>
                                        <th scope="col">BTCYieldNFT</th>
                                        <th scope="col">NFTYieldUSD</th>
                                        <th scope="col">CotAppr</th>
                                        <th scope="col">NFTRevOptCall</th>
                                        <th scope="col">OptCallFee</th>
                                        <th scope="col">ESTBTCPrice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DataProts.map((DataProt, index) =>

                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{DataProt.Payment}</td>
                                            <td>{DataProt.Balance}</td>
                                            <td>{DataProt.AnuityWithdraw}</td>
                                            <td>{DataProt.TxFee}</td>
                                            <td>{DataProt.BTCYieldNFT}</td>

                                            <td>{DataProt.NFTYieldUSD}</td>
                                            <td>{DataProt.CotAppr}</td>
                                            <td>{DataProt.NFTRevOptCall}</td>
                                            <td>{DataProt.OptCallFee}</td>
                                            <td>{DataProt.ESTBTCPrice}</td>

                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>

                {/* BTC Appreciation */}
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">BTC Appreciation</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>

                                        <th scope="col">Year</th>
                                        <th scope="col">HomeEquity</th>
                                        <th scope="col">BTCinContract</th>
                                        <th scope="col">ESTPriceBTC</th>
                                        <th scope="col">ESTValCot</th>
                                        <th scope="col">CotPrice</th>
                                        <th scope="col">ESTProfit</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {BtcApp.map((BtcApp, index) =>

                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{BtcApp.HomeEquity}</td>
                                            <td>{BtcApp.BTCinContract}</td>
                                            <td>{BtcApp.ESTPriceBTC}</td>
                                            <td>{BtcApp.ESTValCot}</td>
                                            <td>{BtcApp.CotPrice}</td>

                                            <td>{BtcApp.ESTProfit}</td>

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

EquityInfo.layout = Admin;

export default EquityInfo;

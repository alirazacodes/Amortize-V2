import React, { useEffect, useState } from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

// import getBTC from "../crypto-api";

import pTrans from "../public-transactions";

import { getBTC, getSTX } from "../crypto-api";

import { equityMonthWise } from "../public-transactions";

function getdiff(dataset) {
  const d = new Date();
  let month = d.getMonth();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let currMonthVal = dataset[months[month]];
  let previousMonth = month;
  if (month == 0) {
    previousMonth = 11;
  }
  else {
    previousMonth = month - 1;
  }
  let previousMonthVal = dataset[months[previousMonth]];
  if (previousMonthVal > 0) {
    return ((currMonthVal - previousMonthVal) / previousMonthVal) * 100;
  }
  else {
    return currMonthVal * 100;
  }

}

function Header() {

  const [BTC, setBTC] = useState(0);

  const [STX, setSTX] = useState(0);

  const [BTCchange, setBTCchange] = useState(0);

  const [STXchange, setSTXchange] = useState(0);

  const dataset = equityMonthWise();

  const difference = getdiff(dataset);

  const [equityPerMonth, setEquityPerMonth] = useState({
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await CoinGeckoClient.simple.price({
  //         ids: "bitcoin",
  //         vs_currencies: "usd"
  //       });
  //       // console.log(data.data.bitcoin.usd);
  //       setBTC(data.data.bitcoin.usd);
  //     }
  //     catch (error) { console.log(error); }
  //   }
  //   (async () => await fetchData())();
  // }, []);
  const [temp, setTemp] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1)
    }, 5000)
  }, [])

  useEffect(() => {
    getBTC().then((value) => {
      setBTC(value[0]);
      setBTCchange(value[1]);
      // console.log("fetched");
    });
    getSTX().then((value) => {
      setSTX(value[0]);
      setSTXchange(value[1]);
      // console.log("stxed");
    });
  }, [temp]);

  // useEffect(() => {
  //   getBTC().then((value) => {
  //     setBTC(value);
  //   })

  //   getSTX().then((value) => {
  //     setSTX(value);
  //   })
  // }, []);

  const data = pTrans();


  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          BTC
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          $ {BTC}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={BTCchange > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                        <i className={BTCchange > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"} /> {BTCchange} %
                      </span>{" "}
                      <span className="text-nowrap">Since last 24hr</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          STX
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">$ {STX}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={STXchange > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                        <i className={STXchange > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"} /> {STXchange} %
                      </span>{" "}
                      <span className="text-nowrap">Since last 24hr</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Equity Price
                        </CardTitle>
                        {
                          data.map((element, index, array) => {
                            if (index == 0) {
                              return <span className="h2 font-weight-bold mb-0">{array[index].btcLock} BTC</span>
                            }
                          }
                          )
                        }

                        <br></br>
                        {
                          data.map((element, index, array) => {
                            if (index == 0) {
                              return <span className="h4 font-weight-bold mb-0">{((array[index].btcLock * BTC) / STX).toFixed(3)} STX</span>
                            }
                          }
                          )
                        }
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm"> */}
                      {
                        data.map((element, index, array) => {
                          if (index == 0 && array.length > 1) {
                            return <p className="mt-3 mb-0 text-muted text-sm">
                              <span className={(data[0].btcLock - data[1].btcLock) > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                                <i className={(data[0].btcLock - data[1].btcLock) > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"} /> {(((data[0].btcLock - data[1].btcLock) / data[1].btcLock) * 100).toFixed(3)} % <br></br>
                              </span>
                              <span className="text-nowrap">Since last Equity Mint</span>
                            </p>
                          }
                          else if(index == 0){
                            return <p className="mt-3 mb-0 text-muted text-sm">
                              <span className={(data[0].btcLock) > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                                <i className={(data[0].btcLock) > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"} /> {100} % <br></br>
                              </span>
                              <span className="text-nowrap">Since last Equity Mint</span>
                            </p>
                          }
                        }
                        )
                      }
                      {/* <span className={(data[0].btcLock - data[1].btcLock) > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                        <i className={(data[0].btcLock - data[1].btcLock) > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"} /> {(((data[0].btcLock - data[1].btcLock) / data[1].btcLock) * 100)} %
                      </span>{" "} */}
                      {/* <span className="text-nowrap">Since last Equity Mint</span>
                    </p> */}
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Equities
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.length} Equities minted</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={difference > 0 ? "text-success mr-2" : "text-danger mr-2"}>
                        <i className={difference > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"} /> {difference} %
                      </span>{" "}
                      <span className="text-nowrap">Since last mint Call</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;

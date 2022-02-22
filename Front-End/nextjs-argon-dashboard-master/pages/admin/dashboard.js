import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import pTrans from "../../components/public-transactions";

import { equityMonthWise } from "../../components/public-transactions";

import { performanceMonthWise } from "../../components/public-transactions";

// import getPrices from "../../components/crypto-api";

// import { getBTC, getSTX } from "../../components/crypto-api";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import getNFTS from "../../components/get-nfts";
import { myStxAddress } from "../../components/auth";
import { checkOwner } from "../../components/public-transactions";

var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


  // console.log(equityMonthWise2);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const data = pTrans();
  
  const dataset = equityMonthWise();
  const priceDataSet = performanceMonthWise();
  // Example 2 of Chart inside src/views/Index.js (Total orders - Card)
  let chartExample2 = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                //if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
                // }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sales",
          data: [dataset.January,
          dataset.February,
          dataset.March,
          dataset.April,
          dataset.May,
          dataset.June,
          dataset.July,
          dataset.August,
          dataset.September,
          dataset.October,
          dataset.November,
          dataset.December],
          maxBarThickness: 2,
        },
      ],
    },
  };

  let chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900],
            },
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return "$" + value + "k";
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";

            if (data.datasets.length > 1) {
              content += label;
            }

            content += "$" + yLabel + "k";
            return content;
          },
        },
      },
    },
    data1: (canvas) => {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Performance",
            data: [priceDataSet.January,
              priceDataSet.February,
              priceDataSet.March,
              priceDataSet.April,
              priceDataSet.May,
              priceDataSet.June,
              priceDataSet.July,
              priceDataSet.August,
              priceDataSet.September,
              priceDataSet.October,
              priceDataSet.November,
              priceDataSet.December],
          },
        ],
      };
    },
  };

  // getPrices();
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  {/* <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-mutaed ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total Contracts Locked</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
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
                    <th scope="col">Principal</th>
                    <th scope="col">Price</th>
                    <th scope="col">BTC Locked</th>
                    <th scope="col">BTC APPR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(dataProps =>
                    <tr>
                      <th scope="row">{dataProps.owner}</th>
                      <td>{dataProps.price}</td>
                      <td>{dataProps.btcLock}</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{dataProps.btcAppr}
                      </td>

                    </tr>
                  )}
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
};

Dashboard.layout = Admin;

export default Dashboard;

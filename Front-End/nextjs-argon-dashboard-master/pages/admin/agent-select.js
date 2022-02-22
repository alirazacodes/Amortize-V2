import React from "react";
import { myStxAddress } from "../../components/auth";

import { useState } from "react";

import pTrans from "../../components/public-transactions";

import Header from "../../components/Headers/Header";

import { fetchAgentInfo } from "../../components/agent-reg";

import { userSession } from "../_app";

import { fetchHomeInfo } from "../../components/home-reg";

// import { Dropdown } from "react-bootstrap";

// import { Dropdown, Selection } from 'react-dropdown-now';
// import 'react-dropdown-now/style.css';

// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

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
import { LockEquity } from "../../components/contractCalls";
// import { stat } from "fs";

function Agent() {


    const data = pTrans();

    const [state, setState] = useState([]);

    const [state2, setState2] = useState([]);

    const [isFetching, setFetching] = useState(false);

    const [selectedAgent, setSelectedAget] = useState({
        AgentName: "",
        AgentSTXAddress: ""
    });

    const [selectedHome, setSelectedHome] = useState({
        Address: "",
        Phone: "",
        Zipcode: "",
        City: "",
        Estate: "",
    });

    if (!isFetching) {
        fetchAgentInfo(userSession).then((agentinfo) => {
            // setState({
            //     STXAddress: agentinfo[0].STXAddress,
            //     Phone: agentinfo[0].Phone,
            //     FirstName: agentinfo[0].FirstName,
            //     LastName: agentinfo[0].LastName,
            //     Estate: agentinfo[0].Estate
            // });
            // data = agentinfo;
            // console.log(data);
            setState(agentinfo);

            //console.log(agentinfo);
        });
        fetchHomeInfo(userSession).then((homeinfo) => {
            setState2(homeinfo);
            setFetching(true);
        })


        // console.log("Tried Fetching");
    }

    // let submitted = false;

    const handleChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value.split(",");
        // console.log(name);
        // console.log(evt.target.value.split(","));
        setSelectedAget({
            AgentName: value[1] + " " + value[2],
            AgentSTXAddress: value[0]
        })
        // setState({
        //     ...state,
        //     [name]: value
        // })
    }

    const handleChangeHouse = evt => {
        const name = evt.target.name;
        const value = evt.target.value.split(",");
        // console.log(name);
        // console.log(evt.target.value.split(","));
        setSelectedHome({
            Address: value[1],
            Phone: value[2],
            Zipcode: value[3],
            City: value[4],
            Estate: value[5],
        })
        // setState({
        //     ...state,
        //     [name]: value
        // })
    }

    const handleSubmit = (e) => {
        // submitted = true;
        e.preventDefault()
        //console.log(state);
        let beneficiary = "ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6";
        // LockEquity(selectedAgent.AgentName, selectedAgent.AgentSTXAddress);
        console.log(selectedHome.houseAddress);
    };

    const agents = ["Ali", "Ummar", "James"];

    // const props = [state.PropID];

    // const dropdown = {
    //     color: 'white',
    //     FontFace: 
    // };

    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>

                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Selecting Agent</h3>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Selecting Agent before minting
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="9">
                                                <FormGroup>


                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Agent Name
                                                    </label>
                                                    <Row>
                                                        {/* <Col lg="12">
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Enter name of agent whom to transfer the rights of the property"
                                                                type="text"
                                                                name="Username"
                                                                onChange={handleChange}
                                                            />
                                                        </Col> */}
                                                        <Col lg="12">
                                                            <select style={{ width: "100%", }} name="AgentName" onChange={handleChange}>
                                                                <option value="" disabled selected>Select name of agent whom to transfer the rights of the property</option>
                                                                {/* <option value="volvo">Volvo</option>
                                                                <option value="saab">Saab</option>
                                                                <option value="opel">Opel</option> */}
                                                                {state.map(agent =>
                                                                    <option value={[agent.STXAddress, agent.FirstName, agent.LastName]}>{agent.FirstName + " " + agent.LastName + ", estate: " + agent.Estate}</option>
                                                                )}


                                                            </select>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="9">
                                                <FormGroup>


                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        House Address
                                                    </label>
                                                    <Row>
                                                        {/* <Col lg="12">
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Enter name of agent whom to transfer the rights of the property"
                                                                type="text"
                                                                name="Username"
                                                                onChange={handleChange}
                                                            />
                                                        </Col> */}
                                                        <Col lg="12">
                                                            <select style={{ width: "100%", }} name="HouseAddress" onChange={handleChangeHouse}>
                                                                <option value="" disabled selected>Select address of your house to be minted.</option>
                                                                {/* <option value="volvo">Volvo</option>
                                                                <option value="saab">Saab</option>
                                                                <option value="opel">Opel</option> */}
                                                                {state2.map(house =>
                                                                    <option value={house.Address}>{house.Address}</option>
                                                                )}


                                                            </select>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            {/* <Col lg="8">
                                                <select name="cars" id="input" className="form-control-alternative">
                                                    <option value="volvo">Volvo</option>
                                                    <option value="saab">Saab</option>
                                                    <option value="opel">Opel</option>
                                                    <option value="audi">Audi</option>
                                                </select>
                                            </Col> */}
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        ID of Property/Equity
                                                    </label>

                                                    <Col lg="13">
                                                        <select style={{ width: "100%", }} name="PropID" onChange={handleChange}>
                                                            {/* <option value="" disabled selected>PROP-12345</option> */}
                                                            {/* {props.map(props => */}
                                                            <option value={data.length + 1}>{data.length + 1}</option>
                                                            {/* )} */}
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-right" xs="10">
                                                <Button
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={handleSubmit}
                                                    size="sm"
                                                >
                                                    MINT!
                                                </Button>
                                            </Col>
                                        </Row>

                                    </div>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

Agent.layout = Admin;

export default Agent;

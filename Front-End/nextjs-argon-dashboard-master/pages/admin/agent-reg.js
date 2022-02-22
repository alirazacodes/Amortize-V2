import React, { useEffect } from "react";
// import { myStxAddress  } from "../../components/auth";
import { useState } from "react";

import { saveAgentInfo } from "../../components/agent-reg";

import { fetchAgentInfo } from "../../components/agent-reg";

import { removeAgentInfo } from "../../components/agent-reg";

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

// let data = [];

function AgentReg() {

    const [isFetching, setFetching] = useState(false);

    const [data, setData] = useState([]);

    const [state, setState] = useState({
        STXAddress: "",
        Phone: "",
        FirstName: "",
        LastName: "",
        Estate: ""
    });

    // let data = [];

    // useEffect(() => {
    if (!isFetching) {
        fetchAgentInfo(userSession).then((agentinfo) => {
            setData(agentinfo);
        });
        setFetching(true);
        console.log("Tried Fetching");
    }
    // }, []);

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(state);

        const AgentInfo = {
            STXAddress: state.STXAddress,
            Phone: state.Phone,
            FirstName: state.FirstName,
            LastName: state.LastName,
            Estate: state.Estate,
            id: uuid(),
        };

        if (userSession.isUserSignedIn()) {
            saveAgentInfo(AgentInfo, data).then((result) => {
                console.log(result);
                setFetching(false);
            });
        }
        else {
            console.log('User is not Signed in!');
        }
    }

    const removeAgent = (AgentAddress) => {
        // AgentAddress.preventDefault();
        // const AgentAddress = e.name;
        console.log(AgentAddress);
        if (userSession.isUserSignedIn()) {
            removeAgentInfo(AgentAddress, data).then((result) => {
                console.log("agent deleted");
                setFetching(false);
            });
        }
        else {
            console.log('User is not Signed in!');
        }
    }

    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>

                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-black border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Agent Registration</h3>
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
                                        Agent Information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        STX Address
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-address"
                                                        placeholder="STCSWE.....WRS2"
                                                        type="text"
                                                        name="STXAddress"
                                                        onChange={handleChange}
                                                        defaultValue={state.Address}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-phoneno"
                                                    >
                                                        Phone no.
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-phoneno"
                                                        placeholder="+2135454544"
                                                        type="text"
                                                        name="Phone"
                                                        onChange={handleChange}
                                                        defaultValue={state.Phone}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-zipcode"
                                                    >
                                                        First Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-firstName"
                                                        placeholder="John"
                                                        type="text"
                                                        name="FirstName"
                                                        onChange={handleChange}
                                                        defaultValue={state.Zipcode}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        Last Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lastName"
                                                        placeholder="Cina"
                                                        type="text"
                                                        name="LastName"
                                                        onChange={handleChange}
                                                        defaultValue={state.City}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-estate"
                                                    >
                                                        Estate
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-estate"
                                                        placeholder="Albama"
                                                        type="text"
                                                        name="Estate"
                                                        onChange={handleChange}
                                                        defaultValue={state.Estate}
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
                                        <h3 className="mb-0">Agents Registered</h3>
                                    </div>

                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">STX Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Estate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(dataProps =>
                                        <tr>
                                            <th scope="row">{dataProps.STXAddress}</th>
                                            <td>{dataProps.Phone}</td>
                                            <td>{dataProps.FirstName + " " + dataProps.LastName}</td>
                                            <td>{dataProps.Estate}</td>
                                            <Button onClick={() => removeAgent(dataProps.STXAddress)}>Remove Agent</Button>

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

AgentReg.layout = Admin;

export default AgentReg;


// Address, phone no, zip code, city, estate,

// math: TermLen, ValOfHom, curMortBalance
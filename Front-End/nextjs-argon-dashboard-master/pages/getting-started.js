import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function getStarted() {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">Hello to the future assets transformation</h1>
                            <p className="text-white mt-0 mb-5">
                                Please proceed step by step, from logging in through your wallet, to profile registration, registering home,
                                registering equity, transfering ownership to one of our agents and getting locked BTC.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default getStarted;
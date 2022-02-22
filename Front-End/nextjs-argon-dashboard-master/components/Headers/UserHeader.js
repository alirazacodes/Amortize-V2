import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function UserHeader() {
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
              <h1 className="display-2 text-white">Hello to the transformation of your future assets</h1>
              <p className="text-white mt-0 mb-5">
                
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;

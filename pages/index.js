import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Button,
  Container,
  Row,
  Toast,
  ListGroup,
  Form,
  Col,
  Alert,
  Accordion,
  Card
} from "react-bootstrap";
import axios from "axios";
import { requestProvider } from "webln";
import SHA256 from "bcrypto/lib/sha256-browser";
import lightningPayReq from "bolt11";

import EmailForm from "../components/email";
import InfoCard from "../components/InfoCard";
import { getEncoding } from "../utilities";

const Home = () => {
  const [invoice, setInvoice] = useState({});
  const [preimage, setPreimage] = useState("");
  const [preimageIsValid, setPreimageValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  let webLn;

  useEffect(() => {
    (async function() {
      webLn = await requestProvider();
      if (webLn) {
        const info = await webLn.getInfo();
        console.log("Connected with webln node:", info.node.pubkey);
      }
    })();
  });

  function clearState() {
    setSuccess(true);
    setInvoice({});
    setPreimage("");
    setPreimageValid(false);
    setTimeout(() => setSuccess(false), 3000);
  }

  async function onClick() {
    const { data } = await axios.get("/api/invoice");
    setInvoice(data);
  }

  async function payInvoice() {
    const { preimage } = await webLn.sendPayment(invoice.request);
    setPreimage(preimage);
  }

  function onPreimageChange(e) {
    setPreimageValid(false);
    setValidated(false);
    setPreimage(e.target.value);
  }

  function validatePreimage(e) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    const value = form["formPreimage"].value;
    if (!value || value.length === 0) {
      form["formPreimage"].setCustomValidity("Preimage required");
      setValidated(true);
      return;
    }

    try {
      const encoding = getEncoding(value);

      const decoded = lightningPayReq.decode(invoice.request);
      let paymentHash;
      for (const tag of decoded.tags) {
        if (tag.tagName === "payment_hash") {
          paymentHash = tag.data;
          break;
        }
      }
      const hash = SHA256.digest(Buffer.from(value, encoding)).toString("hex");
      if (hash === paymentHash) {
        form["formPreimage"].setCustomValidity("");
        setPreimageValid(true);
      } else {
        form["formPreimage"].setCustomValidity("Invalid hash");
        setPreimageValid(false);
      }
    } catch (e) {
      form["formPreimage"].setCustomValidity(e.message);
      console.error(e.message);
      setPreimageValid(false);
    }
    setValidated(true);
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
      <Container>
        <div className="hero">
          <h1 className="title">Welcome to my Sats4Chats!</h1>
          {preimageIsValid && !!preimage.length && (
            <Row className="justify-content-center my-4">
              <Col md="9">
                <EmailForm
                  {...invoice}
                  preimage={preimage}
                  onSuccess={clearState}
                />
              </Col>
            </Row>
          )}
          {!!Object.keys(invoice).length && (
            <React.Fragment>
              <Row className="justify-content-center my-4">
                <Col md="9">
                  <Form
                    onSubmit={validatePreimage}
                    noValidate
                    validated={validated}
                  >
                    <Form.Group controlId="formPreimage">
                      <Form.Control
                        value={preimage}
                        onChange={onPreimageChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Hash of preimage does not match payment id
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Check Preimage
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="9">
                  <Toast style={{ maxWidth: "100%" }}>
                    <Toast.Header closeButton={false}>
                      <strong className="mr-auto">Invoice</strong>
                    </Toast.Header>
                    <Toast.Body style={{ overflowWrap: "break-word" }}>
                      <ListGroup>
                        <ListGroup.Item>ID: {invoice.id}</ListGroup.Item>
                        <ListGroup.Item>
                          <p>
                            Invoice:{" "}
                            <a href="#" onClick={payInvoice}>
                              {invoice.request}
                            </a>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Amount: {invoice.amount} satoshis
                        </ListGroup.Item>
                      </ListGroup>
                    </Toast.Body>
                  </Toast>
                </Col>
                <Col md="9" className="my-4">
                  <InfoCard />
                </Col>
              </Row>
            </React.Fragment>
          )}
          {success && (
            <Alert variant="success">
              <Alert.Heading>Great Success!</Alert.Heading>
              Thanks so much for reaching out.
            </Alert>
          )}
          {(!invoice || Object.keys(invoice).length === 0) && (
            <React.Fragment>
              <p className="description">Click below to send me an email.</p>
              <Container>
                <Row className="justify-content-center">
                  <Button onClick={onClick}>Get Started</Button>
                </Row>
              </Container>
            </React.Fragment>
          )}
        </div>
      </Container>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Home;

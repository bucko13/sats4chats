import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {Button, Container, Row, Toast, ListGroup, Form, Col } from 'react-bootstrap';
import axios from 'axios'
import { requestProvider } from 'webln'
import SHA256 from 'bcrypto/lib/sha256-browser'
import lightningPayReq from 'bolt11'

import EmailForm from '../components/email'
import { getEncoding } from '../utilities'

const Home = () => {
  const [invoice, setInvoice] = useState({})
  const [preimage, setPreimage] = useState('')
  const [preimageIsValid, setPreimageValid] = useState(false)
  let webLn

  useEffect(() => {
    (async function() {
      webLn = await requestProvider()
      if (webLn) {
        const info = await webLn.getInfo()
        console.log('Connected with webln node:', info.node.pubkey)
      }
    })()
  })

  async function onClick() {
    const { data } = await axios.get('/api/invoice')
    setInvoice(data)
  }

  async function payInvoice() {
    const { preimage } = await webLn.sendPayment(invoice.request)
    setPreimage(preimage)
  }

  function validatePreimage(e) {
    const { value } = e.target
    if (!value || value.length === 0) return
    setPreimage(value)
    try {
      const encoding = getEncoding(value)

      const decoded = lightningPayReq.decode(invoice.request)
      let paymentHash
      for (const tag of decoded.tags) {
        if (tag.tagName === 'payment_hash') {
          paymentHash = tag.data
          break
        }
      }
      const hash = SHA256.digest(Buffer.from(value, encoding)).toString('hex')
      if (hash === paymentHash)
        setPreimageValid(true)
      else 
        setPreimageValid(false)
    } catch (e) {
      console.error(e.message)
      setPreimageValid(false)
    }
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

        <div className="hero">
          <h1 className="title">Welcome to my Sats4Chats!</h1>
          {preimageIsValid && (
            <Row className="justify-content-center my-4">
              <Col md="7">
                <EmailForm {...invoice} />
              </Col>
            </Row>
          )}
          {Object.keys(invoice).length ? (
            <React.Fragment>
              <Row className="justify-content-center my-4">
                <Col md="7">
                  <Form>
                    <Form.Control value={preimage} onChange={validatePreimage} isValid={preimageIsValid} isInvalid={!preimageIsValid}/>
                    <Form.Control.Feedback type="invalid">
                      Hash of preimage does not match payment id
                    </Form.Control.Feedback>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="7">
                  <Toast style={{ maxWidth: "100%" }}>
                    <Toast.Header closeButton={false}>
                      <strong className="mr-auto">Invoice</strong>
                    </Toast.Header>
                    <Toast.Body style={{ overflowWrap: 'break-word'}}>
                      <ListGroup>
                        <ListGroup.Item>ID: {invoice.id}</ListGroup.Item>
                        <ListGroup.Item><p>Invoice: <a href="#" onClick={payInvoice}>{invoice.request}</a></p></ListGroup.Item>
                        <ListGroup.Item>Amount: {invoice.amount} satoshis</ListGroup.Item>
                      </ListGroup>
                    </Toast.Body>
                  </Toast>
                </Col>
              </Row>
            </React.Fragment>
            ) : (
            <React.Fragment>
              <p className="description">
                Click below to send me an email.
              </p>
              <Container>
                <Row className="justify-content-center">
                  <Button onClick={onClick}>Get Started</Button>
                </Row>
              </Container>
            </React.Fragment>
          )}
        </div>

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
)}

export default Home

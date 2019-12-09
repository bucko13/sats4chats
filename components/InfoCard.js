import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
const InfoCard = () => (
  <Accordion>
    <Card>
      <Card.Header>
        <Accordion.Toggle eventKey="1" variant="link" as={Button}>
          How this works
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          <p>
            This version of Sats4Chats is running on testnet lightning network.
            If you have{" "}
            <a href="https://lightningjoule.com/">Lightning Joule</a> installed,
            you can click the link and automatically open the payment in your
            wallet and the preimage will automatically be pre-populated.
          </p>
          <p>
            If you don't have a lightning wallet, don't worry! You can still
            test out Sats4Chats, by getting a hosted web wallet (only safe on
            testnet! Do not look for mainnet alternatives) at{" "}
            <a href="https://htlc.me" target="_blank">
              htlc.me
            </a>
            . After payment, click on the success message to get more
            information and you'll see the preimage. Copy that and paste in the
            field above.
          </p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);
export default InfoCard;

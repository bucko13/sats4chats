import React, { useState } from 'react'
import { Form, Button, InputGroup, Spinner, Col, Row } from 'react-bootstrap'
import axios from 'axios'

const EmailForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false)

  async function sendEmail(form) {
    const body = {
      text: form['formText'].value,
      subject: form['formSubject'].value,
      invoice: props.request,
      preimage: props.preimage,
      name:form['formReplyToName'].value,
      email: form['formReplyToEmail'].value
    }
    
    try {
    setLoading(true)
    await axios.post('/api/send', body)
    setLoading(false)
    props.onSuccess(true)
    } catch (e) {
      console.error('Problem sending email:', e)
      setLoading(false)
    }
  }

  const handleSubmit = async event => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setValidated(true)

    if (form.checkValidity())
      sendEmail(form)
  }


  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <Row 
          style={{ 
            width: '100%', 
            position: 'absolute',     
            height: '100%', 
            backgroundColor: 'rgb(180,180,180,0.4)',
            zIndex: '100',
            marginLeft: 'auto'
          }} 
          className="justify-content-center"
         >
          <Col sm="3" className="align-self-center">
            <Spinner animation="border" role="status" size="lg" >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ padding: '1rem'}}>
        <Form.Group controlId="formReplyToEmail">
          <Form.Label>Reply to:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required/>
            <Form.Control.Feedback type="invalid">
              Valid email required
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formReplyToName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="To whom am I speaking?" required/>
            <Form.Control.Feedback type="invalid">
              No name?
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">[{props.amount} Sats4Chats]:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="What's this all about?" required/>
              <Form.Control.Feedback type="invalid">
                Must include a subject
              </Form.Control.Feedback>
          </InputGroup>
          
        </Form.Group>

        <Form.Group controlId="formText">
          <Form.Label>Message:</Form.Label>
          <Form.Control as="textarea" rows="7" placeholder="Now you've sent some sats... let's chat!" required />
          <Form.Control.Feedback type="invalid">
            Why pay the sats if you're not going to chat? 
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default EmailForm
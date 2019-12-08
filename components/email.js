import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const EmailForm = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    console.log(form)
    if (form.checkValidity() === false) {
      setValidated(false)
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onChange={handleSubmit}>
      <Form.Group controlId="formReplyToEmail">
        <Form.Label>Reply to:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required/>
          <Form.Control.Feedback type="invalid">
            Valid email required
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

      <Form.Group controlId="exampleForm.ControlTextarea1">
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
  )
}

export default EmailForm
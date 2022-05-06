import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// TODO - add alerts for submission success or failure
const AddCustomer = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();

  useEffect(() => {
    document.title = 'Add Customer';
  });

  /**
   * Handle a new customer submission
   *
   * @param {*} e - submission event
   */
  const submitCustomer = async (e) => {
    e.preventDefault()
    const form = e.target.elements;
    const customer = {
      email: form.email.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      vehicleType: form.vehicleType.value,
      vehicleName: form.vehicleName.value,
      vehicleLength: form.vehicleLength.value,
      sourceFile: 'Manual Input'
    };

    const response = await fetch('/newCustomer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    });
    const json = await response.json();
    const status = json.status;

    setShowAlert(true);
    setAlertStatus(status);
  }

  /**
   * Render the alert corresponding to the status of your customer submission
   *
   * @param {boolean} success - whether or not this is a success or failure alert
   * @returns the alert corresponding to the submission status
   */
  const renderAlert = (success) => {
    if (success) {
      return (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Customer submission successful</Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Uh oh, something went wrong - please try again</Alert.Heading>
        </Alert>
      );
    }
  }

  return (
    <div>
      <h4>Manually enter customer details (all fields required)</h4>
      <hr/>
      {showAlert && renderAlert(alertStatus)}
      <Form onSubmit={submitCustomer}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control placeholder="Something like outdoor@sy.com" type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control placeholder="Perhaps Marianne? Taylor? Something like that" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control placeholder="Maybe Smith or Macron?" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vehicleType">
          <Form.Label>Vehicle type</Form.Label>
          <Form.Control placeholder="Boat, starship, go-kart, etc" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vehicleName">
          <Form.Label>Vehicle name</Form.Label>
          <Form.Control placeholder="Samwise, The Salty Dog, The Enterprise?" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vehicleLength">
          <Form.Label>Vehicle length (in feet)</Form.Label>
          <Form.Control placeholder="9001" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddCustomer;
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

const Navigation = () => {
  const active = useLocation();

  return (
    <Navbar className="green-nav" variant="dark">
      <Container>
        <Navbar.Brand href="/">
        Outdoor.sy
        </Navbar.Brand>
        <Nav className="flex-row" activeKey={active.pathname} >
          <Nav.Link href="/">Customers</Nav.Link>
          <Nav.Link href="/upload">File Upload</Nav.Link>
          <Nav.Link href="/addCustomer">Add Customer</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Navigation;
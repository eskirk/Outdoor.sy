import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navigation />
      <Container>
        <main className="main-content">
          {children}
        </main>
      </Container>
    </React.Fragment>
  );
};
export default Layout;
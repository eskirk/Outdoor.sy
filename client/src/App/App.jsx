import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from '../components/Layout';
import { Uploader } from '../components/Uploader';
import { Customers } from '../components/Customers';
import { CustomerDetail } from '../components/Detail';
import { AddCustomer } from '../components/AddCustomer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Customers/>}/>
          <Route path='/upload' element={<Uploader/>}/>
          <Route path='/addCustomer' element={<AddCustomer/>}/>
          <Route path='/customer/:customer' element={<CustomerDetail />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
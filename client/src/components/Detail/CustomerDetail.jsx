import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const CustomerDetail = () => {
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const { customer } = useParams();

  useEffect(() => {
    document.title = customer;

    /**
     * Fetch the data corresponding to the customer with the provided email address
     *
     * @param {string} customer - the customer email (primary key)
     */
    const fetchData = async (customer) => {
      const response = await fetch('/customer?' + new URLSearchParams({
          email: customer
        }), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        setDataLoaded(true);
      } else {
        setData(false);
      }
    }

    fetchData(customer);
  }, [dataLoaded, customer]);

  return (
    <div>
      {dataLoaded ?
        <div>
          <h2>{`${data.firstName} ${data.lastName}`}</h2>
          <h5><a href={`mailto: ${data.email}`}>{data.email}</a></h5>
          <br/>
          <h4>Vehicle Details</h4>
          <h5>{`- Type: ${data.vehicleType}`}</h5>
          <h5>{`- Name: ${data.vehicleName}`}</h5>
          <h5>{`- Length: ${data.vehicleLength} feet`}</h5>
          <h5>{`- Name: ${data.vehicleName}`}</h5>
        </div>
        : 'Loading...'
      }
    </div>
  );
};
export default CustomerDetail;
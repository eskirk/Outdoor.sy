import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from '@material-ui/core';

const Customers = () => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const cols = [
    { field: 'id', hide: true },
    { field: 'fullName', headerName: 'Full Name', flex: 1, renderCell: (params) =>
      (
        <Link href={`/customer/${params.row.email}`}>{params.value}</Link>
      )
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'vehicleType', headerName: 'Vehicle Type', flex: 1 },
    { field: 'vehicleName', headerName: 'Vehicle Name', flex: 1 },
    { field: 'vehicleLength', headerName: 'Vehicle Length (ft)', flex: 1, type: 'number' },
    { field: 'sourceFile', headerName: 'Source File', flex: 1 },
  ];

  useEffect(() => {
    document.title = 'Customers';

    const fetchData = async () => {
      const response = await fetch('/customers', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json();
        setData(result.data.map((row) => {
          return {
            id: row.email,
            fullName: `${row.firstName} ${row.lastName}`,
            ...row
          }
        }));
        setDataLoaded(true);
      }
    }

    fetchData();
  }, [dataLoaded]);

  return (
    <div>
      <h4>Outdoor.sy CRM Customer List</h4>
      <hr />
      <div style={{ height: 800, width: "100%" }}>
        {dataLoaded ?
          <DataGrid
            rows={data}
            columns={cols}
          /> :
          'Loading...'
        }
      </div>
    </div>
  );
};
export default Customers;
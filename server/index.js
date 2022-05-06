const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fsHelpers = require('./firestoreHelper.js');

// define express constants
const PORT = process.env.PORT || 3001;
const app = express();

// apply express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Upload a file to firestore
 *
 * req.body should be shaped like:
 * { name: string, data: [string] }
 */
app.post('/uploadFile', async (req, res) => {
  try {
    // if no body provided by user, send error
    if (!req.body) {
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    }

    // upload file, if successful send response
    if (fsHelpers.uploadFile(req.body)) {
      res.send({
        status: true,
        message: 'File uploaded',
        data: {
          message: `Posted file: ${req.body.name}`
        }
      })
    }

    // catch all error message
    res.status(500).send({
      status: false,
      message: 'Something went wrong'
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

/**
 * Add a new customer based on the content in req.body
 *
 * req.body should be shaped like:
 * { firstName, lastName, ...  }
 */
app.post('/newCustomer', async (req, res) => {
  try {
    // if no body provided by user, send error
    if (!req.body) {
      res.send({
        status: false,
        message: 'No customer object provided'
      })
    }

    // add customer to db, if successful send response
    if (await fsHelpers.addCustomer(req.body)) {
      res.send({
        status: true,
        message: 'Customer added',
        data: {
          message: `Added customer: ${req.body.email}`
        }
      })
    }

    // catch all error message
    res.send({
      status: false,
      message: 'Missing required fields'
    });
  } catch (err) {
    console.log(err)
    res.status(500);
  }
});

/**
 * Get a list of all customers stored in the db
 */
app.get('/customers', async (req, res) => {
  try {
    let list = await fsHelpers.listCustomers();

    res.send({
      status: true,
      data: list
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

/**
 * Get a single row corresponding to a single customer
 */
 app.get('/customer', async (req, res) => {
  try {
    let customer = await fsHelpers.getCustomer(req.query.email);

    res.send({
      status: true,
      data: customer
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

/**
 * Generic app listener
 */
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
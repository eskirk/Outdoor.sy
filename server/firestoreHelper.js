// firebase configurations
const fsAdmin = require('firebase-admin');
const firebaseConfig = require('./firebase.json');
const firebase = fsAdmin.initializeApp({
  credential: fsAdmin.credential.cert(firebaseConfig)
});
const db = firebase.firestore();
const customerDb = db.collection('customers');

/**
 * Upload the rows of data within content.data to firestore udner the 'customers' collection
 *
 * @param {*} content - file content with the object structure of { name: string, data: string }
 */
const uploadFile = (content) => {
  const json = csvToJson(content.data, content.name);

  try {
    json.forEach((entry) => {
      customerDb.doc(entry.email).set(entry);
    });

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Convert each row of csv data into a json object
 *
 * @param {*} content
 * @param {*} fileName
 * @returns {[json]} - content split into rows and re-formated into json
 */
const csvToJson = (content, fileName) => {
  const rows = content.split('\n');
  let cols;

  return rows.map((row) => {
    if (row.split('|').length == 6)
      cols = row.split('|');
    else if (row.split(',').length == 6)
      cols = row.split(',');
    else return null;

    return {
      firstName: cols[0] || '',
      lastName: cols[1] || '',
      email: cols[2] || '',
      vehicleType: cols[3] || '',
      vehicleName: cols[4] || '',
      vehicleLength: parseLength(cols[5]) || '',
      sourceFile: fileName || ''
    }
  })
}

/**
 * List all customer info stored in the database
 *
 * @returns {[json]} - the json objects representing all the customers in the database
 */
const listCustomers = async () => {
  let list = [];

  return customerDb.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      list.push(doc.data());
    })

    return list;
  });
}

/**
 * Return the data for a single customer
 *
 * @returns {json} - the json object representing the single customer
 */
const getCustomer = async (email) => {
  return customerDb.doc(email).get().then((snapshot) => snapshot.data());
}

/**
 * Add a customer object to the firestore db
 *
 * @param {json} customer
 * @returns {boolean} - whether or not this db submission succeeded
 */
const addCustomer = async (customer) => {
  return validateCustomer(customer) ? !!customerDb.doc(customer.email).set(customer) : false;
}

/**
 * Validate a customer object for entry into db
 *
 * @param {json} c - the customer to validate
 * @returns {boolean} - whether or not this customer contains all the fields
 */
const validateCustomer = (c) => {
  return !!(c.firstName && c.lastName && c.email && c.vehicleType && c.vehicleName && c.vehicleLength);
}

/**
 * Clean the stringified length of the vehicle removing any extras such as "feet", "'", "ft", etc
 *
 * @param {string} lengthContent - string representing the length of the vehicle but with extra characters included
 * @returns {number} - the length of the vehicle as a number
 */
const parseLength = (lengthContent) => {
  return Number(lengthContent.replace(/[^\d.-]/g, ''));
}

module.exports = {
  uploadFile,
  listCustomers,
  getCustomer,
  addCustomer
};

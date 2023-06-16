const axios = require('axios');
const { prompt } = require('inquirer');

const newNamePassword = 'MWQzOTJlNTQ1NTI0NGJhYTgxYTkyYjc3Nzg0MGE2ZGI6OTUyZjc5OGVhZDhjNDE0MWJkOWYyNjkxYjExZTNmZWQ='
const auth = `Basic ${newNamePassword}`;

const shipstationHeaders = {
  'Host': 'ssapi.shipstation.com',
  'Authorization': auth
};

const freightShipment = async () => {
  try {

    const questions = await prompt([
      {
        type: 'input',
        message: 'What is the name of the customer?',
        name: 'customer',
      }
    ]);

    if (!questions.customer) return;

    const { data: orderData } = await axios.get(`https://ssapi.shipstation.com/orders?customerName=${questions.customer}&orderStatus=awaiting_shipment`, {
      headers: shipstationHeaders
    });

    // console.log(orderData);

    const customerId = orderData.orders[0].customerId;
    // const items = orderData.orders[0].items;
    // const sku = orderData.orders[0].items[0].sku;
    // const itemName = orderData.orders[0].items[0].name;
    // const quantity = orderData.orders[0].items[0].quantity;
    // const value = orderData.orders[0].items[0].unitPrice;

    // console.log(customerId);

    const { data: customerData } = await axios.get(`https://ssapi.shipstation.com/customers/${customerId}`, {
      headers: shipstationHeaders
    });

    // console.log(customerData);

    return [customerData, orderData];

  } catch (err) {
    console.log(err);
  }

};

// freightShipment();

module.exports = freightShipment;
// let userNamePassword = '1d392e5455244baa81a92b777840a6db:952f798ead8c4141bd9f2691b11e3fed';
const newNamePassword = 'MWQzOTJlNTQ1NTI0NGJhYTgxYTkyYjc3Nzg0MGE2ZGI6OTUyZjc5OGVhZDhjNDE0MWJkOWYyNjkxYjExZTNmZWQ='
const auth = `Basic ${newNamePassword}`;
const request = require('request');
const inquirer = require('inquirer');

// This function asks the user a question on who they are looking for, and then adds that name to the search to pull the customerid for the function dataPull()
const freightShipment = async () => {
    try {
        const questions = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the customer?',
                name: 'customer',
            },
        ]);

        let options = {
            'method': 'GET',
            'url': `https://ssapi.shipstation.com/orders?customerName=${questions.customer}&orderStatus=awaiting_shipment`,
            'headers': {
                'Host': 'ssapi.shipstation.com',
                'Authorization': auth
            }
        };
        
        request(options, function (error, response) { 
            if (error) throw new Error(error);
            let responseBody = JSON.parse(response.body);
            let custId = responseBody.orders[0].customerId;
            // console.log(custId);
            dataPull(custId);
        });

    } catch (err) {
        console.log(err);
    }
}

freightShipment();

// This functions below pulls the Address using the customerid from the above function
async function dataPull(custId) {
    let info = {
        'method': 'GET',
        'url': `https://ssapi.shipstation.com/customers/${custId}`,
        'headers': {
            'Host': 'ssapi.shipstation.com',
            'Authorization': auth
        }
    };

    request(info, function (error, response) { 
        if (error) throw new Error(error);
        let parseBody = JSON.parse(response.body);
        let dateOrdered = parseBody.createDate;
        let nameOfCustomer = parseBody.name;
        let addressOfCustomer = parseBody.street1 + ',' + parseBody.street2 + ' ' + parseBody.city + ', ' + parseBody.state + ' ' +parseBody.postalCode + ' ' + parseBody.countryCode;
        let marketplaceWeb = parseBody.marketplaceUsernames[0].marketplace;
        let phoneNumber = parseBody.phone;
        let emailOfCustomer = parseBody.email;
        console.log(parseBody);
    });
}

// module.exports = { dataPull };
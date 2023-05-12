// let userNamePassword = '1d392e5455244baa81a92b777840a6db:952f798ead8c4141bd9f2691b11e3fed';
let newNamePassword = 'MWQzOTJlNTQ1NTI0NGJhYTgxYTkyYjc3Nzg0MGE2ZGI6OTUyZjc5OGVhZDhjNDE0MWJkOWYyNjkxYjExZTNmZWQ='
let auth = `Basic ${newNamePassword}`;
const request = require('request');
const inquirer = require('inquirer');


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
            console.log(custId);
            dataPull(custId);
        });

    } catch (err) {
        console.log(err);
    }
}

freightShipment();

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
        console.log(parseBody);
    });
}


// const moveToClickUp = async () => {
//     try {

//     } catch (err) {
//         console.log(err);
//     }
// }


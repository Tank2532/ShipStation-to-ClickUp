// ID's for custom fields
const customerName = 'eb50ea3f-72cf-4e50-9143-7a695ee633fc';
const shipstationUrl = '00b4dd48-244b-466e-b458-2a50909322a7';
const email = '1dede1e3-ec46-4e60-97ee-9cc38c10db5e';
const orderDate = '7607e948-8481-4827-a28b-037ae0e124de';
const sku = '80b5d9fd-6db8-40ea-9c30-12a5d0126942';
const phone = 'a444486f-2fac-40c1-b65b-3a7ea65da5eb';
const shipping = 'a7d1e687-34d5-41fe-b29e-9b1830b25d0f';
const address = 'f4b44bd7-8e2f-4586-a4bf-7e0009e7f515';


import { createRequire } from "module";
const require = createRequire(import.meta.url);

// imports from node.js file
const freightShipment = require('../ShipStation/index');

// // Readline package to read one line at a time in order to use the information in the first file
// const EventEmitter = require('events');
// const userInputEvent = new EventEmitter();

// // The below function pulls the TeamId
// import fetch from 'node-fetch';

// async function run() {
//     const resp = await fetch(
//         `https://api.clickup.com/api/v2/team`,
//         {
//             method: 'GET',
//             headers: {
//                 Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
//             }
//         }
//     );

//     const data = await resp.text();
//     const parseData = JSON.parse(data);
//     console.log(parseData);
// }

// run();

// // The below function pulls the SpaceId using the TeamId
// import fetch from 'node-fetch';

// async function run() {
//     const query = new URLSearchParams({archived: 'false'}).toString();

//     const teamId = '14207093';
//     const resp = await fetch(
//     `https://api.clickup.com/api/v2/team/${teamId}/space?${query}`,
//     {
//         method: 'GET',
//         headers: {
//         Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
//         }
//     }
//     );

//     const data = await resp.text();
//     const parseData = JSON.parse(data);
//     console.log(parseData);
// }

// run();

// // The below function pulls the FolderId using the SpaceId
// import fetch from 'node-fetch';

// async function run() {
//     const query = new URLSearchParams({archived: 'false'}).toString();

//     const spaceId = '90030341724';
//     const resp = await fetch(
//     `https://api.clickup.com/api/v2/space/${spaceId}/folder?${query}`,
//     {
//         method: 'GET',
//         headers: {
//         Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
//         }
//     }
//     );

//     const data = await resp.text();
//     const parseData = JSON.parse(data);
//     console.log(parseData);
// }

// run();


// // The below function pulls the ListId using the FolderId
// import fetch from 'node-fetch';

// async function run() {
//     const query = new URLSearchParams({archived: 'false'}).toString();

//     const folderId = '90031074084';
//     const resp = await fetch(
//     `https://api.clickup.com/api/v2/folder/${folderId}/list?${query}`,
//     {
//         method: 'GET',
//         headers: {
//         Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
//         }
//     }
//     );

//     const data = await resp.text();
//     const parseData = JSON.parse(data);
//     console.log(parseData);
// }

// run();

// // This function pulls the custom field ID's using the list ID
// import fetch from 'node-fetch';

// async function run() {
//     const listId = '900301958539';
//     const resp = await fetch(
//     `https://api.clickup.com/api/v2/list/${listId}/field`,
//     {
//         method: 'GET',
//         headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
//         }
//     }
//     );

//     const data = await resp.text();
//     const parseData = JSON.parse(data);
//     console.log(parseData);
// }

// run();

import fetch from 'node-fetch';

// // The question that starts the task creating code and uses the variables found in Node.js
// userInputEvent.on('userInput1', () => {
//     rl.question('Do you want to create a task? ', (input2) => {
//         userInputEvent.emit('userInput2', input2);
                
//         rl.close();
//     });

// });

// userInputEvent.on('userInput2', (input2) => {
//     console.log('Received input 2:', input2);
//         try {
//             if (input2 === 'Yes') {
//                 createTask();
//             }
//             else {
//                 return 'Please try again.'
//             }
//         } catch (err) {
//             console.log(err);
//         }
// });

const createTask = async (freight) => {
    try {

        console.log(freight);

        // The following variables are undefined
        const nameOfCustomer = freight.name;
        const emailOfCustomer = freight.email;
        // const dateOrdered = freight.createDate;
        const phoneNumber = freight.phone;
        const addressOfCustomer = freight.street1 + "\n" + freight.street2 + "\n" + freight.city + ", " + freight.state + freight.postalCode + ", " + freight.countryCode;

        console.log(nameOfCustomer);
        console.log(emailOfCustomer);
        // console.log(dateOrdered);
        console.log(phoneNumber);
        console.log(addressOfCustomer);

        const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123'
        }).toString();
    
        const listId = '900301958539';
        const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
            },
            body: JSON.stringify({
                name: 'Test This Task',
                description: 'New Task Description',
                assignees: [183],
                tags: ['tag name 1'],
                status: 'New',
                priority: 3,
                due_date: 1508369194377,
                due_date_time: false,
                time_estimate: 8640000,
                start_date: 1567780450202,
                start_date_time: false,
                notify_all: true,
                parent: null,
                links_to: null,
                check_required_custom_fields: true,
                custom_fields: [
                {
                    id: customerName,
                    value: nameOfCustomer,
                },
                {
                    id: shipstationUrl,
                    value: '',
                },
                {
                    id: email,
                    value: emailOfCustomer,
                },
                {
                    id: orderDate,
                    value: "",
                },
                {
                    id: sku,
                    value: 'CG00SOM',
                },
                {
                    id: phone,
                    value: "",
                },
                {
                    id: shipping,
                    value: '400',
                },
                {
                    id: address,
                    value: addressOfCustomer,
                }
                ]
            })
        }
        );
    
        const data = await resp.json();
        console.log(data);

    } catch (err) {
        console.log(err);
    }
}


const init = async () => {
    try {
        const freight = await freightShipment();


        // const taskData = await createTask(freight);
        await createTask(freight);

    } catch(err) {
        console.log(err);
    };
};

init();
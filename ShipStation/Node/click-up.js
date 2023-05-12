import fetch from 'node-fetch';

async function run() {
    const resp = await fetch(
        `https://api.clickup.com/api/v2/team`,
        {
            method: 'GET',
            headers: {
                Authorization: 'pk_57132549_SW46N1UIKJ1Q4WE59XXNT7LOK2PUX6RV'
            }
        }
    );

    const data = await resp.text();
    console.log(data);
}

run();
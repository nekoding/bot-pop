const puppeteer = require('puppeteer');

// Inspect the cookies to change province
const cookies = [
    {
        name: 'userProv',
        value: 'NT%20Timur',
        domain: 'popowi.netlify.app'
    },
    {
        name: 'count',
        value: '0',
        domain: 'popowi.netlify.app'
    }
]

const startBot = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    
    await page.goto('https://popowi.netlify.app');

    await page.setCookie(...cookies);

    await page.click('button.swal2-confirm');

    let counter = 0;

    while (true) {

        await page.click('#img');
        counter++;

        if (counter % 100 === 0) {
            console.log('Makar counter : ' + (await page.cookies())[0].value);
            // break;
        }
    }
}

startBot();
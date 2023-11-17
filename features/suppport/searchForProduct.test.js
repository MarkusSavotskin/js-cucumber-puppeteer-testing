const { When, Then, Given, Before, AfterAll } = require("cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page;
Before(async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
    });
    page = await browser.newPage();
})

Given('User visits AliExpress website', async function () {
    await page.goto("https://www.aliexpress.com")
});

When('Users searches by product name', async function () {
    let inputSelector = '[type=text]'
    await page.waitForSelector(inputSelector);
    let input = await page.$(inputSelector);
    await input.type('S22 case');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
});

Then('Get title of first result', async function () {
    let result = await page.$('#card-list > div:nth-child(1) > div > a > div.multi--content--11nFIBL > div.multi--title--G7dOCj3 > h1');
    await page.waitForSelector(result);

    let title = await page.evaluate(el => el.textContent, result)
    console.log(title)
    expect(title).includes('S22')

});

AfterAll(async () => {
    await browser.close();
});
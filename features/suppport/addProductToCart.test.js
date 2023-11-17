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

Given('User wants to buy something on AliExpress', async function () {
    await page.goto("https://www.aliexpress.com")
});

When('Users searches for product', async function () {
    let inputSelector = '[type=text]'
    await page.waitForSelector(inputSelector);
    let input = await page.$(inputSelector);
    await input.type('S22 case');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
});


Then('User clicks on product', async function () {
    let result = await page.$('#card-list > div:nth-child(1) > div > a');
    await page.waitForSelector(result)

    result.click();
});

Then('User adds the product to their cart', async function () {
    let button = await page.$('#root > div > div.pdp-body.pdp-wrap > div > div.pdp-body-top-right > div > div > div.action--stickyWrap--ZKtL0mk > button.comet-v2-btn.comet-v2-btn-large.add-to-cart--addtocart--RXmuNXk.comet-v2-btn-important');
    await page.waitForSelector(button)

    button.click();
});

AfterAll(async () => {
    await browser.close();
});
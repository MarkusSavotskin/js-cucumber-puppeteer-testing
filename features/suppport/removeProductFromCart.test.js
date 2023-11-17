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

Given('User thought they wanted to buy something from AliExpress', async function () {
    await page.goto("https://www.aliexpress.com")
});

When('Users looks for a product', async function () {
    let inputSelector = '[type=text]'
    await page.waitForSelector(inputSelector);
    let input = await page.$(inputSelector);
    await input.type('S22 case');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
});

Then('User opens the product page', async function () {
    let result = await page.$('#card-list > div:nth-child(1) > div > a');
    await page.waitForSelector(result);

    result.click();
});

Then('User adds the product to the cart', async function () {
    let button = await page.$('#root > div > div.pdp-body.pdp-wrap > div > div.pdp-body-top-right > div > div > div.action--stickyWrap--ZKtL0mk > button.comet-v2-btn.comet-v2-btn-large.add-to-cart--addtocart--RXmuNXk.comet-v2-btn-important');
    await page.waitForSelector(button);

    button.click();
});

Then('User navigates to the cart', async function () {
    let cart = await page.$('#_global_header_23_ > div > div > div.pc-header--right--2cV7LB8 > div > div.pc-header--items--tL_sfQ4 > div.shop-cart--menuItem--1WhClHl.shop-cart--withPadding--3bdg_Yv > a');
    await page.waitForSelector(cart)

    cart.click();
});

Then('User removes the product from the cart', async function () {
    let trash = await page.$('#root > div.cart-wrap > div.cart-body > div.cart-main > div.cart-list > div > div > div:nth-child(1) > div.group-shop-container > div.cart-product-wrap-group.app_cart_product_component_group > div > div.cart-product-info > div.cart-product-name-new > div > span.comet-icon.comet-icon-trashcan')
    await page.waitForSelector(trash)

    trash.click();
});

AfterAll(async () => {
    await browser.close();
});
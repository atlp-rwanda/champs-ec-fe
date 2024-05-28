import * as puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const timeout = 150000;

beforeEach(async () => {
    browser = await puppeteer.launch({});
    page = await browser.newPage();
    await page.goto(global.URL.toString());
}, timeout);

afterEach(async () => {
    await browser.close();
},timeout);


describe('Test page title', () => {
    test('page title', async () => {        
        await page.setViewport({ width: 1200, height: 1024 });
        const title = await page.title();
        expect(title).toBe("Champs E-Commerce");
    }, timeout);
});

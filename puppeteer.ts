import puppeteer from "puppeteer"

async function main(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://stake.com');
    await page.waitForSelector('body'); // Wait for the page to load
}
main()
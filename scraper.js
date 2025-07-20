const { chromium } = require('playwright');

async function scrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (let seed = 55; seed <= 64; seed++) {
    const url = `https://example.com/seed-${seed}`; // Replace with actual URLs
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );
    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  console.log(`Total Sum: ${totalSum}`);
  await browser.close();
}

scrape();

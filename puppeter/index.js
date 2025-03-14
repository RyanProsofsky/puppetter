import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Users\\ryan-note\\AppData\\Local\\Chromium\\Application\\chrome.exe'
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://translate.google.com.br/?sl=pt&tl=en&op=translate');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type('.er8xn', 'teste');

  //Aguarde a escrita terminar
  await page.waitForSelector('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span')

 const result = await page.evaluate(() => 
    document.querySelector('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span').innerText
  )

  //Printando o resultado da tradução
  console.log("TRADUÇÃO:",result)

  await browser.close();
})();


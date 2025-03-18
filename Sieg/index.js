import puppeteer from "puppeteer";
import fetch, { FormData } from "node-fetch"


async function sieg(data) {
        const browser = await puppeteer.launch({
                headless: false,
                executablePath: 'C:\\Users\\ryan-note\\AppData\\Local\\Chromium\\Application\\chrome.exe'
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // Indo para a pagina do navegador
        await page.goto('https://auth.sieg.com/');

        //Realizando o login
        await page.type('#txtEmail', data.email)
        await page.type('#txtPassword', data.senha)
        await page.click('#btnSubmit')

        //fazendo a requisição

        fetch('https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=', {
                method: "POST",
                // body: {'FormData'},
                headers: {
                        "authority": "hub.sieg.com",
                        "path": "/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=",
                        "content-type": "application/json; charset=UTF-8",
                        "scheme": "https",
                        "accept": "*/*",
                        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryO8BmVGfokwlhWyMW",
                        "Cookie": "_ga=GA1.2.1235712788.1738668240; darkModeCookie=Off; _sleek_session=%7B%22init%22%3A%222025-02-04T11%3A24%3A16.281Z%22%7D; _hjSessionUser_3570950=eyJpZCI6Ijc2ODlkYTMyLWYwMzEtNTNlZS05ZWUwLTZlYTNmOTQ0NDU2YiIsImNyZWF0ZWQiOjE3Mzg2NjgyNTU1NDQsImV4aXN0aW5nIjp0cnVlfQ==; _cx.tracking.apikey=1c065310ebbb7dc39a79b506ddbf4d38; _cx.tracking.external_id_client=1749; _cx.tracking.email=paulo.silva@itamaraticontabil.com.br; AbbaReport=Off; _gid=GA1.2.681739898.1741798515; COFRE.AUTH=65e04acf-9804-4173-b0f3-40521bcbbd1f; __AntiXsrfToken=52142487e46a41f7bf8eff3ce9602e31; _clck=1mjgfc1%7C2%7Cfu7%7C0%7C1861; modalHubPrint-67d1ead9fd1d113d3bd22bfe20250314=3; modalNps=4; _gat=1; _hjSession_3570950=eyJpZCI6ImZmZGFiMmM4LTQwZjMtNDRmMy1iZGZmLTVjZjg3MTZkZTYyZSIsImMiOjE3NDE5NzI2MDExNjcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowfQ==; _clsk=296qhq%7C1741972601427%7C1%7C1%7Ci.clarity.ms%2Fcollect; _cx.survey.status=no-survey-found; _BEAMER_FILTER_BY_URL_fxzWhwyU5092=false; AWSALB=c1mIkezHlN1GLSCzCvZBGEq4isEUXXCSbf0FOlClD2AgpUsjeZOpppZY8Q5tPSZ++LgAhGHI68XDhxX9iyjTB/yZhH5a94umhnuIcDkk0tfl2VR9YbaW1voqUvDw; AWSALBCORS=c1mIkezHlN1GLSCzCvZBGEq4isEUXXCSbf0FOlClD2AgpUsjeZOpppZY8Q5tPSZ++LgAhGHI68XDhxX9iyjTB/yZhH5a94umhnuIcDkk0tfl2VR9YbaW1voqUvDw; _ga_0XCNMGZ1WP=GS1.2.1741972601.22.1.1741972631.30.0.0"
                },
                body: {
                        payload

                }
        }).then(result => {
                (
                        result.json().then(result2 => {
                                console.log(result2)
                        })
                )
        })

        //pesquisando as empresas
        // for (let i = 0; i < data.empresa.length; i++) {
        //         await page.waitForSelector('#searchTableCompany');

        //         await page.type('#searchTableCompany', data.empresa[i].cnpj, { delay: 800 })

        //         const url = await page.evaluate(() => document.querySelector('#tBodyTableCompanys > tr').attributes.onclick.value)

        //         const link = url.split("'")[1]

        //         await page.goto(`https://hub.sieg.com${link}`)

        //         await page.screenshot({ path: `teste.jpg` })

        //         await page.goto('https://hub.sieg.com/')

        // }
}

export default sieg



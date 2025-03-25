import puppeteer from "puppeteer";
import fetch from "node-fetch"

async function sieg(data) {
        const browser = await puppeteer.launch({
                headless: false
        });

        const arr = []

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // Indo para a pagina do navegador
        await page.goto('https://auth.sieg.com/', { waitUntil: 'networkidle2' });

        //Realizando o login
        await page.type('#txtEmail', data.email)
        await page.type('#txtPassword', data.senha)
        await page.click('#btnSubmit')

        await page.waitForNavigation();

        const cookies = await page.evaluate(() => {
                return document.cookie
        })

        await page.waitForSelector('#buttonsPaginateTableAllCompany')

        const lista = await page.evaluate(() => {
                return document.querySelector('#buttonsPaginateTableAllCompany').children.length - 2
        })

        for (let x = 0; x < lista; x++) {
                const formData = new FormData()
                formData.append("json", JSON.stringify({ "Skip": `${x}` }))

                //fazendo a requisição
                const response = await fetch('https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=', {
                        method: "POST",
                        headers: {
                                "Cookie": cookies,
                        },
                        body: formData
                })

                const result = await response.json()
                arr.push(result.ListCompanys)

                // pesquisando as empresas e tirando print da tela
                for (let y = 0; y < arr[x].length; y++) {
                        if (arr[x][y].CnpjOrCpf == '05234343000134' || arr[x][y].CnpjOrCpf == '05234343000134' || arr[x][y].CnpjOrCpf == '04971033000130') {
                                let id = arr[x][y].Id
                                await page.goto(`https://hub.sieg.com/detalhes-do-cliente?id=${id}`)
                                await page.screenshot({ path: `${result.ListCompanys[y].CompanyName}.jpg` })
                        }
                }
        }
}

// console.log(arr[0][0].CnpjOrCpf)

export default sieg
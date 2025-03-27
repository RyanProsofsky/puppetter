import puppeteer from "puppeteer";
import fetch from "node-fetch"

async function sieg(data) {
        const browser = await puppeteer.launch({
                headless: false
        });

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

        let arr = []
        let cont = 0
        let p = []

        //fazendo a requisição
        while (lista > cont) {
                //Realizando a paginação
                const formData = new FormData()
                formData.append("json", JSON.stringify({ "Skip": `${cont}` }))

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

                p = p.concat(arr[cont])

                cont++
        }

        // pesquisando as empresas e tirando print da tela
        function find_cnpj(cnpjEmp) {
                return cnpjEmp.cnpj == data.empresa.cnpj;
        }

        if (p.find(find_cnpj)) {
                let id = p.Id
                await page.goto(`https://hub.sieg.com/detalhes-do-cliente?id=${id}`)
                await page.screenshot({ path: `teste.jpg` })
        } else {
                console.log('nao encontrou')
        }
}

export default sieg




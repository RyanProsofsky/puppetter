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

        let teste 
        let arr = []
        let cont = 0
        let newArr = []


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
                // newArr.push(result.ListCompanys)
                // console.log(result.ListCompanys.length)

                let i = 0
                while(result.ListCompanys.length > i){
                        // console.log(arr[cont][i].CnpjOrCpf)
                        console.log(data.empresa[i].cnpj)

                        i++
                }

                teste = newArr.concat(arr)

                cont++

                // newArr = arr.reduce((list, sub) => list.concat(sub), [])
                // console.log(teste)
                
        }  
}

export default sieg



// pesquisando as empresas e tirando print da tela
// if (arr[x][y].CnpjOrCpf == '05234343000134' || arr[x][y].CnpjOrCpf == '05234343000134' || arr[x][y].CnpjOrCpf == '04971033000130') {
//         let id = arr[x][y].Id
//         await page.goto(`https://hub.sieg.com/detalhes-do-cliente?id=${id}`)
//         await page.screenshot({ path: `${result.ListCompanys[y].CompanyName}.jpg` })
// }
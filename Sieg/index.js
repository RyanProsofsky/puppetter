import puppeteer from "puppeteer";
import fetch from "node-fetch"

async function sieg(data) {
        const browser = await puppeteer.launch({
                headless: false
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // Indo para a pagina do navegador
        await page.goto('https://auth.sieg.com/');

        //Realizando o login
        await page.type('#txtEmail', data.email)
        await page.type('#txtPassword', data.senha)
        await page.click('#btnSubmit')

        await page.waitForNavigation();

        // await page.waitForSelector('#buttonsPaginateTableAllCompany')
        // await page.click('#buttonsPaginateTableAllCompany > a:nth-child(3)', { delay: 2000 });
        // await page.evaluate(() => {
        //         return document.cookie

        // }).then()
        // // console.log(cookie)

        // let formData = new FormData()

        let formData = '{"Skip":1,"Name":"","CnpjOrCpf":"","CertificateOnly":false,"CertificateStatus":"0","CertificateStatusConsult":"0","ConfigNfeOut":"0","ConfigNfeOutStatus":"0"}'
        let formJson = JSON.parse(formData)

        console.log(typeof (formJson))

        //fazendo a requisição
        let response = await fetch('https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=', {
                method: "POST",
                headers: {
                        "Content-Type": "multipart/form-data",
                        "Content-Disposition": "form-data; name='json'",
                        "Cookie": "__AntiXsrfToken=3fe2732608e54b6d85183ae6e11446f1; _sleek_session=%7B%22init%22%3A%222025-03-18T18%3A48%3A33.321Z%22%7D; darkModeCookie=Off; AbbaReport=Off; _cx.tracking.apikey=1c065310ebbb7dc39a79b506ddbf4d38; _cx.tracking.external_id_client=1749; _cx.tracking.email=paulo.silva@itamaraticontabil.com.br; _cx.survey.status=no-survey-found; _ga=GA1.2.1474817768.1742323913; _sleek_product=%7B%22token%22%3A%22788520897657bd06aa4133f901baf73a625ea4970%22%2C%22user_data%22%3A%7B%22user_id%22%3A884764%2C%22admin_id%22%3A0%2C%22sso%22%3Atrue%2C%22anonymous%22%3Afalse%2C%22data_name%22%3A%22paulo_h_silva628%22%2C%22data_full_name%22%3A%22PAULO%20H%20SILVA%22%2C%22data_mail%22%3A%22paulo.silva%40itamaraticontabil.com.br%22%2C%22data_img%22%3A%22https%3A%2F%2Fstorage.sleekplan.com%2Fproducts%2F489604195%2Fuser%2F884764%2Fa9914f2ee1850953c5e2da80e9f03b42.jpg%22%2C%22segments%22%3A%5B%22clientes-hub-e-iris672e0a1f908d3%22%2C%22planos672e06590fd4c%22%2C%22pernambuco672e043b552ec%22%5D%2C%22notify%22%3A1%2C%22notify_settings%22%3A%7B%22mention%22%3Atrue%2C%22changelog%22%3Atrue%2C%22subscribed%22%3Atrue%7D%7D%7D; modalNps=4; COFRE.AUTH=5e6a8997-3275-499f-8566-4620206d7fae; AWSALB=QxfoOfI/k+EpgsyVl2g5kjqauyCM7Al3+/r3YJgvxeeOZyeCXjrt4K4wBPXrtU+MSqJ6jLqVZixSNVDBY+ci4T8TC82u2TY0vH7wH+vOZy/UU115EqqGLZYUkvlh; AWSALBCORS=QxfoOfI/k+EpgsyVl2g5kjqauyCM7Al3+/r3YJgvxeeOZyeCXjrt4K4wBPXrtU+MSqJ6jLqVZixSNVDBY+ci4T8TC82u2TY0vH7wH+vOZy/UU115EqqGLZYUkvlh"
                },
                body: formData
        });

        let result = await response.json()
        console.log(result.ListCompanys[0])

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








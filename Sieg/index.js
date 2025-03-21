import puppeteer from "puppeteer";
import fetch from "node-fetch"
import { request } from "express";

async function sieg(data) {
        const browser = await puppeteer.launch({
                headless: false
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // Indo para a pagina do navegador
        await page.goto('https://auth.sieg.com/',  { waitUntil: 'networkidle2' });

        //Realizando o login
        await page.type('#txtEmail', data.email)
        await page.type('#txtPassword', data.senha)
        await page.click('#btnSubmit')

        // await page.setRequestInterception(true)

        // page.on('request', interceptedRequest => {
        //         console.log(interceptedRequest.url()) 
        // });

        // page.on('request',interceptedRequest => {
        //         if(interceptedRequest.url() == 'https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf='){
        //                 console.log(interceptedRequest.url())
        //                 console.log(interceptedRequest.headers())   

        //                 // const cookies = interceptedRequest.cookies()
        //                 // console.log(cookies)
                        
        //         }
        // })

        // const cookies = await page.evaluate(() => {
        //         return document.cookie
        // })

        // console.log(cookies)


        //fazendo a requisição
        // let formData = new FormData()

        // formData.append("Skip", 1)
        // formData.append("Name", "")
        // formData.append("CnpjOrCpf", "")
        // formData.append("CertificateOnly", false)
        // formData.append("CertificateStatus", "0")
        // formData.append("CertificateStatusConsult", "0")
        // formData.append("ConfigNfeOut", "0")
        // formData.append("ConfigNfeOutStatus", "0")



        // await fetch('https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=', {
        //         method: "POST",
        //         headers: {
        //                 "authority":"hub.sieg.com",
        //                 "content-type":"multipart/form-data; boundary=----WebKitFormBoundarygcLfxXQuRf5GbEvc",
        //                 "Content-Disposition": "form-data; name='json'",
        //                 "scheme":"https"
        //         },
        // }).then(response => {
        //         const cookie = response.headers.get('server')
        //         console.log(cookie)
        // })

        // console.log(result.ListCompanys)


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

import puppeteer from "puppeteer";
import fetch from "node-fetch"
import { json, request } from "express";

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

        //fazendo a requisição
        let formData = {
                "Skip": 0,
                "Name": "",
                "CnpjOrCpf": "",
                "CertificateOnly": false,
                "CertificateStatus": "0",
                "CertificateStatusConsult": "0",
                "ConfigNfeOut": "0",
                "ConfigNfeOutStatus": "0"
        }

        // let teste =  {
        //         "Skip": 4,
        //         "Name": "",
        //         "CnpjOrCpf": "",
        //         "CertificateOnly": false,
        //         "CertificateStatus": "0",
        //         "CertificateStatusConsult": "0",
        //         "ConfigNfeOut": "0",
        //         "ConfigNfeOutStatus": "0"
        //       }

        

        await fetch('https://hub.sieg.com/handler/hubInfo.ashx?action=GetCompanysAndCertificates&cnpjOrCpf=', {
                method: "POST",
                headers: {
                        "Cookie": cookies
                },
                body:formData
                


        }).then(response => {
                response.json().then(response2 => {
                        console.log(response2.ListCompanys[99])
                })
        })

        // let result = response.json()
        // console.log(result)


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
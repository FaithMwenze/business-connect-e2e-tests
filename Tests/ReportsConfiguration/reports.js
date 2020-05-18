import {loginUsers} from "../Helpers/hooks"
import ReportConfiguration from "./page-objects"
import { RequestMock } from "testcafe";
import fs from 'fs';
import os from 'os'

const reports = new ReportConfiguration()

const corporatecsvFileName = 'Corporate.csv'
const businessCsvFileName = 'Business.csv'
const corporatepdfFileName = 'Corporate.pdf'
const businesspdfFileName = 'Business.pdf'

const downloadLocation = os.homedir() + "/Downloads/"


// Mock get corporates endpoint 
var mock = RequestMock()
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/reports/corporates?size=1000`)
.respond({content: [{corporateName: "JARED LIMITED",collectionAccount: "00101805821211",
chargeAccount: "19990159580025",branch: "Nairobi",bcStatus: "APPROVED",sector: "Manufacturing",
signUpDate: "2019-11-01 12:32:06.918",contactPerson: "string",contactEmail: "JAREDSAGWELLP@GMAIL.COM",
contactPhone: "+254721763862"}]},
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})

fixture `Report configuration`
// test.requestHooks(mock)
// ("search corporate name", async(testController) => {
//    await testController.click(reports.reportNavSelector)
//    await testController.click(reports.corporateReportButton)
//    await testController.typeText(reports.searchCorporate, "JARED LIMITED")
//    await testController.expect(reports.corporateNameSelector.innerText).eql("JARED LIMITED")
// })

test.before(loginUsers.loginBankAdminMaker)
("Download  corporate report csv", async(testController) => {
    await testController.click(reports.reportNavSelector)
    await testController.click(reports.corporateReportButton)
    await testController.click(reports.corporateCsvButtonSelector)
    await testController.expect(fs.existsSync(downloadLocation + corporatecsvFileName)).ok()

})

test.before(loginUsers.loginBankAdminMaker)
("Download corporate report pdf", async(testController) => {
    await testController.click(reports.reportNavSelector)
    await testController.click(reports.corporateReportButton)
    const pdfButtonExists =  reports.pdfButtonSelector.exists
    await testController.expect(pdfButtonExists).ok()

    
})

test.before(loginUsers.loginBankAdminMaker)
("Download business report csv", async(testController) => {
    await testController.click(reports.reportNavSelector)
    await testController.click(reports.businessReportButton)
    await testController.click(reports.businessCsvButtonSelector)
    await testController.expect(fs.existsSync(downloadLocation + businessCsvFileName)).ok()
})
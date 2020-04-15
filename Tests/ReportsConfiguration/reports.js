import {loginUsers} from "../Helpers/hooks"
import ReportConfiguration from "./page-objects"
import { RequestMock } from "testcafe";
import fs from 'fs';

const reports = new ReportConfiguration()

const fileName = 'generatedBy_react-csv.csv'
const windowsDownloadLocation = "C:\\Users/beth.muniu/Downloads/"
const linuxDownloadLocation = "./Downloads"


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
.beforeEach(loginUsers.loginBankAdminChecker)
test.requestHooks(mock)
("search corporate name", async(testController) => {
   await testController.click(reports.reportNavSelector)
   await testController.click(reports.corporateReportButton)
   await testController.typeText(reports.searchCorporate, "JARED LIMITED")
   await testController.expect(reports.corporateNameSelector.innerText).eql("JARED LIMITED")
})

test("Download pdf and csv", async(testController) => {
    await testController.click(reports.reportNavSelector)
    await testController.click(reports.corporateReportButton)
    await testController.click(reports.csvButtonSelector)
    await testController.wait(1000)
    await testController.expect(fs.existsSync(windowsDownloadLocation + fileName)).ok()


})

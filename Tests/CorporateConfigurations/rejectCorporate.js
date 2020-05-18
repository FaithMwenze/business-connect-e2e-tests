import { loginUsers } from "../Helpers/hooks";
import CorporateConfiguration from "./page-objects"
import { RequestMock } from "testcafe";
import faker from "faker"

const corporateConfiguration = new CorporateConfiguration()
fixture `Reject corporate module`

const corporateName = faker.company.companyName()
const cif = Math.floor(1000000 + Math.random() * 9000000).toString();
var mock = RequestMock()
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/get-corporate-account-details/${cif}`)
.respond({"accountName":`${corporateName}`,"accountNumber":"00100010311202","phoneNumber":"25420553601","email":"ACCOUNTS@CL.CO.KE","branch":"001","freezeDetails":"NOT FROZEN","accountStatus":"ACTIVE","financialDetails":"FUNDED"},
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})


test.requestHooks(mock)
.before(async (testController) => {
    await loginUsers.loginBankUserMaker(testController)
    await corporateConfiguration.createCorporate(testController, cif)
}

)
("reject creation of a corporate", async(testController)   => {
    await loginUsers.loginBankUserChecker(testController)
    await testController.click(corporateConfiguration.corporateNavbarSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName)
    await testController.wait(1500)
    await testController.click(corporateConfiguration.editSelector)
    await testController.click(corporateConfiguration.rejectSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName, {replace: true})
})
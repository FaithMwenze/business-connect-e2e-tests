import { loginUsers } from "../Helpers/hooks";
import CorporateConfiguration from "./page-objects"
import { RequestMock } from "testcafe";
import faker from "faker"


const corporateConfiguration = new CorporateConfiguration()
const corporateName = faker.company.companyName()
const  cif = Math.floor(1000000 + Math.random() * 9000000).toString();
var mock = RequestMock()
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/get-corporate-account-details/${cif}`)
.respond({"accountName":`${corporateName}`,"accountNumber":"00100010311202","phoneNumber":"25420553601","email":"ACCOUNTS@CL.CO.KE","branch":"001","freezeDetails":"NOT FROZEN","accountStatus":"ACTIVE","financialDetails":"FUNDED"},
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})


fixture `Corporate module`


test.requestHooks(mock)
.before(loginUsers.loginBankUserMaker)
(`create corporate`, async(testController) => {
    await corporateConfiguration.createCorporate(testController, corporateName, cif)
   await testController.expect(corporateConfiguration.statusSelector.innerText).eql("PENDING")
})

test.before(loginUsers.loginBankUserChecker)
("Approve a corporate", async(testController) => {
    await testController.click(corporateConfiguration.corporateNavbarSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName)
    await testController.click(corporateConfiguration.editSelector)
    await testController.click(corporateConfiguration.approveSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName)
    await testController.expect(corporateConfiguration.statusSelector.innerText).eql("APPROVED")

})
test.before(loginUsers.loginBankUserMaker)
("Edit a corporate", async(testController) => {
     await corporateConfiguration.editCorporate(testController, corporateName)
    await testController.wait(2000)
    await testController.expect(corporateConfiguration.statusSelector.innerText).eql("PENDING_EDIT")
})
test.before(loginUsers.loginBankUserChecker)
("Approve a PENDING EDIT corporate", async(testController)  => {
    await testController.click(corporateConfiguration.corporateNavbarSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName)
    await testController.click(corporateConfiguration.editSelector)
    await testController.click(corporateConfiguration.approveSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName, {replace: true})
    await testController.wait(2000)
    await testController.expect(corporateConfiguration.statusSelector.innerText).eql("APPROVED")
})

test.before( async(testController) =>{
    await loginUsers.loginBankUserMaker(testController)
    await corporateConfiguration.editCorporate(testController,corporateName)
})
("Reject a PENDING EDIT corporate", async(testController) => {
    await loginUsers.loginBankUserChecker(testController)
    await testController.click(corporateConfiguration.corporateNavbarSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName)
    await testController.click(corporateConfiguration.editSelector)
    await testController.click(corporateConfiguration.rejectSelector)
    await testController.typeText(corporateConfiguration.searchCorporateNameSelector, corporateName, {replace: true})
    await testController.expect(corporateConfiguration.statusSelector.innerText).eql("APPROVED")
})


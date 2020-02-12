import { loginUsers } from "../../Helpers/hooks"
import UserConfiguration from "../page-objects";
import { debug } from "util";

const {LOGIN_URL} = process.env

const userConfiguration = new UserConfiguration()

fixture `create a corporate Admin`
.page(LOGIN_URL)

testData.CORPORATEADMINUSER = {}
const createdRoles =  () =>  testData.CREATEROLE['Corporate']

test.before( async(testController) => {
    await loginUsers.loginBankUserMaker(testController)
})("Create a corporate Admin", async testController => {
   const createdUser = await  userConfiguration.createCorporateAdmin(testController, createdRoles()) 
   testData.CORPORATE_ADMIN_USER =  createdUser
   await testController.expect(userConfiguration.statusSelector.innerText).eql('PENDING')
})
test.before(loginUsers.loginBankUserChecker)
("Approve a corporate Admin", async(testController) => {
    await testController.click(userConfiguration.corporateNavbarSelector)
    await testController.click(userConfiguration.corporateAdminTabSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER)
    await testController.wait(500)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.approveButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER, {replace: true} )
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
})
 test.before(loginUsers.loginBankUserMaker)
 ("Edit a corporate admin", async(testController) => {
     await testController.click(userConfiguration.corporateNavbarSelector)
     await testController.click(userConfiguration.corporateAdminTabSelector)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER)
     await testController.wait(500)
     await testController.click(userConfiguration.editButtonSelector)
     await testController.click(userConfiguration.saveCorporateAdminSelector)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER, {replace: true})
     await testController.expect(userConfiguration.searchStatusSelector.innerText).eql('PENDING_EDIT')
 })


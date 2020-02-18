import { loginUsers } from "../../Helpers/hooks"
import UserConfiguration from "../page-objects";
const { LOGIN_URL } = process.env

const userConfiguration = new UserConfiguration()

fixture `create a corporate Admin`
    .page(LOGIN_URL)

const createdRoles =  () =>  testData.CREATEROLE['Corporate']

const corporateType = () =>  [
   { type: "Lite" },
   {type: "Custom" }
]

corporateType().forEach( data => {
    
test.before( async(testController) => {
    await loginUsers.loginBankUserMaker(testController)
})("Create a corporate Admin", async testController => {
   const createdUser = await  userConfiguration.createCorporateAdmin(testController, createdRoles(), data.type) 
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
     await userConfiguration.editCorporateAdmin(testController, testData.CORPORATE_ADMIN_USER)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER, {replace: true})
     await testController.wait(2000)
     await testController.expect(userConfiguration.statusSelector.innerText).eql('PENDING_EDIT')
 })

 test.before(loginUsers.loginBankUserChecker)
 (`Approve PENDING EDIT corporate Admin`, async(testController) => {
     await testController.click(userConfiguration.corporateNavbarSelector)
     await testController.click(userConfiguration.corporateAdminTabSelector)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER)
     await testController.wait(500)
     await testController.click(userConfiguration.editButtonSelector)
     await testController.click(userConfiguration.saveCorporateAdminSelector.find('button:nth-child(1)'))
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER, {replace: true})
     await testController.wait(2000)
     await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
 })

  test.before( async (testController) => {
    await loginUsers.loginBankUserMaker(testController)
    await userConfiguration.editCorporateAdmin(testController, testData.CORPORATE_ADMIN_USER)
 }) 
 ('Reject PENDING EDIT corporate Admin', async(testController) => {
     await loginUsers.loginBankUserChecker(testController)
     await testController.click(userConfiguration.corporateNavbarSelector)
     await testController.click(userConfiguration.corporateAdminTabSelector)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER)
     await testController.wait(500)
     await testController.click(userConfiguration.editButtonSelector)
     await testController.click(userConfiguration.rejectButtonSelector)
     await testController.click(userConfiguration.yesButtonSelector)
     await testController.typeText(userConfiguration.rejectuserSelector, 'Testing Rejection')
     await testController.click(userConfiguration.rejectButtonSelector)
     await testController.typeText(userConfiguration.searchUsernameSelector, testData.CORPORATE_ADMIN_USER, {replace: true})
     await testController.wait(2000)
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
 })

})

import { loginUsers } from "../../Helpers/hooks"
import UserConfiguration from "../page-objects";
import { debug } from "util";

const {LOGIN_URL} = process.env

const userConfiguration = new UserConfiguration()

fixture `create a corporate Admin`
.page(LOGIN_URL)

testData.CORPORATEADMINUSER = {}
const createdRoles =  () =>  testData.CORPORATE_ADMIN_USER

test.before( async(testController) => {
    await loginUsers.loginBankUserMaker(testController)
})("Create a corporate Admin", async testController => {
   const createdUser = await  userConfiguration.createCorporateAdmin(testController, createdRoles()) 
   testData.CORPORATE_ADMIN_USER =  createdUser
   await testController.expect(userConfiguration.roleTypeSelector.innerText).eql(createdUser)
})
test.before(loginUsers.loginBankUserChecker)
("Approve a corporate Admin", async(testController) => {
    await testController.click(userConfiguration.corporateNavbarSelector)
    await testController.typeText(this.searchUsernameSelector, testData.CORPORATE_ADMIN_USER)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.approveButtonSelector)
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
})


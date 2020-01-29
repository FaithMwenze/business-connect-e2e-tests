import { loginUsers } from "../../Helpers/hooks"
import UserConfiguration from "../page-objects";
import { debug } from "util";

const {LOGIN_URL} = process.env

const userConfiguration = new UserConfiguration()

fixture `create a corporate Admin`
.page(LOGIN_URL)

testData.corporateAdminUser = {}
const createdRoles =  () =>  testData.CREATEROLE["Corporate"]

test.before( async(testController) => {
    await loginUsers.loginBankUserMaker(testController)
})("Create a corporate Admin", async testController => {
   const createdUser = await  userConfiguration.createCorporateAdmin(testController, createdRoles()) 
   testData.corporateAdminUser =  createdUser
   await testController.expect(userConfiguration.roleTypeSelector.innerText).eql(createdUser)
})
import { ClientFunction } from "testcafe"
import UserConfiguration from "../page-objects"
import {loginSuperAdminMaker, loginSuperAdminChecker} from "../../Helpers/hooks"
const { LOGIN_URL } = process.env

const userConfiguration = new UserConfiguration()
     
fixture `Create a user`
.page(LOGIN_URL)

const scroll = ClientFunction(() => window.scrollBy(0, 500))

const userType = [ 
    {name: "Super admin"},
   { name: "Bank"}
]

userType.forEach( dataName => {
test.before(async (testController) => {
    await userConfiguration.createUserIntoActiveDirectory(testController)
    await loginSuperAdminChecker(testController)
})
("Create a user", async(testController) => {
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    await testController.click(userConfiguration.addUserButtonSelector)
    await testController.click(userConfiguration.addUserTypedropdownSelector)
    await testController.click(userConfiguration.dropdownSelector.withText(dataName.name))
    await testController.click(userConfiguration.userDropdownSelector)
    await scroll()
    await testController.click(userConfiguration.userOptionSelector.withText(name.toLowerCase()))

    await testController.click(userConfiguration.roleDropdownSelector)
    const data = Object.keys(testData.CREATED_ROLES).reduce((response, key) => {
        response = testData.CREATED_ROLES[key]
        return response
    }, "")
    await testController.click(userConfiguration.roleOptionSelector.withText(data))
    await testController.typeText(userConfiguration.inputPhoneNumberSelector, "254729530277")
    await testController.click(userConfiguration.saveButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector,name.toLowerCase())
    await userConfiguration.deleteUserFromActiveDirectory(testController)
    
})
})

import UserConfiguration from "../page-objects"
import {loginUsers} from "../../Helpers/hooks"
const { LOGIN_URL } = process.env

const userConfiguration = new UserConfiguration()
     
fixture `Create a user`
.page(LOGIN_URL)

testData.CREATED_USERS = {}

const userType = () => [ 
     {name: "Super admin",  role: testData.CREATED_ROLES['Super Admin']},
     { name: "Bank", role: testData.CREATED_ROLES["Bank Admin"]}
     
   
]

userType().forEach( dataName => {
test.before(async (testController) => {
    global.activeDirectoryName = await userConfiguration.createUserIntoActiveDirectory(testController)
    await loginUsers.loginSuperAdminMaker(testController)
})(`Create a ${dataName.name} user`, async(testController) => {
    const roles = userType().find(r => r.name === dataName.name);
    const user = await userConfiguration.createUser(testController, roles.name, roles.role, global.activeDirectoryName)
    testData.CREATED_USERS[dataName.name] = user
    await testController.expect(userConfiguration.userSelectorText.innerText).eql(user)
    await testController.expect(userConfiguration.statusSelector.innerText).eql("PENDING")
    await userConfiguration.deleteUserFromActiveDirectory(testController, global.activeDirectoryName)   
})
})

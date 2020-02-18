import UserConfiguration from "../page-objects"
import {loginUsers} from "../../Helpers/hooks"
import { RequestMock } from "testcafe";


const userConfiguration  = new UserConfiguration()
fixture `Reject user`

const userType = () => [ 
    {name: "Super admin",  role: testData.CREATED_ROLES['Super Admin']},
    { name: "Bank", role: testData.CREATED_ROLES["Bank User"]} 

]

userType().forEach(dataName => {
    var randomName  = userConfiguration.generateRandomName(dataName.name)
    var mock = RequestMock()
    .onRequestTo('http://192.168.204.30:8082/imb-uat/api/ldap-users?size=100')
    .respond({"data":[{"accountName":`${randomName}`,"firstName":"testuser","lastName":"testUser","email":"testuser@email.com"}]}, 
    200, {
        'access-control-allow-credentials': true,
        'access-control-allow-origin': 'http://192.168.204.21:8484'
    })

test.requestHooks(mock)
.before( async(testController) => {
   
    const roles = userType().find(r => r.name === dataName.name);
    await loginUsers.loginSuperAdminMaker(testController)
    const rejectUser = await  userConfiguration.createUser(testController, roles.name, roles.role, randomName)
    testData.REJECT_USERS = rejectUser
})
(`Reject PENDING ${dataName.name} user`, async(testController) => {
    await loginUsers.loginSuperAdminChecker(testController)
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.REJECT_USERS)
    await testController.wait(1000)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.rejectButtonSelector)
    await testController.click(userConfiguration.yesButtonSelector)
    await testController.typeText(userConfiguration.rejectuserSelector,"Testing Rejection")
    await testController.click(userConfiguration.rejectButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector,  testData.REJECT_USERS, {replace: true})
    await testController.wait(500)
})

})

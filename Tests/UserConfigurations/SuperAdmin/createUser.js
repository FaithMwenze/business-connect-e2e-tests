import UserConfiguration from "../page-objects"
import {loginUsers} from "../../Helpers/hooks"
import { RequestMock } from "testcafe";


const userConfiguration = new UserConfiguration()
     
fixture `Create a user`

testData.CREATED_USERS = {}

const userType = () => [ 
     {name: "Super admin",  role: testData.CREATED_ROLES['Super Admin']},
     { name: "Bank", role: testData.CREATED_ROLES["Bank User"]} 
 
]


userType().forEach( dataName => {
    var randomName  = userConfiguration.generateRandomName(dataName.name)
    var mock = RequestMock()
        .onRequestTo('http://192.168.204.30:8082/imb-uat/api/ldap-users?size=100')
        .respond({"data":[{"accountName":`${randomName}`,"firstName":"testuser","lastName":"testUser","email":"testuser@email.com"}]}, 
        200, {
            'access-control-allow-credentials': true,
            'access-control-allow-origin': 'http://192.168.204.21:8484'
        })
test.requestHooks(mock)
.before(async (testController) => {
    await loginUsers.loginSuperAdminMaker(testController) 
})
(`Create a ${dataName.name} user`, async(testController) => {
    const roles = userType().find(r => r.name === dataName.name);
    const user = await userConfiguration.createUser(testController, roles.name, roles.role, randomName)
    testData.CREATED_USERS[dataName.name] = user
    await testController.typeText(userConfiguration.searchUsernameSelector, randomName, {replace: true})
    await testController.expect(userConfiguration.userSelectorText.innerText).eql(user)
    await testController.wait(2000)
    await testController.expect(userConfiguration.statusSelector.innerText).eql("PENDING")

})
test.before(loginUsers.loginSuperAdminChecker)
(`Approve a ${dataName.name} user`, async (testController) => {
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    const createdUser = testData.CREATED_USERS[dataName.name]
    await testController.typeText(userConfiguration.searchUsernameSelector, createdUser )
    await testController.wait(1000)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.approveButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, createdUser, {replace: true})
    await testController.wait(2000)
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
})
test.before(async(testController) => { await loginUsers.loginSuperAdminMaker(testController)})
(`edit an approved ${dataName.name} user`, async(testController, ) => {
    await userConfiguration.editUser(testController, testData.CREATED_USERS[dataName.name])
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.CREATED_USERS[dataName.name], {replace: true})
    await testController.expect(userConfiguration.statusSelector.innerText).eql('PENDING_EDIT')
})
test.before(loginUsers.loginSuperAdminChecker)
(`Approve PENDING_EDIT ${dataName.name} user`, async(testController)  => {
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    const pendingEditUser =  testData.CREATED_USERS[dataName.name]
    await testController.typeText(userConfiguration.searchUsernameSelector, pendingEditUser)
    await testController.wait(500)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.approveButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, pendingEditUser, {replace: true})
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')
})
test.before( async (testController) => {
    await loginUsers.loginSuperAdminMaker(testController)
    await userConfiguration.editUser(testController, testData.CREATED_USERS[dataName.name])
}) 
(`Reject PENDING EDIT ${dataName.name} user`, async(testController) => {
    await loginUsers.loginSuperAdminChecker(testController)
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.CREATED_USERS[dataName.name])
    await testController.wait(500)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.rejectButtonSelector)
    await testController.click(userConfiguration.yesButtonSelector)
    await testController.typeText(userConfiguration.rejectuserSelector, 'Testing Rejection')
    await testController.click(userConfiguration.rejectButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, testData.CREATED_USERS[dataName.name], {replace: true})
    await testController.expect(userConfiguration.statusSelector.innerText).eql('APPROVED')

})
})


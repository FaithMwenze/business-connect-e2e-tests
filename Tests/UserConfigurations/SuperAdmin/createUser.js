import UserConfiguration from "../page-objects"
import {loginUsers} from "../../Helpers/hooks"
import { AsyncResource } from "async_hooks";
const { LOGIN_URL } = process.env

const userConfiguration = new UserConfiguration()
     
fixture `Create a user`

testData.CREATED_USERS = {}

const userType = () => [ 
     {name: "Super admin",  role: testData.CREATED_ROLES['Super Admin']},
     { name: "Bank", role: testData.CREATED_ROLES["Bank"]}
     
   
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
test.before(loginUsers.loginSuperAdminChecker)
(`Approve a ${dataName.name} user`, async (testController) => {
    await testController.click(userConfiguration.userConfigurationNavBarSelector)
    const createdUser = testData.CREATED_USERS[dataName.name]
    await testController.typeText(userConfiguration.searchUsernameSelector, createdUser )
    await testController.wait(1000)
    await testController.click(userConfiguration.editButtonSelector)
    await testController.click(userConfiguration.approveButtonSelector)
    await testController.typeText(userConfiguration.searchUsernameSelector, createdUser, {replace: true})
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

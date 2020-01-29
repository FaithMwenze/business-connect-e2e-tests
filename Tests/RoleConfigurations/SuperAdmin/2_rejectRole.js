import { loginUsers } from "../../Helpers/hooks"
import Roles from "../page-objects"


const { LOGIN_URL } = process.env

const roles = new Roles()
fixture `Super Admin Reject Role Module`
	.page(LOGIN_URL)

const roleNameSet = [
	{name: "Super Admin"},
	{name: "Bank Admin"},
	{name: "Bank"}
]

testData.CREATE_TO_REJECT = {}
roleNameSet.forEach( data => {
	test.before(async (testController) => {
		await loginUsers.loginSuperAdminMaker(testController)
		const role = await roles.createRole(testController, data.name)
		testData.CREATE_TO_REJECT[data.name] = role
		
	})
	(`Reject ${data.name} role whose status is PENDING`, async (testController) => {
		await loginUsers.loginSuperAdminChecker(testController)
		await testController.click(roles.roleConfigurationNavBarSelector)
		await testController.typeText(roles.searchRoleSelector, testData.CREATE_TO_REJECT[data.name])
		await testController.wait(1000)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.rejectButtonSelector)
		await testController.click(roles.yesButtonSelector)
		await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
		await testController.click(roles.rejectButtonSelector)
		await testController.typeText(roles.searchRoleSelector,  testData.CREATE_TO_REJECT[data.name], {replace: true})
		await testController.wait(10000)
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('REJECTED')
	})

})
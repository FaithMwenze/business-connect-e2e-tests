import {loginUsers } from "../../Helpers/hooks"
import Roles from "../page-objects"


const { DASHBOARD_URL, LOGIN_URL } = process.env
const roles = new Roles();

fixture `Super Admin Create Role module`
	.page(LOGIN_URL)

const roleNameSet = [
	{name: "Super Admin", type: "SUPER_ADMIN" },
	{name: "Bank Admin", type:"Bank" },
	{name: "Bank User", type:"Bank"}
]
 
testData.CREATED_ROLES = {};
test.before(loginUsers.loginSuperAdminMaker)
("Login into business connect", async testController => {
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)	
});
roleNameSet.forEach( data => {
	test.before(loginUsers.loginSuperAdminMaker)
	(`Create ${data.name} Role`, async (testController) => {
		const createdRoleName = await roles.createRole(testController, data.name )
		testData.CREATED_ROLES[data.name] = createdRoleName;
		await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
		await testController.expect(roles.roleTypeSelector.innerText).eql(data.type)
		await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")	
	})

	test.before(loginUsers.loginSuperAdminChecker)
	(`Approve a  ${data.name} role whose status is PENDING`, async (testController) => {
		await testController.click(roles.roleConfigurationNavBarSelector)
		await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name])
		await testController.wait(1000)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.approveButtonSelector)
		await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name], {replace: true})
		await testController.wait(10000)
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('APPROVED')
	})

	// test.before(loginUsers.loginSuperAdminMaker)
	// (`Edit  ${data.name} role successfully`, async (testController) => {
	// 	await roles.editRole(testController, testData.CREATED_ROLES[data.name])
	// 	await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name], {replace: true})
	// 	await testController.wait(10000)
	// 	const currentStatus = await roles.roleStatusSelector.innerText
	// 	await testController.expect(currentStatus).eql('PENDING_EDIT')
		

	// })

	// test.before(loginUsers.loginSuperAdminChecker)
	// (`Approve PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
	// 	await testController.click(roles.roleConfigurationNavBarSelector)
	// 	await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name])
	// 	await testController.wait(1000)
	// 	await testController.click(roles.editButtonSelector)
	// 	await testController.click(roles.approveButtonSelector)
	// 	await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name], {replace: true})
	// 	await testController.wait(10000)
	// 	const currentStatus = await roles.roleStatusSelector.innerText
	// 	await testController.expect(currentStatus).eql('APPROVED')
	// })

	// test.before(async(testController) => {
	// 	await loginUsers.loginSuperAdminMaker(testController)
	// 	await roles.editRole(testController, testData.CREATED_ROLES[data.name] )
	// 	await roles.logout(testController)
	// } )
	// (`Reject PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
	// 	await loginUsers.loginSuperAdminChecker(testController)
	// 	await testController.click(roles.roleConfigurationNavBarSelector)
	// 	await testController.typeText(roles.searchRoleSelector,testData.CREATED_ROLES[data.name])
	// 	await testController.wait(1000)
	// 	await testController.click(roles.editButtonSelector)
	// 	await testController.click(roles.rejectButtonSelector)
	// 	await testController.click(roles.yesButtonSelector)
	// 	await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
	// 	await testController.click(roles.rejectButtonSelector)
	// 	await testController.typeText(roles.searchRoleSelector, testData.CREATED_ROLES[data.name], {replace: true})
	//     await testController.wait(10000)
	// 	const currentStatus = await roles.roleStatusSelector.innerText
	// 	await testController.expect(currentStatus).eql('APPROVED')
	// })

})


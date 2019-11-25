import Corporate from "./page-object"
import {loginUsers} from "../../Helpers/hooks"
const { LOGIN_URL }= process.env 

const corporate = new Corporate();


fixture ` Corporate Admin Create Role`
	.page(LOGIN_URL)

testData.CREATE_CORPORATE_USER_ROLE = {}
test.before(loginUsers.loginCorporateAdminMaker)
("Create corporate User role", async (testController) => { 
	const createdRoleName= await corporate.createCorporateUserRole(testController)
	testData.CREATE_CORPORATE_USER_ROLE = createdRoleName  
	await testController.expect(corporate.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(corporate.roleTypeSelector.innerText).eql("Corporate")
	await testController.expect(corporate.roleStatusSelector.innerText).eql("PENDING")	
})

test.before(loginUsers.loginCorporateAdminChecker)
("Approve a corporate Role whose status is PENDING", async (testController) => {
	await testController.click(corporate.roleConfigurationNavBarSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE)
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.approveButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE, {replace: true})
	await testController.wait(5000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(loginUsers.loginCorporateAdminMaker)
("Edit  corporate role  successfully", async (testController) => {
	await corporate.editRole(testController, testData.CREATE_CORPORATE_USER_ROLE)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE, {replace: true})
	await testController.wait(5000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('PENDING_EDIT')

})

test.before(loginUsers.loginCorporateAdminChecker)
("Approve PENDING_EDIT  corporate role role successfully", async (testController) => {
	await testController.click(corporate.roleConfigurationNavBarSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE)
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.approveButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE, {replace: true})
	await testController.wait(5000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(async(testController) => {
	await loginUsers.loginCorporateAdminMaker(testController)
	await corporate.editRole(testController, testData.CREATE_CORPORATE_USER_ROLE)
} )
("Reject PENDING_EDIT  corporate role role successfully", async (testController) => {
	await loginUsers.loginCorporateAdminChecker(testController)
	await testController.click(corporate.roleConfigurationNavBarSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_USER_ROLE)
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.rejectButtonSelector)
	await testController.click(corporate.yesButtonSelector)
	await testController.typeText(corporate.inputRejectSelector,"Testing Rejection")
	await testController.click(corporate.rejectButtonSelector)
	await testController.typeText(corporate.searchRoleSelector,testData.CREATE_CORPORATE_USER_ROLE, {replace: true})
	await testController.wait(5000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})


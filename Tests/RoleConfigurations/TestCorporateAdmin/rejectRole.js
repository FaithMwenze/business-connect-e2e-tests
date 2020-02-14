import { loginUsers } from "../../Helpers/hooks"
import Corporate from "./page-object";

const { LOGIN_URL } = process.env

const corporate = new Corporate()
fixture `Corporate Admin Reject Role Module`


test.before(async (testController) => {
	await loginUsers.loginCorporateAdminMaker(testController)
	const createName = await corporate.createCorporateUserRole(testController)
	testData.CREATE_CORPORATE_REJECT_ROLE = createName
})
("Reject corporate role  whose status is PENDING", async (testController) => {
	await loginUsers.loginCorporateAdminChecker(testController)
	await testController.click(corporate.roleConfigurationNavBarSelector)
	await testController.typeText(corporate.searchRoleSelector,testData.CREATE_CORPORATE_REJECT_ROLE )
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.rejectButtonSelector)
	await testController.click(corporate.yesButtonSelector)
	await testController.typeText(corporate.inputRejectSelector,"Testing Rejection")
	await testController.click(corporate.rejectButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, testData.CREATE_CORPORATE_REJECT_ROLE, {replace: true})
	await testController.wait(10000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('REJECTED')
})
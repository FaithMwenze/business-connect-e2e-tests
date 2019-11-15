import { loginCorporateAdminChecker,loginCorporateAdminMaker } from "../../Helpers/hooks"
import fs from 'fs';
import path from 'path'
import Corporate from "./page-object";

const { LOGIN_URL } = process.env

const corporate = new Corporate()
fixture `Corporate Admin Reject Role Module`
	.page(LOGIN_URL)


test.before(async (testController) => {
	await loginCorporateAdminMaker(testController)
	await corporate.createCorporateUserRole(testController)
	await corporate.logout(testController)
})
("Reject corporate role role whose status is PENDING", async (testController) => {
	await loginCorporateAdminChecker(testController)
	await testController.click(corporate.roleConfigurationNavBarSelector)
	const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(corporate.searchRoleSelector, storedData.username)
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.rejectButtonSelector)
	await testController.click(corporate.yesButtonSelector)
	await testController.typeText(corporate.inputRejectSelector,"Testing Rejection")
	await testController.click(corporate.rejectButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, storedData.username, {replace: true})
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('REJECTED')
})
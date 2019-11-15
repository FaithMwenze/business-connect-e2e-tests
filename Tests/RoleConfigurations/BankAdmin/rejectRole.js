import { loginBankAdminMaker,loginBankAdminChecker } from "../../Helpers/hooks"
import Roles from "../page-objects"
import fs from 'fs';
import path from 'path'

const { LOGIN_URL } = process.env

const roles = new Roles()
fixture `Bank Admin Reject Role Module`
	.page(LOGIN_URL)

const roleNameSet = [
	{name: "Corporate"},
	{name: "Bank"}
]

roleNameSet.forEach( data => {
	test.before(async (testController) => {
		await loginBankAdminMaker(testController)
		await roles.createRole(testController, data.name)
		await roles.logout(testController)
	})
	(`Reject ${data.name} role whose status is PENDING`, async (testController) => {
		await loginBankAdminChecker(testController)
		await testController.click(roles.roleConfigurationNavBarSelector)
		const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
		await testController.typeText(roles.searchRoleSelector, storedData.username)
		await testController.wait(1000)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.rejectButtonSelector)
		await testController.click(roles.yesButtonSelector)
		await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
		await testController.click(roles.rejectButtonSelector)
		await testController.typeText(roles.searchRoleSelector, storedData.username, {replace: true})
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('REJECTED')
	})

})
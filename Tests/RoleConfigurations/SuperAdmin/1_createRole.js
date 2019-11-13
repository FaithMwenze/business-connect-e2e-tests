import { loginSuperAdminMaker,loginSuperAdminChecker } from "../../Helpers/hooks"
import Roles from "../page-objects"
import Pages from "../../page-objects"
import fs from 'fs';
import path from 'path';

const { DASHBOARD_URL, LOGIN_URL } = process.env
const roles = Roles;
const pages = Pages;

fixture `Super Admin Create Role module`
	.page(LOGIN_URL)

const roleNameSet = [
	{name: "Super Admin", type: "SUPER_ADMIN" },
	{name: "Bank Admin", type:"Bank" },
	{name: "Bank User", type:"Bank"}
]

test.before(loginSuperAdminMaker)
("Login into business connect", async testController => {
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)
});
roleNameSet.forEach( data => {
	test.before(loginSuperAdminMaker)
	(`Create ${data.name} Role`, async (testController) => {
		const createdRoleName = await roles.createRole(testController, data.name )
		await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
		await testController.expect(roles.roleTypeSelector.innerText).eql(data.type)
		await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")	
	})

	test.before(loginSuperAdminChecker)
	(`Approve a  ${data.name} role whose status is PENDING`, async (testController) => {
		await testController.click(roles.roleConfigurationNavBarSelector)
		const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
		await testController.typeText(roles.searchRoleSelector, storedData.username)
		await testController.wait(1000)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.approveButtonSelector)
		await testController.typeText(roles.searchRoleSelector, storedData.username, {replace: true})
		await testController.wait(1000)
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('APPROVED')
	})

	test.before(loginSuperAdminMaker)
	(`Edit  ${data.name} role successfully`, async (testController) => {
		await roles.editRole(testController)
		const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
		await testController.typeText(roles.searchRoleSelector, storedData.username, {replace: true})
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('PENDING_EDIT')

	})

	test.before(loginSuperAdminChecker)
	(`Approve PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
		await testController.click(roles.roleConfigurationNavBarSelector)
		const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
		await testController.typeText(roles.searchRoleSelector, storedData.username)
		await testController.wait(500)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.approveButtonSelector)
		await testController.typeText(roles.searchRoleSelector, storedData.username, {replace: true})
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('APPROVED')
	})

	test.before(async(testController) => {
		await loginSuperAdminMaker(testController)
		await roles.editRole(testController)
		await pages.logout(testController)
	} )
	(`Reject PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
		await loginSuperAdminChecker(testController)
		await testController.click(roles.roleConfigurationNavBarSelector)
		const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
		await testController.typeText(roles.searchRoleSelector, storedData.username)
		await testController.wait(500)
		await testController.click(roles.editButtonSelector)
		await testController.click(roles.rejectButtonSelector)
		await testController.click(roles.yesButtonSelector)
		await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
		await testController.click(roles.rejectButtonSelector)
		await testController.typeText(roles.searchRoleSelector, storedData.username, {replace: true})
		const currentStatus = await roles.roleStatusSelector.innerText
		await testController.expect(currentStatus).eql('APPROVED')
	})

})


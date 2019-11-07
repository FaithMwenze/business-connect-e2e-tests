import loginHooks from "../../Helpers/hooks"
import Roles from "../page-objects"

const { DASHBOARD_URL, LOGIN_URL } = process.env
const roles = Roles;



fixture `Super Admin Role module`
	.page(LOGIN_URL)
	.beforeEach(loginHooks);


test("Login into business connect", async testController => {
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)
});

test("Create superAdmin Role", async (testController) => {
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.click(roles.addRoleButtonSelector)
	await testController.click(roles.userDropdownSelector)
	await testController.click(roles.dropdownSelector.withText("Super Admin"))
	const roleName = await roles.saveRandomName();
	await testController.typeText(roles.roleNameSelector, roleName)
	await roles.checkPrivileges(testController)
	await testController.click(roles.saveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, roleName)
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(roleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("SUPER_ADMIN")
	
})


test("create Bank Admin Role", async(testController) => {
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.click(roles.addRoleButtonSelector)
	await testController.click(roles.userDropdownSelector)
	await testController.click(roles.dropdownSelector.withText("Bank Admin"))
	const roleName = await roles.saveRandomName(testController);
	await testController.typeText(roles.roleNameSelector, roleName)	
	await roles.checkPrivileges(testController)
	await testController.click(roles.saveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, roleName)
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(roleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
})

test("create Bank User Role", async(testController) => {
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.click(roles.addRoleButtonSelector)
	await testController.click(roles.userDropdownSelector)
	await testController.click(roles.dropdownSelector.withText("Bank User"))
	const roleName = await roles.saveRandomName(testController);
	await testController.typeText(roles.roleNameSelector, roleName)	
	await roles.checkPrivileges(testController)
	await testController.click(roles.saveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, roleName)
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(roleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
})














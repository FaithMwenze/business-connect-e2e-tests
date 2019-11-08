import { loginSuperAdminMaker } from "../../Helpers/hooks"
import Roles from "../page-objects"

const { DASHBOARD_URL, LOGIN_URL } = process.env
const roles = Roles;



fixture `Super Admin Role module`
	.page(LOGIN_URL)
	.beforeEach(loginSuperAdminMaker);


test("Login into business connect", async testController => {
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)
});

test("Create superAdmin Role", async (testController) => {
	const createdRoleName = await roles.createRole(testController, "Super Admin" )
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("SUPER_ADMIN")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")

	
})


test("create Bank Admin Role", async(testController) => {
	const createdRoleName = await roles.createRole(testController, "Bank Admin")
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")
})

test("create Bank User Role", async(testController) => {
	const createdRoleName = await roles.createRole(testController, "Bank User")
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")
})

import {loginSuperAdminChecker} from "../../Helpers/hooks"
import Roles from "../page-objects"
import fs from "fs"

const { LOGIN_URL } = process.env
const roles = Roles;


fixture `Super Admin Approve module`
	.page(LOGIN_URL)
    .beforeEach(loginSuperAdminChecker);
    

test("Approve a role whose status is PENDING", async (testController) => {
    await testController.click(roles.roleConfigurationNavBarSelector)
    await testController.typeText(roles.searchRoleSelector, await roles.saveRandomName())
    await testController.click(roles.editButtonSelector)
    await testController.click(roles.approveButtonSelector)
    await testController.typeText(roles.searchRoleSelector, await roles.saveRandomName(testController))
    const currentStatus = await roles.roleStatusSelector.innerText
    await testController.expect(currentStatus).eql('APPROVED')
})

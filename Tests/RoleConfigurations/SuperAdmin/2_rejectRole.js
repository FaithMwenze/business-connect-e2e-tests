import { loginSuperAdminMaker,loginSuperAdminChecker } from "../../Helpers/hooks"
import Roles from "../page-objects"
import Pages from "../../page-objects"
import fs from 'fs';
import path from 'path';
import { removeAllListeners } from "cluster";

const { LOGIN_URL } = process.env

const roles = Roles
const pages = Pages;
fixture `Super Admin Reject Role Module`
.page(LOGIN_URL)

test.before(async (testController) => {
    await loginSuperAdminMaker(testController)
    await roles.createRole(testController, 'Super Admin')
    await pages.logout(testController)
})
("Reject super Admin role whose status is PENDING", async (testController) => {
    await loginSuperAdminChecker(testController)
    await testController.click(roles.roleConfigurationNavBarSelector)
    const { data } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(roles.searchRoleSelector, data.username)
	await testController.wait(1000)
	await testController.click(roles.editButtonSelector)
    await testController.click(roles.rejectButtonSelector)
    await testController.click(roles.yesButtonSelector)
    await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
    await testController.click(roles.rejectButtonSelector)
	await testController.typeText(roles.searchRoleSelector, data.username, {replace: true})
	const currentStatus = await roles.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('REJECTED')
})


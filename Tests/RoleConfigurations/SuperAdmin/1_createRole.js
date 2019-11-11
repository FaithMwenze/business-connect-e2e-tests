import { loginSuperAdminMaker,loginSuperAdminChecker } from "../../Helpers/hooks"
import Roles from "../page-objects"
import fs from 'fs';
import path from 'path';

const { DASHBOARD_URL, LOGIN_URL } = process.env
const roles = Roles;

fixture `Super Admin Role module`
	.page(LOGIN_URL)

test.before(loginSuperAdminMaker)
("Login into business connect", async testController => {
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)
});

test.before(loginSuperAdminMaker)
("Create superAdmin Role", async (testController) => {
	const createdRoleName = await roles.createRole(testController, "Super Admin" )
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("SUPER_ADMIN")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")	
})

test.before(loginSuperAdminChecker)
("Approve a super Admin role whose status is PENDING", async (testController) => {
    await testController.click(roles.roleConfigurationNavBarSelector)
	const { data } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
    await testController.typeText(roles.searchRoleSelector, data.username)
    await testController.wait(1000)
    await testController.click(roles.editButtonSelector)
	await testController.click(roles.approveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, data.username, {replace: true})
    const currentStatus = await roles.roleStatusSelector.innerText
    await testController.expect(currentStatus).eql('APPROVED')
})


test.before(loginSuperAdminMaker)
("create Bank Admin Role", async(testController) => {
	const createdRoleName = await roles.createRole(testController, "Bank Admin")
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")
})

test.before(loginSuperAdminChecker)
("Approve a Bank Admin role whose status is PENDING", async (testController) => {
    await testController.click(roles.roleConfigurationNavBarSelector)
	const { data } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
    await testController.typeText(roles.searchRoleSelector, data.username)
    await testController.wait(1000)
    await testController.click(roles.editButtonSelector)
	await testController.click(roles.approveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, data.username, {replace: true})
    const currentStatus = await roles.roleStatusSelector.innerText
    await testController.expect(currentStatus).eql('APPROVED')
})

test.before(loginSuperAdminMaker)
("create Bank User Role", async(testController) => {
	const createdRoleName = await roles.createRole(testController, "Bank User")
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql("Bank")
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")
})

test.before(loginSuperAdminChecker)
("Approve a Bank user role whose status is PENDING", async (testController) => {
    await testController.click(roles.roleConfigurationNavBarSelector)
	const { data } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
    await testController.typeText(roles.searchRoleSelector, data.username)
    await testController.wait(1000)
    await testController.click(roles.editButtonSelector)
	await testController.click(roles.approveButtonSelector)
	await testController.typeText(roles.searchRoleSelector, data.username, {replace: true})
    const currentStatus = await roles.roleStatusSelector.innerText
    await testController.expect(currentStatus).eql('APPROVED')
})
import fs from "fs"
import path from "path"
import Corporate from "./page-object"
import {loginCorporateAdminMaker, loginCorporateAdminChecker} from "../../Helpers/hooks"
const { LOGIN_URL }= process.env 

const corporate = new Corporate();


fixture ` Corporate Admin Create Role`
	.page(LOGIN_URL)

test.before(loginCorporateAdminMaker)
("Create corporate User role", async (testController) => { 
	const createdRoleName= await corporate.createCorporateUserRole(testController)  
	await testController.expect(corporate.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(corporate.roleTypeSelector.innerText).eql("Corporate")
	await testController.expect(corporate.roleStatusSelector.innerText).eql("PENDING")	
})

test.before(loginCorporateAdminChecker)
("Approve a corporate Role role whose status is PENDING", async (testController) => {
	await testController.click(corporate.roleConfigurationNavBarSelector)
	const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(corporate.searchRoleSelector, storedData.username)
	await testController.wait(1000)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.approveButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, storedData.username, {replace: true})
	await testController.wait(1000)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(loginCorporateAdminMaker)
("Edit  corporate role role successfully", async (testController) => {
	await corporate.editRole(testController)
	const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(corporate.searchRoleSelector, storedData.username, {replace: true})
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('PENDING_EDIT')

})

test.before(loginCorporateAdminChecker)
("Approve PENDING_EDIT  corporate role role successfully", async (testController) => {
	await testController.click(corporate.roleConfigurationNavBarSelector)
	const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(corporate.searchRoleSelector, storedData.username)
	await testController.wait(500)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.approveButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, storedData.username, {replace: true})
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(async(testController) => {
	await loginCorporateAdminMaker(testController)
	await corporate.editRole(testController)
	await corporate.logout(testController)
} )
("Reject PENDING_EDIT  corporate role role successfully", async (testController) => {
	await loginCorporateAdminChecker(testController)
	await testController.click(corporate.roleConfigurationNavBarSelector)
	const { storedData } = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data.json")));
	await testController.typeText(corporate.searchRoleSelector, storedData.username)
	await testController.wait(500)
	await testController.click(corporate.editButtonSelector)
	await testController.click(corporate.rejectButtonSelector)
	await testController.click(corporate.yesButtonSelector)
	await testController.typeText(corporate.inputRejectSelector,"Testing Rejection")
	await testController.click(corporate.rejectButtonSelector)
	await testController.typeText(corporate.searchRoleSelector, storedData.username, {replace: true})
	await testController.wait(500)
	const currentStatus = await corporate.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})


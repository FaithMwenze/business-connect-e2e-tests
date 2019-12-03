import Roles from "../page-objects"
import {loginBankAdminMaker, loginBankAdminChecker} from "../../Helpers/hooks"
const { LOGIN_URL }= process.env 

const roles = new Roles();

fixture ` Bank Admin Create Role`
	.page(LOGIN_URL)

const roleNameSet = [
	{name: "Corporate", type: "Corporate" },
	{name: "Bank", type:"Bank" }
]

testData.CREATEROLE = {}

roleNameSet.forEach( data => {
	test.before(loginBankAdminMaker)
(`Create ${data.name} role`, async (testController) => {
	const createdRoleName = await roles.createRole(testController, data.name)
	testData.CREATEROLE[data.name] = createdRoleName;
	await testController.expect(roles.createdRoleNameSelector.innerText).eql(createdRoleName)
	await testController.expect(roles.roleTypeSelector.innerText).eql(data.type)
	await testController.expect(roles.roleStatusSelector.innerText).eql("PENDING")	
})
test.before(loginBankAdminChecker)
(`Approve a  ${data.name} role whose status is PENDING`, async (testController) => {
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.typeText(roles.searchRoleSelector, testData.CREATEROLE[data.name])
	await testController.wait(1000)
	await testController.click(roles.editButtonSelector)
	await testController.click(roles.approveButtonSelector)
	await testController.typeText(roles.searchRoleSelector,  testData.CREATEROLE[data.name], {replace: true})
	await testController.wait(10000)
	const currentStatus = await roles.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(loginBankAdminMaker)
(`Edit  ${data.name} role successfully`, async (testController) => {
	await roles.editRole(testController,  testData.CREATEROLE[data.name])
	await testController.typeText(roles.searchRoleSelector,  testData.CREATEROLE[data.name], {replace: true})
	await testController.wait(10000)
	const currentStatus = await roles.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('PENDING_EDIT')

})

test.before(loginBankAdminChecker)
(`Approve PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.typeText(roles.searchRoleSelector, testData.CREATEROLE[data.name])
	await testController.wait(1000)
	await testController.click(roles.editButtonSelector)
	await testController.click(roles.approveButtonSelector)
	await testController.typeText(roles.searchRoleSelector,  testData.CREATEROLE[data.name], {replace: true})
	await testController.wait(10000)
	const currentStatus = await roles.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})

test.before(async(testController) => {
	await loginBankAdminMaker(testController)
	await roles.editRole(testController,  testData.CREATEROLE[data.name])
} )
(`Reject PENDING_EDIT  ${data.name} role successfully`, async (testController) => {
	await loginBankAdminChecker(testController)
	await testController.click(roles.roleConfigurationNavBarSelector)
	await testController.typeText(roles.searchRoleSelector,  testData.CREATEROLE[data.name])
	await testController.wait(1000)
	await testController.click(roles.editButtonSelector)
	await testController.click(roles.rejectButtonSelector)
	await testController.click(roles.yesButtonSelector)
	await testController.typeText(roles.inputRejectSelector,"Testing Rejection")
	await testController.click(roles.rejectButtonSelector)
	await testController.typeText(roles.searchRoleSelector,  testData.CREATEROLE[data.name], {replace: true})
	await testController.wait(10000)
	const currentStatus = await roles.roleStatusSelector.innerText
	await testController.expect(currentStatus).eql('APPROVED')
})
})

import { Selector } from "testcafe"
import Page from "../page-objects" 
import path from 'path';
  



export default class Roles extends Page {
     
	constructor(){
		super()
		this.roleConfigurationNavBarSelector = Selector("a[href='/bizcon/roles']")
		this.addRoleButtonSelector =  Selector("span").withText("ADD ROLE");
		this.roleNameSelector = Selector("#role-name")
		this.userDropdownSelector = Selector("select[class='form-control']", {visibilityCheck: true})
		this.dropdownSelector = Selector("option", {visibilityCheck: true})
		this.priviledgeSelector = Selector("div").child('.form-check')
		this.saveButtonSelector = Selector("span").withText("SAVE")
		this.searchRoleSelector = Selector("input[placeholder='Enter Role name...']") 
		this.roleTypeSelector = Selector("td[tabindex='1']")
		this.roleStatusSelector = Selector("td[tabindex='3']")
		this.createdRoleNameSelector= Selector("td[tabindex='2']")
		this.searchItemSelector = Selector("tbody tr", {visibilityCheck: true}).nth(1)
		this.editButtonSelector = Selector("span").withText("EDIT")
		this.approveButtonSelector = Selector("span").withText("APPROVE")
		this.rejectButtonSelector = Selector("span").withText("REJECT")
		this.yesButtonSelector = Selector("span").withText("YES")
		this.inputRejectSelector = Selector("input[id='phone']")
		this.editCheckSelector = Selector("div").child(".checkbox")
		this.searchStatusSelector = Selector("input[placeholder ='Enter Status...")
	}

     
    checkPrivileges = async (testController)=>{
    	const countSelector = await this.priviledgeSelector.count
    	for(let i=0; i< Math.min(10, countSelector); i++){
    		await testController.click(this.priviledgeSelector.nth(i))
    	}
    }

	checkEditPriviledges = async (testController) => {
		const countSelectors = await this.editCheckSelector.count
		for(let i=0; i< Math.min(10, countSelectors); i++){
    		await testController.click(this.editCheckSelector.nth(i))
    	}
	}
    createRandomName = async() => {
    	const roleNames = {
    		Bank: 'bankUser_role',
    		Bankadmin: 'bankAdmin_role',
    		SUPER_ADMIN: 'superAdmin_role',
    		Corporate:"corporate_role"
			
    	}
    	const selectedRole = await this.userDropdownSelector.value; 
    	const randomNumber =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    	const randomName = randomNumber.toString();
    	return `${roleNames[selectedRole]}${randomName}`
	}
	
    createRole = async (testController, text) => {
    	await testController.click(this.roleConfigurationNavBarSelector)
    	await testController.click(this.addRoleButtonSelector)
    	await testController.click(this.userDropdownSelector)
    	await testController.click(this.dropdownSelector.withText(text))
    	const roleName = await this.createRandomName();
    	await testController.typeText(this.roleNameSelector, roleName)
    	await this.checkPrivileges(testController)
    	await testController.click(this.saveButtonSelector)
    	await testController.typeText(this.searchRoleSelector, roleName)
    	return roleName
    }
	
    editRole = async (testController, text) => {
    	await testController.click(this.roleConfigurationNavBarSelector)
    	await testController.typeText(this.searchRoleSelector, text)
    	await testController.wait(500)
    	await testController.click(this.editButtonSelector)
    	await this.checkEditPriviledges(testController)
    	await testController.click(this.editButtonSelector)
    }
}



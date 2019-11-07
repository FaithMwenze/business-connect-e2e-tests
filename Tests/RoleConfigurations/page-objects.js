import { Selector } from "testcafe"
import { ClientFunction } from "testcafe"

class Roles {
     
	constructor(){
		this.roleConfigurationNavBarSelector = Selector("a[href='/bizcon/roles']")
		this.addRoleButtonSelector =  Selector("span").withText("ADD ROLE");
		this.roleNameSelector = Selector("#role-name")
		this.userDropdownSelector = Selector("select[class='form-control']", {visibilityCheck: true})
		this.dropdownSelector = Selector("option")
		this.priviledgeSelector = Selector("div").child('.form-check')
		this.saveButtonSelector = Selector("span").withText("SAVE")
		this.searchRoleSelector = Selector("input[placeholder='Enter Role name...']") 
		this.roleTypeSelector = Selector("td[tabindex='1']")
		this.createdRoleNameSelector= Selector("td[tabindex='2']")
		this.searchItemSelector = Selector("tbody tr", {visibilityCheck: true}).nth(1)
	}
     
  
     
    checkPrivileges = async (testController)=>{
    	const countSelector = await this.priviledgeSelector.count
    	for(let i=0; i< Math.min(10, countSelector); i++){
    		await testController.click(this.priviledgeSelector.nth(i))
    	}
    }

    createRandomName = async() => {
    	const roleNames = {
    		Bank: 'bankUser_role',
    		Bankadmin: 'bankAdmin_role',
    		SUPER_ADMIN: 'superAdmin_role'
    	}
    	const selectedRole = await this.userDropdownSelector.value; 
    	const randomNumber =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    	const randomName = randomNumber.toString()
    	return `${roleNames[selectedRole]}${randomName}`
    }

    saveRandomName = async () => {
    	const randomName = await this.createRandomName();
    	await ClientFunction(() => window.sessionStorage.setItem("randomName", createRandom), {
    		dependencies: {
    			createRandom: randomName
    		}
    	})();
    	const retrieveName = await ClientFunction(() => window.sessionStorage.getItem("randomName"))();
    	return retrieveName
    }
}

export default new Roles()


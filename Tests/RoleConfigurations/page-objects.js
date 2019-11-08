import { Selector } from "testcafe"
import { ClientFunction } from "testcafe"
import fs from "fs"

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
        this.roleStatusSelector = Selector("td[tabindex='3']")
		this.createdRoleNameSelector= Selector("td[tabindex='2']")
        this.searchItemSelector = Selector("tbody tr", {visibilityCheck: true}).nth(1)
        this.editButtonSelector = Selector("button[title='update role']")
        this.approveButtonSelector = Selector("span").withText("APPROVE")
        this.searchStatusSelector = Selector("input[placeholder ='Enter Status...")
    }

    userObject = {};
     
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
        const randomName = randomNumber.toString();
    	return `${roleNames[selectedRole]}${randomName}`
    }

    saveRandomName = async () => {
        const saveName = await this.createRandomName();
        this.userObject["username"]= saveName;
        this.userObject["status"] = "PENDING"

        const savedObject = JSON.stringify(this.userObject)
        fs.readFile("data.json", function(err){
            if (err) throw err
            return savedObject
        })
        fs.writeFile("data.json", savedObject,  function (err) {
            if(err) throw err  
            return this.userObject  
            
        } )
        
        return this.userObject.username
        
    }


    createRole = async (testController, text) => {
        await testController.click(this.roleConfigurationNavBarSelector)
        await testController.click(this.addRoleButtonSelector)
        await testController.click(this.userDropdownSelector)
        await testController.click(this.dropdownSelector.withText(text))
        const roleName = await this.saveRandomName();
        await testController.typeText(this.roleNameSelector, roleName)
        await this.checkPrivileges(testController)
        await testController.click(this.saveButtonSelector)
        await testController.typeText(this.searchRoleSelector, roleName)
        return roleName
    }
    
}

export default new Roles()


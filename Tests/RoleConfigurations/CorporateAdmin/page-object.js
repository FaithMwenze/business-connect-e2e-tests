import Role from "../page-objects"
import fs from "fs"

export default class Corporate extends Role {
	constructor(){
	   super()
	}

        createCorporateRandomName = async() => { 
        	const randomNumber =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        	const randomName = randomNumber.toString();
        	return `corporateUser_role${randomName}`
        }

        saveCorporateRandomName = async () => {
			const saveName = await this.createCorporateRandomName();
        	this.userObject["username"]= saveName;
        	this.userObject["status"] = "PENDING"
        	const name = {
        		storedData: this.userObject
        	}
        	const savedObject = JSON.stringify(name)
    
        	fs.writeFileSync("data.json", savedObject, {"flags": "w+"}, function (err) {
        		if(err) throw err  
        		return this.userObject  
                
        	} )
            
        	return this.userObject.username
            
        }
           
     async createCorporateUserRole (testController){
        	await testController.click(this.roleConfigurationNavBarSelector)
        	await testController.click(this.addRoleButtonSelector)
			const roleName = await this.saveCorporateRandomName()
			await testController.typeText(this.roleNameSelector, roleName)
        	await this.checkPrivileges(testController)
        	await testController.click(this.saveButtonSelector)
			await testController.typeText(this.searchRoleSelector, roleName)
			return roleName
        }

}

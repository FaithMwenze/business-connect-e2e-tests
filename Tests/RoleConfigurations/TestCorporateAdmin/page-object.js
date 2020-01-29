import Role from "../page-objects"


export default class Corporate extends Role {
	constructor(){
	   super()
	}

        createCorporateRandomName = () => { 
        	const randomNumber =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        	const randomName = randomNumber.toString();
        	return `corporateUser_role${randomName}`
        }

           
        async createCorporateUserRole (testController){
        	await testController.click(this.roleConfigurationNavBarSelector)
        	await testController.click(this.addRoleButtonSelector)
        	const roleName = this.createCorporateRandomName()
        	await testController.typeText(this.roleNameSelector, roleName)
        	await this.checkPrivileges(testController)
        	await testController.click(this.saveButtonSelector)
        	await testController.typeText(this.searchRoleSelector, roleName)
        	return roleName
        }

}

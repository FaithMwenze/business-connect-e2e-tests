import {Selector} from "testcafe"
import faker from 'faker'
import Roles from "../RoleConfigurations/page-objects"
 const { KEYCLOAK_USERNAME,
   KEYCLOAK_PASSWORD, KEYCLOAK_URL} = process.env

global.name = faker.name.firstName()
global.email = faker.internet.email()
export default class UserConfiguration extends Roles {
     constructor(){
        super()
        this.userConfigurationNavBarSelector = Selector("a[href='/bizcon/users']")
        this.addUserButtonSelector = Selector("span").withText("ADD USER")
        this.addUserTypedropdownSelector = Selector("center .form-control") 
        this.userDropdownSelector = Selector("div:nth-child(3).MuiGrid-root div:nth-child(1)")
        this.userOptionSelector = this.userDropdownSelector.find("option")
        this.roleDropdownSelector = Selector("div:nth-child(3).MuiGrid-root div:nth-child(2)")
        this.roleOptionSelector = this.roleDropdownSelector.find("option")
        this.inputPhoneNumberSelector = Selector("#phonenumber")
        this.searchUsernameSelector = Selector("input[placeholder='Enter User name...']")
        this.adminLinkSelector = Selector ("a").withText("Administration Console")
        this.keyCloakUsernameSelector = Selector("#username")
        this.keyCloakPasswordSelector = Selector("#password")
        this.keyCloakLoginButtonSelector = Selector("#kc-login")
        this.keyCloakDropDownSelector = Selector("h2").withText("Select realm")
        this.BCTextSelector = Selector("a").withText("Bizconnapi")
        this.usersNavBarSelector = Selector("a").withText("Users")
        this.createUserSelector = Selector("#createUser") 
        this.createUsernameSelector = Selector("#username")
        this.createuserEmailSelector = Selector("#email")
        this.createUserFirstNameSelector = Selector("#firstName")
        this.createUserLastNameSelector =  Selector("#lastName")
        this.keyCloaksaveButtonSelector = Selector("button").withText("Save")
        this.keyCloakSearchUserSelector = Selector("input[placeholder='Search...']")
        this.deleteUserInKeyCloakSelector = Selector("td").withText('Delete')
        this.confirmDeleteSelector = Selector('.btn-danger')

     }

   
     createUserIntoActiveDirectory = async(testController) => {
         
         await testController.navigateTo(KEYCLOAK_URL)
         await testController.click(this.adminLinkSelector)
         await testController.typeText(this.keyCloakUsernameSelector, KEYCLOAK_USERNAME)
         await testController.typeText(this.keyCloakPasswordSelector, KEYCLOAK_PASSWORD)
         await testController.click(this.keyCloakLoginButtonSelector)
         await testController.hover(this.keyCloakDropDownSelector, {speed:1})
         await testController.click(this.BCTextSelector)
         await testController.click(this.usersNavBarSelector)
         await testController.click(this.createUserSelector)
         await testController.typeText(this.createUsernameSelector, name)
         await testController.typeText(this.createuserEmailSelector, email)
         await testController.typeText(this.createUserFirstNameSelector, "TestUser")
         await testController.typeText(this.createUserLastNameSelector, "testUser")
         await testController.click(this.keyCloaksaveButtonSelector)
       
         
     }
   //    Make sure we dont clog key cloak with testing data
     deleteUserFromActiveDirectory = async (testController) => {
      await testController.navigateTo(KEYCLOAK_URL)
      await testController.click(this.adminLinkSelector)
      await testController.typeText(this.keyCloakUsernameSelector, KEYCLOAK_USERNAME)
      await testController.typeText(this.keyCloakPasswordSelector, KEYCLOAK_PASSWORD)
      await testController.click(this.keyCloakLoginButtonSelector)
      await testController.hover(this.keyCloakDropDownSelector, {speed:1})
      await testController.click(this.BCTextSelector)
      await testController.click(this.usersNavBarSelector)
      await testController.typeText(this.keyCloakSearchUserSelector, name)
      await testController.pressKey('enter')
      await testController.click(this.deleteUserInKeyCloakSelector)
      await testController.click(this.confirmDeleteSelector)

     }

}

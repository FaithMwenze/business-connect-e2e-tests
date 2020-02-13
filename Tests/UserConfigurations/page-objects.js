import { ClientFunction } from "testcafe"
import {Selector} from "testcafe"
import faker from 'faker'
import Roles from "../RoleConfigurations/page-objects"

export default class UserConfiguration extends Roles {
     constructor(){
        super()
        this.addUserButtonSelector = Selector("span").withText("ADD USER")
        this.addCorporateAdminButtonSelector = Selector("span").withText("ADD CORPORATE ADMIN")
        this.selectCorporateDropdownSelector = Selector(".MuiGrid-root:nth-child(1) .form-control")
        this.selectRolesSelector = Selector(".MuiGrid-root:nth-child(2) > .form-control")
        this.addUserTypedropdownSelector = Selector("center .form-control") 
        this.corporateAdminTabSelector = Selector("span").withText("CORPORATE ADMINS")
        this.corporateAdminUsernameSelector = Selector("#user-name")
        this.corporateAdminFirstnameSelector = Selector("#first-name")
        this.corporateAdminLastnameSelector = Selector("#last-name")
        this.corporatePhonenumberSelector = Selector("#phonenumber")
        this.corporateEmailSelector = Selector("#email") 
        this.userDropdownSelector = Selector("div:nth-child(3).MuiGrid-root div:nth-child(1)")
        this.userOptionSelector = Selector(".css-1pahdxg-control #react-select-2-input")
        this.roleDropdownSelector = Selector(".form-control:nth-child(2)")
        this.roleOptionSelector = this.roleDropdownSelector.find("option")
        this.inputPhoneNumberSelector = Selector("#phonenumber")
        this.searchUsernameSelector = Selector("input[placeholder='Enter User name...']")
        this.searchUserStatusSelector = Selector("input[placeholder='Enter Status...']")
        this.userSelectorText = Selector("tbody tr:nth-child(1) td:nth-child(1)")
        this.statusSelector = Selector("tbody tr:nth-child(1) td:nth-child(5)")
        this.usersNavBarSelector = Selector("a").withText("Users")
        this.createUserSelector = Selector("#createUser") 
        this.createUsernameSelector = Selector("#username")
        this.confirmDeleteSelector = Selector('.btn-danger')
        this.rejectuserSelector = Selector('#phone[value=""]')
        this.userdoesNotExistSelector = Selector('span').withText("this username doesn't exist")
        this.saveCorporateAdminSelector = Selector(".jss1224 button span").withText("SAVE")
     }
     
     generateRandomName = () => {
      const randomNumber =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
      const randomName = randomNumber.toString();
      return `createdItems${randomName}`
   }
     createUser = async(testController,userType, role, randomName) => {
      const scroll = ClientFunction(() => window.scroll(0, 1500))
      await testController.click(this.userConfigurationNavBarSelector)
      await testController.click(this.addUserButtonSelector)
      await testController.click(this.addUserTypedropdownSelector)
      await testController.click(this.dropdownSelector.withText(userType))
      await testController.click(this.userDropdownSelector)
      await testController.typeText(this.userOptionSelector, randomName)
      await testController.pressKey("enter")
      await testController.click(this.roleDropdownSelector) 
      scroll()
      await testController.click(this.roleOptionSelector.withText(role))
      await testController.typeText(this.inputPhoneNumberSelector, "254729530277")
      await testController.click(this.saveButtonSelector)
      return randomName
     }

     editUser = async(testController, createdUser)   => {
      await testController.click(this.userConfigurationNavBarSelector)
      await testController.typeText(this.searchUsernameSelector, createdUser)
      await testController.wait(1000)
      await testController.click(this.editButtonSelector)
      await testController.click(this.editButtonSelector)
     } 

     createCorporateAdmin = async(testController, role) => {
      const randomEmail = faker.internet.email()
       const name = this.generateRandomName()
       const scroll = ClientFunction(() => window.scroll(0, 2000))
       await testController.click(this.corporateNavbarSelector)
       await testController.click(this.corporateAdminTabSelector)
       await testController.click(this.addCorporateAdminButtonSelector)
       await testController.click(this.selectCorporateDropdownSelector)
       await testController.click(this.selectCorporateDropdownSelector.child(1))
       await testController.click(this.selectRolesSelector)
       scroll()
       await testController.click(this.selectRolesSelector.find("option").withText(role))
       await testController.typeText(this.corporateAdminUsernameSelector, name)
       await testController.typeText(this.corporateAdminFirstnameSelector, "test")
       await testController.typeText(this.corporateAdminLastnameSelector, "test")
       await testController.typeText(this.corporateEmailSelector, randomEmail)
       await testController.typeText(this.corporatePhonenumberSelector, "254729530277")
       await testController.click(this.saveButtonSelector)
       await testController.typeText(this.searchUsernameSelector, name)
       return name
     }
  
}

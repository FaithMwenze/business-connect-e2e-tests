import {Selector } from "testcafe"
import Page from "../page-objects"



export default class  CorporateConfiguration extends Page {

    constructor () {
      super()
      this.corporateNavbarSelector = Selector('a[href="/bizcon/corporates"]')
      this.createCorporateTabSelector = Selector("span").withText("CREATE CORPORATE")
      this.AddCorporateSelector = Selector("span").withText("ADD CORPORATE")
      this.typeCifSelector = Selector("#cif")
      this.fetchCifSelector = Selector("span").withText("FETCH")
      this.sectorDropDownSelector = Selector("div:nth-child(3) > div > div > div > .jss6 > .MuiGrid-root > .MuiGrid-root > .form-control")
      this.saveButtonSelector = Selector("span").withText("SAVE")
      this.searchCorporateNameSelector = Selector("input[placeholder='Enter Name...']")
      this.statusSelector  = Selector("tr:nth-child(1) td:nth-child(2)")
      this.editSelector = Selector("span").withText("EDIT")
      this.approveSelector = Selector("span").withText("APPROVE")
      this.editSectorSelector = Selector("div:nth-child(4) > div > div > div > .jss6 > .MuiGrid-root > .MuiGrid-root > .form-control")
      this.rejectSelector  =Selector("span").withText("REJECT")
      this.selectConnectorSelector = Selector("/div[2]/div[1]/div[2]/div[1]/div[1]/select[1]")
      

    }
    
    createCorporate = async(testController, corporateName, cif) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.click(this.AddCorporateSelector)
      await testController.typeText(this.typeCifSelector, cif)
      await testController.click(this.fetchCifSelector)
      await testController.wait(1000)
      await testController.click(this.sectorDropDownSelector)
      await testController.click(this.sectorDropDownSelector.find("option").nth(2))
      await testController.click(this.saveButtonSelector)
      await testController.typeText(this.searchCorporateNameSelector, corporateName)
    }

    editCorporate   = async(testController, corporateName) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.typeText(this.searchCorporateNameSelector, corporateName)
      await testController.click(this.editSelector)
      await testController.click(this.editSectorSelector)
      await testController.click(this.editSectorSelector.find("option").nth(3))
      await testController.click(this.editSelector)
      await testController.typeText(this.searchCorporateNameSelector, corporateName, {replace: true})
    }
}
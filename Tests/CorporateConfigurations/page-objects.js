import {Selector } from "testcafe"
import Page from "../page-objects"



export default class  CorporateConfiguration extends Page {

    constructor () {
      super()
      this.corporateNavbarSelector = Selector('a[href="/bizcon/corporates"]')
      this.createCorporateTabSelector = Selector("span").withText("CREATE CORPORATE")
      this.AddCorporateSelector = Selector("span").withText("ADD CORPORATE")
      this.addConfigurationSelector = Selector("span").withText("ADD CONFIGURATION")
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
      this.configureCorporateSelector = Selector("span").withText("CONFIGURE CORPORATE")
      this.selectConnectorSelector = Selector(".MuiGrid-container:nth-child(2) .MuiGrid-grid-md-6:nth-child(1) > select.form-control:nth-child(2)")
      this.selectTransitSelector = Selector(".MuiGrid-grid-md-6:nth-child(2) div:nth-child(2) > select.form-control")
      this.selectCorporateSelector = Selector(".MuiGrid-container:nth-child(2) .MuiGrid-grid-md-6:nth-child(2) > select.form-control:nth-child(2)")
      this.selectIncomeAccount = Selector(".MuiGrid-container:nth-child(6) .MuiGrid-grid-md-6:nth-child(1) > select.form-control:nth-child(2)")
      this.selectExciseSelector = Selector (".MuiGrid-grid-md-6:nth-child(4) div:nth-child(2) > select.form-control")
      this.selectDebitSelector = Selector(".MuiGrid-container:nth-child(8) .MuiGrid-grid-md-6 > select.form-control:nth-child(2)")
      this.selectChannelSelector = Selector("input[name='Mpesa']")
      this.selectCollectionSelector = Selector("span").withText("collection accounts fetched")
      this.optionConnectorSelector = this.selectConnectorSelector.find('option:nth-child(2)')
      this.connectorFieldSelector = Selector("#password")
      this.optionCorporateSelector = this.selectCorporateSelector.find("option:nth-child(2)")
      this.optionTransitSelector = this.selectTransitSelector.find("option:nth-child(2)")
      this.optionIncomeSelector = this.selectIncomeAccount.find("option:nth-child(2)")
      this.optionExciseSelector = this.selectExciseSelector.find("option:nth-child(2)")
      this.optionDebitSelector = this.selectDebitSelector.find("option:nth-child(2)")
      this.optionCollectionSelector = Selector("#react-select-2-option-0")
      this.searchCorporateConfigSelector = Selector("input[placeholder='Enter Corporate...']")
      this.statusConfigSelector = Selector("tr:nth-child(1) td:nth-child(4)")
      this.channelBranchSelector = Selector("input[name='Branch']")
      
      
    }
    
    createCorporate = async(testController, cif) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.click(this.AddCorporateSelector)
      await testController.typeText(this.typeCifSelector, cif)
      await testController.click(this.fetchCifSelector)
      await testController.wait(1000)
      await testController.click(this.sectorDropDownSelector)
      await testController.click(this.sectorDropDownSelector.find("option").nth(2))
      await testController.click(this.saveButtonSelector)
    }

    editCorporate   = async(testController, corporateName) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.typeText(this.searchCorporateNameSelector, corporateName,  {replace: true})
      await testController.wait(2000)
      await testController.click(this.editSelector)
      await testController.click(this.editSectorSelector)
      await testController.click(this.editSectorSelector.find("option").nth(3))
      await testController.click(this.editSelector)
    }

      
    addCorporateConfiguration = async (testController) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.click(this.configureCorporateSelector)
      await testController.click(this.addConfigurationSelector)
      await testController.wait(5000)
      await testController.click(this.selectConnectorSelector)
      await testController.click(this.optionConnectorSelector)
      await testController.typeText(this.connectorFieldSelector, "envisionPassword")
      await testController.click(this.selectCorporateSelector)
      await testController.click(this.optionCorporateSelector)
      await testController.click(this.selectTransitSelector)
      await testController.click(this.optionTransitSelector)
      await testController.click(this.selectIncomeAccount)
      await testController.click(this.optionIncomeSelector)
      await testController.click(this.selectExciseSelector)
      await testController.click(this.optionExciseSelector)
      await testController.click(this.selectDebitSelector)
      await testController.click(this.optionDebitSelector)
      await testController.click(this.selectCollectionSelector)
      await testController.click(this.optionCollectionSelector)
      await testController.click(this.selectCollectionSelector)
      await testController.click(this.selectChannelSelector)
      await testController.click(this.saveButtonSelector)
    }

    editCorporateConfiguration = async(testController, corporate) => {
      await testController.click(this.corporateNavbarSelector)
      await testController.click(this.configureCorporateSelector)
      await testController.typeText(this.searchCorporateConfigSelector, corporate)
      await testController.wait(3000)
      await testController.click(this.editSelector)
      await testController.click(this.saveButtonSelector)
    
    }
}
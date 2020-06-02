import { Selector } from "testcafe";
import faker from "faker"
import Page from "../page-objects";


export default class Connector extends Page {
    constructor(){
        super()
        this.connectorNavSelector = Selector("a[href='/businessconnect/bizcon/connector']")
        this.addConnectorSelector = Selector("span").withText("ADD CONNECTOR")
        this.inputConnectorNameSelector = Selector("#connectorname")
        this.inputConnectorVersionSelector = Selector("#connectorversion")
        this.verficationEndpoint   = Selector("#verfication") 
        this.transactionEndpoint = Selector("#transaction")
        this.inputFieldName = Selector("tr  input.MuiInput-input") 
        this.saveSelector = Selector("span").withText("SAVE")
        this.searchConnectorNameSelector = Selector("input[placeholder='Enter Connector name...']")
        this.detailsSelector = Selector("tr:nth-child(1) td:nth-child(4) a:nth-child(1)")
        this.connectorNameSelector = Selector("span")
        this.editSelector =Selector("span").withText("EDIT")
        this.displayConnectorName = Selector("td") 
        
    }

    createConnector  = async(testController) => {
        const name = faker.name.findName()
        const url = faker.internet.url()
        await testController.click(this.connectorNavSelector)
        await testController.click(this.addConnectorSelector)
        await testController.typeText(this.inputConnectorVersionSelector, "v2.0")
        await testController.typeText(this.inputConnectorNameSelector, name)
        await testController.typeText(this.verficationEndpoint, url)
        await testController.typeText(this.transactionEndpoint, url)
        await testController.typeText(this.inputFieldName, "username")
        await testController.click(this.saveSelector)
        return name
    }


    editConnector = async(testController, connectorName)  => {
        const editedName = faker.name.findName()
        await testController.click(this.connectorNavSelector)
        await testController.typeText(this.searchConnectorNameSelector, connectorName)
        await testController.click(this.editSelector)
        await testController.typeText(this.inputConnectorNameSelector, editedName, {replace: true})
        await testController.click(this.saveSelector)
        return editedName
    }
}
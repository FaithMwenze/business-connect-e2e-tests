import { loginUsers } from "../Helpers/hooks";
import Connector from "./page-objects"
const { LOGIN_URL } = process.env


const connector = new Connector()

fixture `Connector module`


test.before(loginUsers.loginSuperAdminMaker)
("Create connector", async(testController) => {
      const connectorName = await connector.createConnector(testController)
      testData.CONNECTOR_NAME = connectorName
      await testController.typeText(connector.searchConnectorNameSelector,testData.CONNECTOR_NAME)
      await testController.expect(connector.displayConnectorName.innerText).eql(testData.CONNECTOR_NAME)
})

test.before(loginUsers.loginSuperAdminMaker)
("Super admin should be able to view connector details", async(testController) => {
      await testController.click(connector.connectorNavSelector)
      await testController.typeText(connector.searchConnectorNameSelector, testData.CONNECTOR_NAME)
      await testController.click(connector.detailsSelector)
      await testController.expect(connector.connectorNameSelector.innerText).typeOf("string", testData.CONNECTOR_NAME)
})

test.before(loginUsers.loginSuperAdminMaker)
("Super Admin can be able to edit connector details", async(testController) => {
     const newName = await connector.editConnector(testController,testData.CONNECTOR_NAME )
     await testController.typeText(connector.searchConnectorNameSelector, newName, {replace:true})
     await testController.expect(connector.displayConnectorName.innerText).eql(newName)
})


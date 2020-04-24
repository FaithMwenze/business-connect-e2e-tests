import { loginUsers } from "../Helpers/hooks";
import CorporateConfiguration from "./page-objects"
import { RequestMock } from "testcafe";
import faker from "faker"

const corporateConfiguration = new CorporateConfiguration()

const corporateName = faker.company.companyName()
const  cif = Math.floor(1000000 + Math.random() * 9000000).toString();
// Mock the list  of corporate endpoint
var mock = RequestMock()
.onRequestTo('http://192.168.204.30:8082/imb-uat/api/connector/connector_fields/637005')
.respond([{"id":649751,"createdOn":1574426608658,"createdBy":null,"lastUpdatedOn":1574426608658,
"lastUpdatedBy":1204,"ipAddress":"196.13.209.15","connectorid":637005,"fields":"Yes"}],
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})
// .onRequestTo('http://192.168.204.30:8082/imb-uat/api/get-corporate-account/0150132')
// .respond(["03801501321210"], 200, {
//   'access-control-allow-credentials': true,
//   'access-control-allow-origin': 'http://192.168.204.21:8484'
// })


fixture `Configure Corporate`


test
.before(loginUsers.loginBankAdminMaker)
("Add corporate configuration",  async(testController)=>{
  await testController.click(corporateConfiguration.corporateNavbarSelector)
  await testController.click(corporateConfiguration.configureCorporateSelector)
  await testController.click(corporateConfiguration.addConfigurationSelector)
  await testController.click(corporateConfiguration.selectConnectorSelector)
  await testController.click(corporateConfiguration.optionConnectorSelector)
  await testController.click(corporateConfiguration.selectCorporateSelector)
  await testController.click(corporateConfiguration.optionCorporateSelector)
  await testController.click(corporateConfiguration.selectTransitSelector)
  await testController.click(corporateConfiguration.optionTransitSelector)
  await testController.click(corporateConfiguration.selectIncomeAccount)
  await testController.click(corporateConfiguration.optionIncomeSelector)
  await testController.click(corporateConfiguration.selectExciseSelector)
  await testController.click(corporateConfiguration.optionExciseSelector)
  await testController.click(corporateConfiguration.selectDebitSelector)
  await testController.click(corporateConfiguration.optionDebitSelector)
  await testController.click(corporateConfiguration.selectCollectionSelector)
  await testController.click(corporateConfiguration.optionCollectionSelector)
  await testController.click(corporateConfiguration.selectCollectionSelector)
  await testController.click(corporateConfiguration.selectChannelSelector)
  await testController.click(corporateConfiguration.saveButtonSelector)
  await testController.wait(1000)
})


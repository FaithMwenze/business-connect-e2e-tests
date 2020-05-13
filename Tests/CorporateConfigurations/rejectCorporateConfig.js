import { loginUsers } from "../Helpers/hooks";
import CorporateConfiguration from "./page-objects"
import { RequestMock } from "testcafe";

const corporateConfiguration = new CorporateConfiguration()


const  randomName  =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
const  connectorId = Math.floor(100000 + Math.random() * 900000).toString();
const corporateAccountId = Math.floor(1000000 + Math.random() * 9000000).toString();
// save the corporate name
testData.CORPORATE_CONFIGURATION["RejectCorporate"] = `Epow${randomName.toString()}` 

var mock = RequestMock()
// Mock the list  of connector endpoint
.onRequestTo('http://192.168.204.30:8082/imb-uat/api/connector/connector_list')
.respond([{"id":`${connectorId}`,"createdOn":1573630382129,"createdBy":1,"lastUpdatedOn":1587103147071,"lastUpdatedBy":1,
"ipAddress":"196.13.209.15","connectorname":`Envision${randomName.toString()}`,"connectorversion":"1.0","status":"APPROVED",
"verificationendpoint":"https://www.w3schools.com/cssref/pr_grid-template-rows.asp",
"transactionendpoint":"https://www.w3schools.com/cssref/pr_grid-template-rows.asp","connectorfields":"password"}],
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})

// select one corporate endpoint to get connector fields
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/connector/connector_fields/${connectorId}`)
.respond([{"id":718173,"createdOn":1587103147071,"createdBy":null,"lastUpdatedOn":1587103147071,"lastUpdatedBy":1,
             "ipAddress":"196.13.209.15","connectorid":637002,"fields":"password"}], 200 ,{
              'access-control-allow-credentials': true,
              'access-control-allow-origin': 'http://192.168.204.21:8484'    

             })

//  mock income account endpoint
.onRequestTo("http://192.168.204.30:8082/imb-uat/api/bank/incomeaccounts/list")
.respond([{"id":691650,"accountnumber":"013456987","createdOn":1582026685209,"createdBy":603256,
"lastUpdatedOn":1582026685209,"lastUpdatedBy":null,"ipAddress":"196.13.209.15"}], 200, {
  'access-control-allow-credentials': true,
  'access-control-allow-origin': 'http://192.168.204.21:8484' 
})

// Mock one corporate endpoint 
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/get-corporate-account/${corporateAccountId}`)
.respond(["03801501321210"],  200, {
  'access-control-allow-credentials': true,
  'access-control-allow-origin': 'http://192.168.204.21:8484' 
})

// Mock corporate list endpoint
.onRequestTo("http://192.168.204.30:8082/imb-uat/api/corporates?status=undefined&type=BANK&size=100")
.respond([{address1: "string",address2: "string",alertsFlag: false,allowChargeback: false,businessName: testData.CORPORATE_CONFIGURATION["RejectCorporate"],
businessNumber: null,checkerComments: "string",cif: "0172425",city: "string",
collectionAccount:"03801501321210", collectionValidation: null,commissionCharges: null,
contactEmail: "ANDRE@NICKWATSON.CO.ZA",contactFirstName: "string",contactLastName: "string",
contactPhone: "+27829211512",createdBy: 596703,createdOn: 1574686502697,
description: "string",deviceType: "Browser",financialDetails: "FUNDED",freezeDetails: "NOT FROZEN",
helpdeskEmail: "NA",id: 651550,ipAddress: "196.13.209.15",isDiscoverable: false,isUtilityProvider: false,
lastUpdatedBy: 605201,lastUpdatedOn: 1581937017435,logo: "string",notificationFlag: true,postalCode: "string",
reason: null,sector: 3,status: "Approved",transactionSplitType: null,url: "string"}], 200, {
  'access-control-allow-credentials': true,
  'access-control-allow-origin': 'http://192.168.204.21:8484' })

fixture `Configure Corporate`



test.requestHooks(mock)
.before( async(testController) => {
    await loginUsers.loginBankAdminMaker(testController)
    await corporateConfiguration.addCorporateConfiguration(testController)
})
("Reject a PENDING corporate configurations", async(testController) => {
  await loginUsers.loginBankAdminChecker(testController)
  await testController.click(corporateConfiguration.corporateNavbarSelector)
  await testController.click(corporateConfiguration.configureCorporateSelector)
  await testController.typeText(corporateConfiguration.searchCorporateConfigSelector, testData.CORPORATE_CONFIGURATION["RejectCorporate"])
  await testController.wait(3000)
  await testController.click(corporateConfiguration.editSelector)
  await testController.click(corporateConfiguration.rejectSelector)
  await testController.typeText(corporateConfiguration.searchCorporateConfigSelector, testData.CORPORATE_CONFIGURATION["RejectCorporate"])
  await testController.expect(corporateConfiguration.statusSelector.innerText).notEql("REJECTED")
})
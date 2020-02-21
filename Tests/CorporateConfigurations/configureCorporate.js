import { RequestMock } from "testcafe";
import CorporateConfiguration from "./page-objects"
import { loginUsers } from "../Helpers/hooks";
const corporateConfiguration = new CorporateConfiguration()

var mock = RequestMock()
.onRequestTo(`http://192.168.204.30:8082/imb-uat/api/get-corporate-account-details/${cif}`)
.respond([{"id":693833,"createdOn":1582201791042,"createdBy":null,"lastUpdatedOn":1582201791042,"lastUpdatedBy":1,"ipAddress":"196.13.209.15","connectorid":637002,"fields":"sg"}],
200, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': 'http://192.168.204.21:8484'
})


fixture ` Configure corporate configuration`



test.before(loginUsers.loginBankUserMaker)
("configure corpoprate", async(testController ) => {
    await testController.click()
})



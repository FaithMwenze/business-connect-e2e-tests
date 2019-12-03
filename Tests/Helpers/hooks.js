import Pages from "../page-objects"

const pages = new Pages()

const loginSuperAdminMaker =   (testController) =>  {
	return  testController.useRole(pages.loginSuperAdminMaker())

} 

const loginSuperAdminChecker =  (testController) => {
	return testController.useRole(pages.loginSuperAdminChecker())
}

const loginBankAdminMaker =   (testController) =>  {
	return testController.useRole(pages.loginBankAdminMaker())

} 

const loginBankAdminChecker =  (testController) => {
	return testController.useRole(pages.loginBankAdminChecker())
}

const loginCorporateAdminMaker =   (testController) =>  {
	return testController.useRole(pages.loginCorporateAdminMaker())

} 

const loginCorporateAdminChecker =  (testController) => {
	return testController.useRole(pages.loginCorporateAdminChecker())
}
export {loginSuperAdminChecker, loginSuperAdminMaker, loginBankAdminMaker, loginBankAdminChecker, loginCorporateAdminMaker, loginCorporateAdminChecker}

import Pages from "../page-objects"

const pages = Pages

const loginSuperAdminMaker =   (testController) =>  {
	return testController.useRole(pages.loginSuperAdminMaker())

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

export {loginSuperAdminChecker, loginSuperAdminMaker, loginBankAdminMaker, loginBankAdminChecker}

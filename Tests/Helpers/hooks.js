import Pages from "../page-objects"

const pages = Pages

const loginSuperAdminMaker =   (testController) =>  {
	return testController.useRole(pages.loginSuperAdminMaker())

} 

const loginSuperAdminChecker =  (testController) => {
	return testController.useRole(pages.loginSuperAdminChecker())
}

export {loginSuperAdminChecker, loginSuperAdminMaker}

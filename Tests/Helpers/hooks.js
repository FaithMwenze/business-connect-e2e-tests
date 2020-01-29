import Pages from "../page-objects"
const pages = new Pages()

const loginUsers = {
 loginSuperAdminMaker (testController)  {return testController.useRole(pages.loginSuperAdminMaker())},
 loginSuperAdminChecker(testController) {return testController.useRole(pages.loginSuperAdminChecker())},
 loginBankAdminMaker (testController) {return testController.useRole(pages.loginBankAdminMaker())},
 loginBankAdminChecker(testController){return testController.useRole(pages.loginBankAdminChecker())},
 loginCorporateAdminMaker(testController){return testController.useRole(pages.loginCorporateAdminMaker())},
 loginCorporateAdminChecker(testController){return testController.useRole(pages.loginCorporateAdminChecker())},
 loginBankUserMaker(testController){return testController.useRole(pages.loginBankUserMaker())},
 loginBankUserChecker(testController){return testController.useRole(pages.loginBankUserChecker())}
}

export { loginUsers }
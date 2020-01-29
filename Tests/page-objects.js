import { Selector } from 'testcafe';
import { Role } from 'testcafe';

const {SUPER_ADMIN_MAKER_USERNAME,SUPER_ADMIN_MAKER_PASSWORD,
	SUPER_ADMIN_CHECKER_USERNAME,SUPER_ADMIN_CHECKER_PASSWORD,
	BANK_ADMIN_MAKER_USERNAME,BANK_ADMIN_MAKER_PASSWORD,
	BANK_ADMIN_CHECKER_USERNAME,BANK_ADMIN_CHECKER_PASSWORD,
	CORPORATE_ADMIN_MAKER_USERNAME,CORPORATE_ADMIN_MAKER_PASSWORD,
	CORPORATE_ADMIN_CHECKER_USERNAME,CORPORATE_ADMIN_CHECKER_PASSWORD,
	BANK_USER_MAKER_USERNAME, BANK_USER_MAKER_PASSWORD,
	 LOGIN_URL} = process.env


export default class Page {
	constructor() {
		this.usernameSelector = Selector('#username').with({ visibilityCheck: true })();
		this.passwordSelector = Selector('#password').with({ visibilityCheck: true })()
		this.loginButtonSelector = Selector('span').withText("LOGIN")
		this.profileIconSelector = Selector("button[tabindex='0']")
		this.logoutSelector = Selector("li").withText("Logout")
		this.corporateNavbarSelector = Selector("a[href='/bizcon/corporates']") 
		this.userConfigurationNavBarSelector = Selector("a[href='/bizcon/users']")
	}

    login = ( username, password) => (
    	Role(LOGIN_URL, async( testController) => {
			await testController
    			.typeText(this.usernameSelector, username)
    			.typeText(this.passwordSelector,password)
				.click(this.loginButtonSelector)
    	}, { preserveUrl: true })
    )
	loginSuperAdminMaker = () => this.login(SUPER_ADMIN_MAKER_USERNAME,SUPER_ADMIN_MAKER_PASSWORD);
	loginSuperAdminChecker = () => this.login(SUPER_ADMIN_CHECKER_USERNAME, SUPER_ADMIN_CHECKER_PASSWORD )
	loginBankAdminMaker = () => this.login(BANK_ADMIN_MAKER_USERNAME, BANK_ADMIN_MAKER_PASSWORD)
	loginBankAdminChecker = () => this.login(BANK_ADMIN_CHECKER_USERNAME, BANK_ADMIN_CHECKER_PASSWORD)
	loginCorporateAdminMaker=() => this.login(CORPORATE_ADMIN_MAKER_USERNAME, CORPORATE_ADMIN_MAKER_PASSWORD)
	loginCorporateAdminChecker = () => this.login(CORPORATE_ADMIN_CHECKER_USERNAME, CORPORATE_ADMIN_CHECKER_PASSWORD)
	loginBankUserMaker = () =>  this.login(BANK_USER_MAKER_USERNAME, BANK_USER_MAKER_PASSWORD)


	logout = async (testController) => {
		await testController.click(this.profileIconSelector)
		await testController.click(this.logoutSelector)
		await testController.wait(1000)
	}

};
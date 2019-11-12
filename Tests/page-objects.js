import { Selector } from 'testcafe';
import { Role } from 'testcafe';

const {SUPER_ADMIN_MAKER_USERNAME,
	SUPER_ADMIN_MAKER_PASSWORD,
	SUPER_ADMIN_CHECKER_USERNAME,
	SUPER_ADMIN_CHECKER_PASSWORD, LOGIN_URL} = process.env


class Page {
	constructor() {
		this.usernameSelector = Selector('.MuiInputBase-root');
		this.passwordSelector = Selector('#password');
		this.loginFormSelector = Selector('.jss9 button.MuiButton-text')
		this.profileIconSelector = Selector("button[tabindex='0']")
        this.logoutSelector = Selector("li").withText("Logout")
	}

    login = ( username, password) => (
    	Role(LOGIN_URL, async( testController) => {
    		await testController
    			.typeText(this.usernameSelector, username)
    			.typeText(this.passwordSelector,password)
    			.click(this.loginFormSelector)   
    	}, { preserveUrl: true })
    )
	loginSuperAdminMaker = () => this.login(SUPER_ADMIN_MAKER_USERNAME,SUPER_ADMIN_MAKER_PASSWORD);
	loginSuperAdminChecker = () => this.login(SUPER_ADMIN_CHECKER_USERNAME, SUPER_ADMIN_CHECKER_PASSWORD )


	logout = async (testController) => {
		await testController.click(this.profileIconSelector)
		await testController.click(this.logoutSelector)
		await testController.wait(5000)
	}

};

export default new Page()
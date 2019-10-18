import dotenv from "dotenv"
dotenv.config()
import { Selector } from 'testcafe';
import { Role } from 'testcafe';

const {LOGIN_URL,SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD} = process.env


class Page {
    constructor() {
        this.usernameSelector = Selector('.MuiInputBase-root');
        this.passwordSelector = Selector('#password');
        this.loginFormSelector = Selector('.jss9 button.MuiButton-text')
    }

    login = (username, password) => (
        Role(LOGIN_URL, async( testController) => {
            await testController
            .typeText(this.usernameSelector, username)
            .typeText(this.passwordSelector,password)
            .click(this.loginFormSelector)    
        }, { preserveUrl: true })
    )
    loginSuperAdmin = () => this.login(SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD);

};

export default new Page()
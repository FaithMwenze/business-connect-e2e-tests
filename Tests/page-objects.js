import { Selector } from 'testcafe';

class Page {
    constructor() {
        this.usernameSelector = Selector('.MuiInputBase-root');
        this.passwordSelector = Selector('#password');
        this.loginFormSelector = Selector('button.MuiButton-text')
    }
}

export default new Page()
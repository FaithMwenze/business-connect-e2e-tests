import { loginUsers } from "../Helpers/hooks"; 
import Profile from "./page-objects"
const {SUPER_ADMIN_MAKER_USERNAME } = process.env


const profile = new Profile()
fixture `Profile configuration module`


test.before(loginUsers.loginSuperAdminMaker)
("view profile details", async(testController) => {
     await testController.click(profile.profileNavSelector)
     await testController.expect(profile.profileViewSelector.innerText).eql(SUPER_ADMIN_MAKER_USERNAME)
})
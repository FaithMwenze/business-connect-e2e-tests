import Pages from "../page-objects"

const pages = Pages

export default async function(testController) {
	return testController.useRole(pages.loginSuperAdmin())

} 
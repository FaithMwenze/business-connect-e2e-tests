import Pages from "../page-objects"
const { DASHBOARD_URL, LOGIN_URL } = process.env
const pages = Pages

fixture `Super Admin Role module`
	.page(LOGIN_URL);


test("Login in the business connect", async testController => {
	await testController.useRole(pages.loginSuperAdmin());
	const documentUrl = await testController.eval(() => document.documentURI)
	await testController.expect(documentUrl).eql(DASHBOARD_URL)
}) ;
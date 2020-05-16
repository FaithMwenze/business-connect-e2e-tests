import Page from "../page-objects"
import path from 'path'
import { Selector } from "testcafe"

export default class ReportConfiguration extends Page{
    constructor(){
        super()
         this.reportNavSelector = Selector("a[href='/bizcon/reports']")
         this.corporateReportButton = Selector("span").withText("CORPORATE REPORT")
         this.businessReportButton = Selector("span").withText('BUSINESS REPORT')
         this.searchCorporate = Selector("input[placeholder='Search corporate...']")
         this.corporateNameSelector = Selector("tr:nth-child(1) td:nth-child(1)")
         this.businessCsvButtonSelector = Selector("#csvButton a[download='Business.csv']")
        this.corporateCsvButtonSelector = Selector("#csvButton a[download='Corporate.csv']")
         this.pdfButtonSelector = Selector("#pdfButton svg")


    }

    enableDownloadingForHeadlessChrome = async (testController) => {
            const browserConnection = testController.testRun.browserConnection;
            const client = browserConnection.provider.plugin.openedBrowsers[browserConnection.id].client;
            const { Network, Page } = client;
            await Promise.all([
                Network.enable(),
                Page.enable()
            ]);
            Network.requestWillBeSent((param) => {
                // console.log("Network.requestWillBeSent: " + JSON.stringify(param));
            });
            Network.responseReceived((param) => {
                // console.log("Network.responseReceived: " + JSON.stringify(param));
            });
            await Page.setDownloadBehavior({
                behavior:     'allow',
                downloadPath: path.resolve(__dirname, 'downloaded')
            });
            console.log("heeey am here")
    }        
           
}
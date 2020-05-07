import Page from "../page-objects"
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
         this.pdfButtonSelector = Selector("#pdfButton")


    }
}
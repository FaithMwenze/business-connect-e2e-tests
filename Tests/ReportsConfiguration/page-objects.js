import Page from "../page-objects"
import { Selector } from "testcafe"

export default class ReportConfiguration extends Page{
    constructor(){
        super()
         this.reportNavSelector = Selector("a[href='/bizcon/reports']")
         this.corporateReportButton = Selector("span").withText("CORPORATE REPORT")
         this.searchCorporate = Selector("input[placeholder='Search corporate...']")
         this.corporateNameSelector = Selector("tr:nth-child(1) td:nth-child(1)")
         this.csvButtonSelector = Selector("#csvButton a[download='generatedBy_react-csv.csv']")


    }
}
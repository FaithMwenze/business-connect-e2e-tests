import { Selector } from "testcafe";
import Page from "../page-objects"


export default class Profile extends Page{
    constructor() {
        super()
        this.profileViewSelector = Selector(".MuiGrid-root:nth-child(1) > .MuiGrid-root:nth-child(1) > div")
        this.profileNavSelector = Selector("a[href='/bizcon/profile']")
        
    }
}
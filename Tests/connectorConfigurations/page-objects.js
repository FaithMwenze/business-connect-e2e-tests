import Page from "../page-objects"
import { Selector } from "testcafe";

export default class Connector extends Page{

    constructor() {
        super()
        this.connectorNavSelector = Selector("a[href='/bizcon/connector")
        
    }

}
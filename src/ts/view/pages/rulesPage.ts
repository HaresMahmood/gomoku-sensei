import Page from "./page.js";

export default class RulesPage extends Page {
    public navigateTo(): void {
        this.context.navigateTo(this, "rules"); 
    }
}
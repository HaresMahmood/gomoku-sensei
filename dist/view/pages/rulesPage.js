import Page from "./page.js";
export default class RulesPage extends Page {
    navigateTo() {
        this.context.navigateTo(this, "rules");
    }
}

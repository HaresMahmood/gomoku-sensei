import Page from "./page.js";
export default class HomePage extends Page {
    navigateTo() {
        this.context.navigateTo(this, "home");
    }
}

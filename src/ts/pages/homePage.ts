import Page from "./page.js";

export default class HomePage extends Page {
    public navigateTo(): void {
        this.context.navigateTo(this, "home");
    }
}
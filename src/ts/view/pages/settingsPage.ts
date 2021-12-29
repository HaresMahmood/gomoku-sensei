import Page from "./page.js";

export default class SettingsPage extends Page {
    public navigateTo(): void {
        this.context.navigateTo(this, "settings"); 
    }
}
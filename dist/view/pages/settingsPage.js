import Page from "./page.js";
export default class SettingsPage extends Page {
    navigateTo() {
        this.context.navigateTo(this, "settings");
    }
}

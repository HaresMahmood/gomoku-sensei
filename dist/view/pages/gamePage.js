import Page from "./page.js";
export default class GamePage extends Page {
    navigateTo() {
        this.context.navigateTo(this, "game");
    }
}

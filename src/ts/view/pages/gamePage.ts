import Page from "./page.js";

export default class GamePage extends Page {
    public navigateTo(): void {
        this.context.navigateTo(this, "game"); 
    }
}
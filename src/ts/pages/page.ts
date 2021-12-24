import DefaultView from "../view/defaultView.js";

interface iPage {
    navigateTo(): void;
}

export default abstract class Page implements iPage {
    protected context: DefaultView;

    constructor(context: DefaultView) {
        this.context = context;
    }

    public abstract navigateTo(): void;
}
export default class ModalView {
    constructor(handler) {
        this.setBackButtonHandler(handler);
    }

    setBackButtonHandler(handler) {
        $("#back-button").on("click", handler);
    }
}
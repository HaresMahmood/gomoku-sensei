export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.setCellClickHandler((row, column) => {
            let color = this.model.getCurrentPlayer() === 1 ? "black" : "white";

            this.view.addPiece(row, column, color);
        });
    }
}
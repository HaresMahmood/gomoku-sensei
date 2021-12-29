import Event from "../utility/event";
export default class HomeView {
    constructor() {
        this.buttonClickEvent = new Event();
        this.setButtonHandler(this.buttonClickEvent);
    }
    // #region Event handlers 
    setButtonHandler(event) {
        $("#game-button").bind("mouseup", function () {
            if ($("select:valid").length === 2) {
                event.trigger($("#player-1 :selected").text(), $("#player-2 :selected").text());
            }
            else {
                $("select:invalid").addClass("error");
                // https://stackoverflow.com/questions/10363671/jquery-bounce-effect-on-click-no-jquery-ui
                for (var i = 0; i < 3; i++) {
                    $(this).animate({ marginLeft: '-=' + '12px' }, 100)
                        .animate({ marginLeft: '+=' + '12px' }, 100);
                }
            }
        });
    }
}

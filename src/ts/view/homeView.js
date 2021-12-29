import Event from "../utility/event.js";

export default class HomeView {
    constructor() {
        this.buttonClickEvent = new Event();
        this.setButtonHandler(this.buttonClickEvent);
    }

    // #region Event handlers 

    setButtonHandler(event) {
        $("#game-button").bind("mouseup", function() {
            if ($("select:valid").length === 2) {
                const data = {
                    'player1': $("#player-1 :selected").text(),
                    'player2': $("#player-2 :selected").text()
                };

                window.top.postMessage(JSON.stringify(data), "*")
            }
            else {
                $("select:invalid").addClass("error");

                // https://stackoverflow.com/questions/10363671/jquery-bounce-effect-on-click-no-jquery-ui
                for (var i = 0; i < 3; i++) {
                    $(this).animate({marginLeft: '-='+ '12px'}, 100)
                           .animate({marginLeft: '+='+ '12px'}, 100);
                }  
            }
        });
    }

    // #endregion
}
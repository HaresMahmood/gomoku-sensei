export default class HomeView {
    // #region Initialization
    constructor() {
        this.setButtonHandler();
    }
    // #endregion
    // #region Events
    setButtonHandler() {
        $("#game-button").bind("mouseup", function () {
            if ($("select:valid").length === 2) {
                const data = {
                    "player1": $("#player-1 :selected").text().trim(),
                    "player2": $("#player-2 :selected").text().trim()
                };
                localStorage.setItem("player1", $("#player-1").val());
                localStorage.setItem("player2", $("#player-2").val());
                window.parent.postMessage(JSON.stringify(data), "*");
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

/**
 * View for the Home-page.
 *
 * @see `/html/home.html` for the corresponding HTML-page.
 */
export default class HomeView {
    // #region Initialization
    /**
     * Class constructor.
     */
    constructor() {
        this.setButtonHandler();
    }
    // #endregion
    // #region Events
    /**
     * Envokes `Start game`-button click-event. This includes:
     * * Saving values of `select`-components to `localStorage` for
     * later retrieval.
     * * Performing basic user validation to
     * ensure all `select`-components are populated.
     * * Post message to parent-page to indicate click.
     */
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
                $(this).stop(true).css({ marginLeft: "0px" });
                // Button shake.
                for (var i = 0; i < 3; i++) {
                    $(this).animate({ marginLeft: "-=" + "12px" }, 100)
                        .animate({ marginLeft: "+=" + "12px" }, 100);
                }
            }
        });
    }
}

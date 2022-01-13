const BREAKPOINT = 650;
export default class GameView {
    constructor(rows, columns) {
        this.board = $(".board");
        this.cell = ".cell";
        this.populateBoard(rows, columns);
    }
    populateBoard(rows, columns) {
        document.documentElement.style.setProperty("--columns", columns);
        for (let i = 0; i < (rows * columns); i++) {
            this.board.append(`<div class="${this.cell.split('.').join("")}"></div>`);
        }
    }
    setPlayer(player, number) {
        // TODO: Add properties to `Player`-class to retrieve `name`, `icons`, etc...
        const name = player.constructor.name;
        let icon;
        switch (name) {
            case ("Human"):
                icon = "person";
                break;
            case ("RandomAI"): // TODO: "EasyAI"
                icon = "child_friendly";
                break;
            case ("KillerAI"):
                icon = "smart_toy";
                break;
            case ("DynamicAI"):
                icon = "school";
                break;
        }
        console.log(icon);
        $(".player_container p").eq(number - 1).text(name);
        $(".player_container .player-icon").eq(number - 1).text(icon);
    }
    changePlayer(currentPlayer) {
        $(".active").removeClass("active");
        $(`.player__container:eq(${currentPlayer - 1})`).addClass("active");
    }
    updateProgressBar(percentage) {
        $(".pure-material-progress-linear").progressbar({
            value: percentage
        });
    }
    toggleProgressBar() {
        //updateProgressBar(0);
        $("header, body").toggleClass("loading");
    }
    addPiece(index, color) {
        let box = this.board.find(this.cell).eq(index);
        if (box.find(".piece").length === 0) {
            let piece = `<div class="piece ${color}-piece"></div>`;
            box.append(piece);
        }
    }
    endGame(color, isDraw) {
        const winText = isDraw ? `Draw!` : `${color} wins!`;
        window.alert(winText);
        location.reload();
    }
    /*-- Events */
    getClickedCellCoordinates(cell) {
        return cell.index();
    }
    setDocumentReadyHandler() {
        $(document).ready(this.movePlayerElement);
    }
    setWindowResizeHandler() {
        $(window).bind("resize", this.movePlayerElement);
    }
    setCellClickHandler(handler) {
        $(this.cell).bind("click", function () {
            handler($(this).index());
        });
    }
    /*-- Miscellaneous --*/
    movePlayerElement() {
        if (parseInt($(window).width()) <= BREAKPOINT) {
            $("#players-container").detach().prependTo($("main"));
            if ($("#page-title").length === 0) {
                $("#menu-button").after((`<h3 id="page-title"> Game </h3>`));
            }
        }
        if (parseInt($(window).width()) > BREAKPOINT) {
            $("#players-container").detach().insertAfter($("#menu-button"));
            $("#page-title").remove();
        }
    }
    setNavigationOpenHandler() {
        $("#menu-button").bind("click", function () {
            $("nav").addClass("visible"); // Make menu visible.
            $("body").children().not("nav, modal").addClass("overlay"); // Add blur to background.
            $("body").addClass("overlay");
            // Slide back menu on `back` key press.
            if (window.history && window.history.pushState) {
                //window.history.pushState('forward', null, './#forward'); // Ensure browser doesn't go back in history.
                $(window).on('popstate', function () {
                    // Do opposite of above.
                    $("nav").removeClass("visible");
                    $("body").children().not("nav, #settings-page").removeClass("overlay");
                    $("body").removeClass("overlay");
                });
            }
        });
    }
    setNavigationCloseHandler() {
    }
}

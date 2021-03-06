/**
 * View for the index-page.
 *
 * @see `/index.html` for the corresponding HTML-page.
 */
export default class DefaultView {
    // #region Initialization
    /**
     * Class constructor.
     */
    constructor() {
        this.currentPage = "home";
        this.setNavigationButtonHandler("home", this.currentPage, this.navigateTo, this.changeNavigationButtons);
        this.setNavigationButtonHandler("game", this.currentPage, this.navigateTo, this.changeNavigationButtons);
        this.setModalButtonHandler("rules", this.openModal);
        this.setModalButtonHandler("settings", this.openModal);
        this.setPopUpButtonHandler();
        this.setModalCloseHandler();
        this.setOverlayClickHandler();
        this.setWindowBackHandler();
        this.setWindowMessageHandler(this.navigateTo, this.changeNavigationButtons);
        this.firstTimeLoad();
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Navigates the user to the requested page.
     *
     * @param {string} page Page the user wants to navigate to.
     */
    navigateTo(page) {
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        $("#page-frame").removeClass("loaded");
        setTimeout(function () {
            $('#page-frame')[0].contentWindow.location.replace(`./src/html/${page}.html`);
            setTimeout(function () {
                $("#page-frame").addClass("loaded");
            }, 100);
        }, 400);
        $("#header-text").html(page);
        document.title = capitalize(page);
    }
    /**
     * Adds appropriate styling to the selected navigation button.
     *
     * @param {string} button Selected navigation button.
     */
    changeNavigationButtons(button) {
        $(".menu__button.red__button").removeClass("red__button");
        $(button).addClass("red__button");
    }
    /**
     * Navigates the user to the requested `modal`.
     *
     * @param {string} page `modal` the user wants to navigate to.
     */
    openModal(page) {
        $("#modal-frame")[0].contentWindow.location.replace(`./src/html/${page}.html`);
        $("#model-header").html(page);
        setTimeout(function () {
            $("modal").not("#pop-up").addClass("visible");
        }, 100);
    }
    /**
     * Sets internal `localStorage`-values on a first-time load.
     */
    firstTimeLoad() {
        if (localStorage.getItem("load") === null || !JSON.parse(localStorage.getItem("load"))) {
            $("#pop-up").addClass("visible");
            localStorage.setItem(0, "false");
            localStorage.setItem(1, "true");
            localStorage.setItem(2, "true");
            localStorage.setItem(3, "true");
            localStorage.setItem(0, "false");
            // Default players.
            localStorage.setItem("player1", "human");
            localStorage.setItem("player2", "dynamic");
            localStorage.setItem("load", "true");
        }
    }
    // #endregion
    // #region Events
    setNavigationButtonHandler(page, currentPage, navigationHandler, buttonHandler) {
        $(`#${page}-button`).bind("mouseup", function () {
            if (!$(this).hasClass("red__button")) {
                navigationHandler(page, currentPage);
                buttonHandler(this);
            }
        });
    }
    setModalButtonHandler(button, handler) {
        $(`#${button}-button`).bind("mouseup", function () {
            handler(button);
        });
    }
    setPopUpButtonHandler() {
        $("#about-button").bind("mouseup", function () {
            $("#pop-up").addClass("visible");
        });
    }
    setModalCloseHandler() {
        $(".close-button").bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
    setOverlayClickHandler() {
        $("#overlay").bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
    setWindowBackHandler() {
        window.onpopstate = function () {
            $("modal").removeClass("visible");
        };
        history.pushState({}, '');
    }
    setWindowMessageHandler(navigationHandler, buttonHandler) {
        $(window).on("message", function () {
            navigationHandler("game");
            buttonHandler($("#game-button"));
        });
    }
}

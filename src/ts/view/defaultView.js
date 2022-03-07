import Event from "../utility/event.js";

export default class DefaultView {
    // #region Initialization

    constructor() {
        this.messageEvent = new Event(); // TODO: More descriptive name `homeMessageEvent`?

        this.currentPage = "home";

        this.setNavigationButtonHandler("home", this.currentPage, this.navigateTo, this.changeNavigationButtons);
        this.setNavigationButtonHandler("game", this.currentPage, this.navigateTo, this.changeNavigationButtons);

        this.setModalButtonHandler("rules", this.openModal);
        this.setModalButtonHandler("settings", this.openModal);
        this.setPopUpButtonHandler();
        this.setModalCloseHandler();
        this.setOverlayClickHandler();
        this.setWindowBackHandler();
        this.setWindowMessageHandler(this.currentPage, this.navigateTo, this.changeNavigationButtons);

        this.firstTimeLoad();
    }

    // #endregion

    // #region Miscellaneous

    navigateTo(page, currentPage) {
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    
        $("#page-frame").removeClass("loaded");

            setTimeout(function() {
                //$("#page-frame").attr("src", `./src/html/${pageName}.html`)
                $('#page-frame')[0].contentWindow.location.replace(`./src/html/${page}.html`);

                setTimeout(function() {
                    $("#page-frame").addClass("loaded");
                }, 100);
            }, 400);

            $("#header-text").html(page);

            document.title = capitalize(page);
    }

    changeNavigationButtons(button) {
        $(".menu__button.red__button").removeClass("red__button");
        $(button).addClass("red__button");
    }

    openModal(page) {
        $("#modal-frame")[0].contentWindow.location.replace(`./src/html/${page}.html`);
        $("#modal-text").html(page); // TODO: Rename to `modal-header`.

        setTimeout(function() {
            $("modal").not("#pop-up").addClass("visible");
        }, 100);
    }

    firstTimeLoad() {
        if (localStorage.getItem("load") === null || !JSON.parse(localStorage.getItem("load"))) {
            $("#pop-up").addClass("visible");

            localStorage.setItem(0, "false");
            localStorage.setItem(1, "true");
            localStorage.setItem(2, "true");
            localStorage.setItem(3, "true");
            localStorage.setItem(0, "false");

            localStorage.setItem("load", "true");
        }
    }

    // #endregion

    // #region Events

    setNavigationButtonHandler(page, currentPage, navigationHandler, buttonHandler) {
        $(`#${page}-button`).bind("mouseup", function() {
            if (!$(this).hasClass("red__button")) {
                navigationHandler(page, currentPage);
                buttonHandler(this);
            }
        });
    }

    setModalButtonHandler(button, handler) {
        $(`#${button}-button`).bind("mouseup", function() {
            handler(button);
        });
    }

    setPopUpButtonHandler() {
        $("#about-button").bind("mouseup", function() {
            $("#pop-up").addClass("visible");
        });
    }

    setModalCloseHandler() {
        $(".close-button").bind("mouseup", function() {
            $("modal").removeClass("visible");
        });
    }

    setOverlayClickHandler() {
        $("#overlay").bind("mouseup", function() {
            $("modal").removeClass("visible");
        });
    }
    
    setWindowBackHandler() {
        window.onpopstate = function() {
            $("modal").removeClass("visible");
        }; 
        history.pushState({}, '');
    }

    setWindowMessageHandler(currentPage, navigationHandler, buttonHandler) {
        $(window).on("message", function() {
            navigationHandler("game", currentPage); // Navigate to `Game`-page.
            buttonHandler($("#game-button")); // Change to navigation-button.
        });
    }

    // #endregion
}
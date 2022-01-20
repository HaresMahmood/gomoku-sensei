import Event from "../utility/event.js";
import GamePage from "./pages/gamePage.js";
import HomePage from "./pages/homePage.js";
import RulesPage from "./pages/rulesPage.js";
import SettingsPage from "./pages/settingsPage.js";

export default class DefaultView {
    constructor() {
        this.messageEvent = new Event(); // TODO: More descriptive name `homeMessageEvent`?

        this.homePage = new HomePage(this, true);
        this.gamePage = new GamePage(this);
        this.rulesPage = new RulesPage(this);
        this.settingsPage = new SettingsPage(this);

        this.currentState = this.homePage;

        this.setNavigationButtonHandler("home", this.homePage, this.changeNavigationButtons);
        this.setNavigationButtonHandler("game", this.gamePage, this.changeNavigationButtons);

        this.setModalButtonHandler("rules", this.openModal);
        this.setModalButtonHandler("settings", this.openModal);
        this.setModalCloseHandler();
        this.setOverlayClickHandler();
        //this.setModalResizeHandler(this.resizeModal);

        this.setWindowMessageHandler(this.messageEvent, this.gamePage, this.changeNavigationButtons);
    }

    /*=== Miscellaneous ===*/

    navigateTo(page, pageName) {
        if (this.currentState !== page) {
            $("#page-frame").removeClass("loaded");

            setTimeout(function() {
                $("#page-frame").attr("src", `./src/html/${pageName}.html`)
                setTimeout(function() {
                    $("#page-frame").addClass("loaded");
                }, 50);
            }, 400);

            $("#header-text").html(pageName);
            this.currentState = page;
        }
    }

    changeNavigationButtons(button) {
        $(".menu__button.red__button").removeClass("red__button");
        $(button).addClass("red__button");
    }



    openModal(page) {
        $("#modal-frame").attr("src", `./src/html/${page}.html`);
        $("#modal-text").html(page); // TODO: Rename to `modal-header`.

        setTimeout(function() {
            $("modal").addClass("visible");
        }, 50);
    }

    resizeModal(iframe) {
        var rem = function rem() {
            var html = document.getElementsByTagName('html')[0];
    
            return function () {
                return parseInt(window.getComputedStyle(html)['fontSize']);
            }
        }();

        if (!window.matchMedia("(max-width: 600px)").matches) {
            const height = $(iframe).contents().find("body > section").length * (rem() * 1.5);

            $(iframe).css("height", $(iframe).contents().height());

        }
        else {
            $(iframe).css("height", "");
        }
    }

    /*=== Events ===*/

    setNavigationButtonHandler(button, state, handler) {
        $(`#${button}-button`).bind("mouseup", function() {
            state.navigateTo();
            handler(this);
        });
    }

    setModalButtonHandler(button, handler) {
        $(`#${button}-button`).bind("mouseup", function() {
            handler(button);
        });
    }

    setModalCloseHandler() {
        $(`#close-button`).bind("mouseup", function() {
            $("modal").removeClass("visible");
        });
    }

    setOverlayClickHandler() {
        $(`#overlay`).bind("mouseup", function() {
            $("modal").removeClass("visible");
        });
    }

    setModalResizeHandler(handler) {
        $("#modal-frame").on("load", function() {
            handler(this);
        })

        $(window).on("resize", function() {
            handler("#modal-frame");
        });
    }


    setWindowMessageHandler(event, state, handler) {
        $(window).on("message", function (e) {
            state.navigateTo(); // Navigate to `Game`-page.
            handler($("#game-button")); // Change to navigation-button.

            event.trigger(e.originalEvent.data); // Pass player information to `defaultScript`.
        });
    }
}
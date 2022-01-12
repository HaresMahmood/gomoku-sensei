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
        this.setModalLoadHandler();
        this.setOverlayClickHandler();
        this.setWindowMessageHandler(this.messageEvent, this.gamePage, this.changeNavigationButtons);
    }
    /*=== Miscellaneous ===*/
    navigateTo(page, pageName) {
        if (this.currentState !== page) {
            $("#page-frame").removeClass("loaded");
            setTimeout(function () {
                $("#page-frame").attr("src", `./src/html/${pageName}.html`);
                setTimeout(function () {
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
        $("modal").addClass("visible");
    }
    /*=== Events ===*/
    setNavigationButtonHandler(button, state, handler) {
        $(`#${button}-button`).bind("mouseup", function () {
            state.navigateTo();
            handler(this);
        });
    }
    setModalButtonHandler(button, handler) {
        $(`#${button}-button`).bind("mouseup", function () {
            handler(button);
        });
    }
    setOverlayClickHandler() {
        $(`#overlay`).bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
    setModalLoadHandler() {
        $("modal > iframe").on("load", function () {
            this.style.height = this.contentWindow.document.body.scrollHeight + "px";
            $(this).contents().find("body").on("click", "#close-button", function () {
                $("modal").removeClass("visible");
            });
        });
    }
    setDocumentResizeHandler(handler) {
        $(window).on("resize", function () {
            const modal = $("body").find("modal.visible").attr('id'); // TODO: Looking for modal every time window is resized - not good!
            if (modal !== undefined) {
                handler(`#${modal}`);
            }
        });
    }
    setWindowMessageHandler(event, state, handler) {
        $(window).on("message", function (e) {
            state.navigateTo(); // Navigate to `Game`-page.
            handler($("#game-button")); // Change to navigation-button.
            // (TODO: is this bad?) When page is done loading, ...
            setTimeout(function () {
                event.trigger(e.originalEvent.data); // Pass player information to `defaultScript`.
            }, 1000);
        });
    }
}

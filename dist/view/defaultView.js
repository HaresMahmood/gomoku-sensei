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
        // this.setNavigationButtonHandler("rules", this.rulesPage, this.changeNavigationButtons);
        // this.setNavigationButtonHandler("settings", this.settingsPage, this.changeNavigationButtons);
        this.setRulesModalOpenHandler(this.openModal);
        this.setSettingsModalOpenHandler(this.openModal);
        this.setModalLoadHandler(this.resizeModal, this.closeModal);
        this.setOverlayClickHandler();
        // this.setDocumentResizeHandler(this.resizeModal);
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
    resizeModal(modal) {
        const windowWidth = $(window).innerWidth();
        const iframe = $(modal).find("iframe");
        // TODO: Get `550` value from media breakpoint.
        const height = windowWidth > 600 ? $(iframe).contents().find("body").height() : $(window).innerHeight();
        $(iframe).height(height);
    }
    openModal(modal) {
        //this.resizeModal(modal);
        $(modal).addClass("visible");
    }
    /*=== Events ===*/
    setNavigationButtonHandler(button, state, handler) {
        $(`#${button}-button`).bind("mouseup", function () {
            state.navigateTo();
            handler(this);
        });
    }
    setRulesModalOpenHandler(handler) {
        $("#rules-button").bind("click", function () {
            handler("#rules-page");
        });
    }
    setSettingsModalOpenHandler(handler) {
        $("#settings-button").bind("click", function () {
            handler("#settings-page");
        });
    }
    setOverlayClickHandler() {
        $(`#overlay`).bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
    setModalLoadHandler(loadHandler, buttonHandler) {
        $("modal > iframe").on("load", function () {
            const modal = $(this).parent().attr('id');
            loadHandler(`#${modal}`);
            $(this).contents().find("body").on("click", "#back-button", function () {
                buttonHandler(`#${modal}`);
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

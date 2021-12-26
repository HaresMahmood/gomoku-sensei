import GamePage from "../pages/gamePage.js";
import HomePage from "../pages/homePage.js";
import "../pages/page.js";

export default class DefaultView {
    constructor(page) {
        this.homePage = new HomePage(this, true);
        this.gamePage = new GamePage(this);

        this.currentState = this.homePage;

        this.setNavigationButtonHandler("home", this.homePage, this.changeNavigationButtons);
        this.setNavigationButtonHandler("game", this.gamePage, this.changeNavigationButtons);

        this.setRulesModalOpenHandler(this.openModal);
        this.setSettingsModalOpenHandler(this.openModal);
        this.setModalLoadHandler(this.resizeModal, this.closeModal);

        this.setDocumentResizeHandler(this.resizeModal);
        
    }

    /*=== Miscellaneous ===*/

    navigateTo(page, pageName) {
        if (this.currentState !== page) {
            $("#page-frame").removeClass("loaded");

            setTimeout(function() {
                $("#page-frame").attr("src", `../src/html/${pageName}.html`)
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




    resizeModal(modal) {
        const windowWidth = $(window).innerWidth();
        const iframe = $(modal).find("iframe");

        // TODO: Get `550` value from media breakpoint.
        const height = windowWidth > 600 ? $(iframe).contents().find("body").height() : $(window).innerHeight();

        $(iframe).height(height);
    }

    openModal(modal) {
        //this.resizeModal(modal);

        $("nav").removeClass("visible");
        $(modal).addClass("visible");
    }

    closeModal(modal) {
        $(modal).removeClass("visible");
        $("body").children().not("nav, modal").toggleClass("overlay");
        $("body").toggleClass("overlay");
    }

    /*=== Events ===*/

    setNavigationButtonHandler(button, state, handler) {
        $(`#${button}-button`).bind("mouseup", function() {
            state.navigateTo();
            handler(this);
        });
    }



    setRulesModalOpenHandler(handler) {
        $("#rules-button").bind("click", function() {
            handler("#rules-page");
        });
    }

    setSettingsModalOpenHandler(handler) {
        $("#settings-button").bind("click", function() {
            handler("#settings-page");
        });
    }

    setModalLoadHandler(loadHandler, buttonHandler) {
        $("modal > iframe").on("load", function() {
            const modal = $(this).parent().attr('id');

            loadHandler(`#${modal}`);

            $(this).contents().find("body").on("click", "#back-button", function() {
                buttonHandler(`#${modal}`);
            });
        })
    }

    setDocumentResizeHandler(handler) {
        $(window).on("resize", function() {
            const modal = $("body").find("modal.visible").attr('id'); // TODO: Looking for modal every time window is resized - not good!
            
            if (modal !== undefined) {
                handler(`#${modal}`);
            }
        });
    }
}
export default class DefaultView {
    constructor(page) {
        this.drawNavigation(page);
        this.drawSettingsModal();
        this.drawRulesModal();

        this.setNavigationToggleHandler(this.toggleNavigation); // Setting event-handler here, so that only the minimum amount of information is shown to Controller.
        this.openRulesModalHandler();
        this.openSettingsModalHandler();
    }

    drawNavigation(page) {
        console.log(page);
        // TODO: Export to `.txt`-file?
        let navigation = `<nav> <section class="header__container"> <span id="menu-close-button" class="material-icons-round"> menu_open </span> <h3> ${page} </h3> </section> <section> <div> <h6> Menu </h6> <button class="menu__button red__button"> <span class="material-icons-round"> home </span> <span> Home </span> </button> <button class="menu__button"> <span class="material-icons-round"> gamepad </span> <span> Game </span> </button> <button id="rules-button" class="menu__button"> <span class="material-icons-round"> gavel </span> <span> Rules </span> </button> <button id="settings-button" class="menu__button"> <span class="material-icons-round"> settings </span> <span> Settings </span> </button> </div><div> <h6> actions </h6> <div class="row__container"> <button class="menu__button"> <span class="material-icons-round"> bolt </span> <span> New game </span> </button> <button class="menu__button"> <span class="material-icons-round"> lightbulb </span> <span> Hint </span> </button> </div><div class="row__container"> <button class="menu__button"> <span class="material-icons-round"> undo </span> <span> Undo </span> </button> <button disabled class="menu__button"> <span class="material-icons-round"> redo </span> <span> Redo </span> </button> </div></div></section> </nav>`
        
        $("body").append(navigation);
    }

    drawSettingsModal() {
        let modal = `<modal id="rules-page"> <iframe src="./src/html/rules.html" frameborder="0" scrolling="no" onload="this.style.height=(this.contentWindow.document.body.scrollHeight)+'px';"> </iframe> </modal>`;
    
        $("body").append(modal);
    }

    drawRulesModal() {
        let modal = `<modal id="settings-page"> <iframe src="./src/html/settings.html" frameborder="0" scrolling="no" onload="this.style.height=(this.contentWindow.document.body.scrollHeight)+'px';"> </iframe> </modal>`;
    
        $("body").append(modal);
    }

    toggleNavigation() {
        $("nav").toggleClass("visible");
        $("body").children().not("nav, modal").toggleClass("overlay");
        $("body").toggleClass("overlay");
    }

    /*--- Events ---*/

    // TODO: #close-menu-button
    setNavigationToggleHandler(handler) {
        $("#menu-button, #menu-close-button").bind("click", handler);
    }

    openRulesModalHandler() {
        $("#rules-button").bind("click", function() {
            $("nav").removeClass("visible");
            $("#rules-page").addClass("visible");
        });
    }

    openSettingsModalHandler() {
        $("#settings-button").bind("click", function() {
            $("nav").removeClass("visible");
            $("#settings-page").addClass("visible");
        });
    }
}
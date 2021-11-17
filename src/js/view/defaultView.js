export default class DefaultView {
    constructor(page) {
        this.drawNavigation(page);
    }

    drawNavigation(page) {
        // TODO: Export to `.txt`-file?
        let navigation = `<nav> <section> <h3> ${page} </h3> </section> <section> <div> <h6> Menu </h6> <button class="menu__button"> <span class="material-icons-round red__button"> home </span> <span> Home </span> </button> <button class="menu__button"> <span class="material-icons-round"> gamepad </span> <span> Game </span> </button> <button id="rules-button" class="menu__button"> <span class="material-icons-round"> gavel </span> <span> Rules </span> </button> <button id="settings-button" class="menu__button"> <span class="material-icons-round"> settings </span> <span> Settings </span> </button> </div><div> <h6> actions </h6> <div class="row__container"> <button class="menu__button"> <span class="material-icons-round"> bolt </span> <span> New game </span> </button> <button class="menu__button"> <span class="material-icons-round"> lightbulb </span> <span> Hint </span> </button> </div><div class="row__container"> <button class="menu__button"> <span class="material-icons-round"> undo </span> <span> Undo </span> </button> <button disabled class="menu__button"> <span class="material-icons-round"> redo </span> <span> Redo </span> </button> </div></div></section> </nav>`
        
        $("body").append(navigation);
    }

    drawSettingsModal() {}

    drawRulesModal() {}

    toggleNavigation() {
        $("nav").toggleClass("visible");
        $("body").children().not("nav, modal").toggleClass("overlay");
        $("body").toggleClass("overlay");
    }

    setNavigationOpenHandler() {
        $("#menu-button").bind("click", function() {


            // Slide back menu on `back` key press.
            if (window.history && window.history.pushState) {
                window.history.pushState('forward', null, './#forward'); // Ensure browser doesn't go back in history.
      
                $(window).on('popstate', function() {
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
export default class HomeView {
    setNavigationHandler() {
        $("#menu-button").click(function() {
            $("nav").addClass("visible"); // Make menu visible.
            $("body").children().not("navigation").addClass("overlay"); // Add blur to background.
      
            // Slide back menu on `back` key press.
            if (window.history && window.history.pushState) {
                window.history.pushState('forward', null, './#forward'); // Ensure browser doesn't go back in history.
      
                $(window).on('popstate', function() {
                    // Do opposite of above.
                    $("nav").removeClass("visible");
                    $("body").children().not(".menu").removeClass("overlay");
                });
            }
        });
    }
}
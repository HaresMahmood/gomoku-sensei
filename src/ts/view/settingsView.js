export default class SettingsView {
    constructor() {
        this.initializeSwitches();
        this.setSaveButtonHandler();
    }

    initializeSwitches() {
        $("input[type=checkbox]").each(function () {
            // TODO: Introduce variable.
            if (localStorage.getItem($(this).attr('name')) === "true") {
                $(this).prop("checked", true);
            }
            else {
                $(this).prop("checked", false);
            }
        });
    }

    setSaveButtonHandler() {
        $("#save-button").on("click", function() {
            $("input[type=checkbox]").each(function () {
                localStorage.setItem($(this).attr("name"), `${$(this).is(":checked")}`); 
            });
        });
    }
}
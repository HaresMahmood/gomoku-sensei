export default class SettingsView {
    constructor() {
        this.initializeSwitches();
        this.setSaveButtonHandler();
    }
    initializeSwitches() {
        $("input[type=checkbox]").each(function (index) {
            $(this).prop("checked", JSON.parse(localStorage.getItem(index)));
        });
    }
    // TODO: Save switches `onChange`.
    setSaveButtonHandler() {
        $("#save-button").on("click", function () {
            $("input[type=checkbox]").each(function (index) {
                localStorage.setItem(index, `${$(this).is(":checked")}`);
            });
        });
    }
}

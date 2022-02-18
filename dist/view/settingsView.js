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
        $("input[type=checkbox]").change(function () {
            localStorage.setItem($("input[type=checkbox]").index(this), `${this.checked}`);
            console.log($("input[type=checkbox]").index(this), localStorage.getItem($("input[type=checkbox]").index(this)));
        });
    }
}

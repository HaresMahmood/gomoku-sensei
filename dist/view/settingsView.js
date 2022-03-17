export default class SettingsView {
    constructor() {
        this.deferredPrompt;
        this.initializeSwitches();
        this.setSaveButtonHandler();
    }
    initializeSwitches() {
        $("input[type=checkbox]").each(function (index) {
            $(this).prop("checked", JSON.parse(localStorage.getItem(index)));
        });
    }
    // #region Events
    setSaveButtonHandler() {
        $("input[type=checkbox]").change(function () {
            localStorage.setItem($("input[type=checkbox]").index(this), `${this.checked}`);
        });
    }
}

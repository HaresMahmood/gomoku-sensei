/**
 * View for the Settings-page.
 *
 * @see `/html/settings.html` for the orresponding HTML-page.
 */
export default class SettingsView {
    // #region Initialization 
    /**
     * Class constructor.
     */
    constructor() {
        this.deferredPrompt;
        this.initializeSwitches();
        this.setSaveButtonHandler();
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Sets `switch`-component state by retrieving corresponding
     * `localStorage`-value.
     */
    initializeSwitches() {
        $("input[type=checkbox]").each(function (index) {
            $(this).prop("checked", JSON.parse(localStorage.getItem(index)));
        });
    }
    // #endregion
    // #region Events
    /**
     * Saves the clicked `switch`-component's value to `localStorage`.
     */
    setSaveButtonHandler() {
        $("input[type=checkbox]").change(function () {
            localStorage.setItem($("input[type=checkbox]").index(this), `${this.checked}`);
        });
    }
}

export default class SettingsView {
    constructor() {
        this.deferredPrompt;

        this.initializeSwitches();
        this.setSaveButtonHandler();
        this.setInstallPromptHandler(this.deferredPrompt);
        this.showInstallPromptHandler(this.deferredPrompt);
    }

    initializeSwitches() {
        $("input[type=checkbox]").each(function(index) {
            $(this).prop("checked", JSON.parse(localStorage.getItem(index)));
        });
    }

    // #region Events
    
    setSaveButtonHandler() {
        $("input[type=checkbox]").change(function() {
            localStorage.setItem($("input[type=checkbox]").index(this), `${this.checked}`);
        });
    }

    setInstallPromptHandler(deferredPrompt) {
        window.addEventListener("beforeinstallprompt", (e) => {
            $("#install-container").show();
            deferredPrompt = e;
        });
    }

    showInstallPromptHandler(deferredPrompt) {
        $("#install-button").bind("mouseup", function() {
            console.log("install");

            if (deferredPrompt !== null) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                }
            }
        });
    }

    // #endregion
}
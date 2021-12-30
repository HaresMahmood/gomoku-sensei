import DefaultView from "../view/defaultView.js";
$(document).ready(function () {
    const view = new DefaultView("Home");
    view.messageEvent.addListener(data => test(data));
});
function test(data) {
    const pageFrame = document.getElementById("page-frame");
    pageFrame.contentWindow.postMessage(data, "*");
}

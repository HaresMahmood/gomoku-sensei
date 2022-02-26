import DefaultView from "../view/defaultView.js";
// TODO: Global variable bad!
var playerData;
$(document).ready(function () {
    const view = new DefaultView("Home");
    view.messageEvent.addListener(data => playerData = data);
});
$(window).on("message", function (e) {
    const pageFrame = document.getElementById("page-frame");
    pageFrame.contentWindow.postMessage(playerData, "*");
});

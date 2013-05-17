function Controller() {
    function sendClient() {
        var API_TEST = Ti.Network.createHTTPClient();
        API_TEST.onload = function() {
            Ti.API.info("Word.");
            alert("Response Received.");
            Ti.API.info(this.responseText);
        };
        var newAPI = "http://www.talkivi.org/talkivi-server/ws/formscat?format=JSON";
        API_TEST.open("POST", newAPI);
        Ti.API.info("Word?");
        API_TEST.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Splash Screen",
        id: "label"
    });
    $.__views.main.add($.__views.label);
    $.__views.theButton = Ti.UI.createButton({
        left: "20dp",
        bottom: "20dp",
        title: "Send Client",
        id: "theButton"
    });
    $.__views.main.add($.__views.theButton);
    sendClient ? $.__views.theButton.addEventListener("click", sendClient) : __defers["$.__views.theButton!click!sendClient"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.main.open();
    __defers["$.__views.theButton!click!sendClient"] && $.__views.theButton.addEventListener("click", sendClient);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
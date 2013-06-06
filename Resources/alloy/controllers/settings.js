function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.settingsWindow = Ti.UI.createWindow({
        id: "settingsWindow",
        title: "Settings"
    });
    $.__views.__alloyId14 = Ti.UI.createLabel({
        text: "Settings",
        id: "__alloyId14"
    });
    $.__views.settingsWindow.add($.__views.__alloyId14);
    $.__views.settingsTab = Ti.UI.createTab({
        window: $.__views.settingsWindow,
        id: "settingsTab",
        title: "Settings",
        icon: "cog_wheel.png"
    });
    $.__views.settingsTab && $.addTopLevelView($.__views.settingsTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
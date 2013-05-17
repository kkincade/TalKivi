function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId4 = Alloy.createController("forms", {
        id: "__alloyId4"
    });
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.__alloyId4.getViewEx({
            recurse: true
        }),
        title: "Forms",
        icon: "kiwi.png",
        id: "__alloyId3"
    });
    $.__views.index.addTab($.__views.__alloyId3);
    $.__views.__alloyId7 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Data",
        id: "__alloyId7"
    });
    $.__views.__alloyId8 = Alloy.createController("data", {
        id: "__alloyId8",
        __parentSymbol: $.__views.__alloyId7
    });
    $.__views.__alloyId8.setParent($.__views.__alloyId7);
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7,
        title: "Data",
        icon: "globe_green.png",
        id: "__alloyId6"
    });
    $.__views.index.addTab($.__views.__alloyId6);
    $.__views.__alloyId10 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Settings",
        id: "__alloyId10"
    });
    $.__views.__alloyId11 = Alloy.createController("settings", {
        id: "__alloyId11",
        __parentSymbol: $.__views.__alloyId10
    });
    $.__views.__alloyId11.setParent($.__views.__alloyId10);
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.__alloyId10,
        title: "Settings",
        icon: "cog_wheel.png",
        id: "__alloyId9"
    });
    $.__views.index.addTab($.__views.__alloyId9);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
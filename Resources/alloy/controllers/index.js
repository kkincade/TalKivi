function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId6 = Alloy.createController("forms", {
        id: "__alloyId6"
    });
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6.getViewEx({
            recurse: true
        }),
        title: "Forms",
        icon: "kiwi.png",
        id: "__alloyId5"
    });
    $.__views.index.addTab($.__views.__alloyId5);
    $.__views.__alloyId8 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Data",
        id: "__alloyId8"
    });
    $.__views.__alloyId9 = Alloy.createController("data", {
        id: "__alloyId9",
        __parentSymbol: $.__views.__alloyId8
    });
    $.__views.__alloyId9.setParent($.__views.__alloyId8);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Data",
        icon: "globe_green.png",
        id: "__alloyId7"
    });
    $.__views.index.addTab($.__views.__alloyId7);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Settings",
        id: "__alloyId11"
    });
    $.__views.__alloyId12 = Alloy.createController("settings", {
        id: "__alloyId12",
        __parentSymbol: $.__views.__alloyId11
    });
    $.__views.__alloyId12.setParent($.__views.__alloyId11);
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Settings",
        icon: "cog_wheel.png",
        id: "__alloyId10"
    });
    $.__views.index.addTab($.__views.__alloyId10);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
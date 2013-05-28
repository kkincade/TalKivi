function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.formsTab = Alloy.createController("forms", {
        id: "formsTab"
    });
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.formsTab.getViewEx({
            recurse: true
        }),
        title: "Forms",
        icon: "kiwi.png",
        id: "__alloyId9"
    });
    $.__views.index.addTab($.__views.__alloyId9);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Data",
        id: "__alloyId11"
    });
    $.__views.__alloyId12 = Alloy.createController("data", {
        id: "__alloyId12",
        __parentSymbol: $.__views.__alloyId11
    });
    $.__views.__alloyId12.setParent($.__views.__alloyId11);
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Data",
        icon: "globe_green.png",
        id: "__alloyId10"
    });
    $.__views.index.addTab($.__views.__alloyId10);
    $.__views.__alloyId14 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Settings",
        id: "__alloyId14"
    });
    $.__views.__alloyId15 = Alloy.createController("settings", {
        id: "__alloyId15",
        __parentSymbol: $.__views.__alloyId14
    });
    $.__views.__alloyId15.setParent($.__views.__alloyId14);
    $.__views.__alloyId13 = Ti.UI.createTab({
        window: $.__views.__alloyId14,
        title: "Settings",
        icon: "cog_wheel.png",
        id: "__alloyId13"
    });
    $.__views.index.addTab($.__views.__alloyId13);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.removeProperty("activeTemplates");
    null == Ti.App.Properties.getList("activeTemplates") && Ti.App.Properties.setList("activeTemplates", []);
    null == Ti.App.Properties.getList("completedForms") && Ti.App.Properties.setList("completedForms", []);
    null == Ti.App.Properties.getList("settings") && Ti.App.Properties.setList("settings", []);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
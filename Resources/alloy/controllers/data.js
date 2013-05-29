function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.dataWindow = Ti.UI.createWindow({
        id: "dataWindow",
        title: "Data"
    });
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Data",
        id: "__alloyId0"
    });
    $.__views.dataWindow.add($.__views.__alloyId0);
    $.__views.dataTab = Ti.UI.createTab({
        window: $.__views.dataWindow,
        id: "dataTab",
        title: "Data",
        icon: "globe_green.png"
    });
    $.__views.dataTab && $.addTopLevelView($.__views.dataTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
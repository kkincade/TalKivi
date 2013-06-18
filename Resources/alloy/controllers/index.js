function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId11 = Alloy.createController("forms", {
        id: "__alloyId11"
    });
    $.__views.index.addTab($.__views.__alloyId11.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId12 = Alloy.createController("data", {
        id: "__alloyId12"
    });
    $.__views.index.addTab($.__views.__alloyId12.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId13 = Alloy.createController("settings", {
        id: "__alloyId13"
    });
    $.__views.index.addTab($.__views.__alloyId13.getViewEx({
        recurse: true
    }));
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.removeProperty("activeTemplates");
    Ti.App.Properties.removeProperty("completedForms");
    null == Ti.App.Properties.getList("activeTemplates") && Ti.App.Properties.setList("activeTemplates", []);
    null == Ti.App.Properties.getList("completedForms") && Ti.App.Properties.setList("completedForms", []);
    null == Ti.App.Properties.getList("settings") && Ti.App.Properties.setList("settings", []);
    null == Ti.App.Properties.getInt("TDP_INCREMENT") && Ti.App.Properties.setInt("TDP_INCREMENT", 0);
    Ti.App.fireEvent("populateTemplates");
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
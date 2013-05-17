function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.data = Ti.UI.createView({
        backgroundColor: "white",
        id: "data"
    });
    $.__views.data && $.addTopLevelView($.__views.data);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Data",
        id: "__alloyId0"
    });
    $.__views.data.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
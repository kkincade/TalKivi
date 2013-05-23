function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.downloadForms = Ti.UI.createView({
        backgroundColor: "white",
        id: "downloadForms"
    });
    $.__views.downloadForms && $.addTopLevelView($.__views.downloadForms);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "Download Forms here",
        id: "__alloyId1"
    });
    $.__views.downloadForms.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
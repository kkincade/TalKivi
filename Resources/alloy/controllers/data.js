function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.dataWindow = Ti.UI.createWindow({
        id: "dataWindow"
    });
    $.__views.dataTab = Ti.UI.createTab({
        window: $.__views.dataWindow,
        id: "dataTab",
        title: "Data",
        icon: "globe_green.png"
    });
    $.__views.dataTab && $.addTopLevelView($.__views.dataTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tabbedBar = Ti.UI.iOS.createTabbedBar({
        labels: [ "List", "Map" ],
        index: 0,
        top: 50,
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        height: 25,
        width: 150
    });
    tabbedBar.addEventListener("click", function() {
        if (0 == tabbedBar.index) $.dataList = Alloy.createController("dataList"); else {
            var mapView = Alloy.createController("dataMap").getView();
            $.dataWindow.add(mapView);
        }
    });
    $.dataWindow.setTitleControl(tabbedBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
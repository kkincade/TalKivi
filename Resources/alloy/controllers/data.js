function Controller() {
    function editFormsButtonClicked() {
        if (listView.completedFormsTableView.editing) {
            $.editFormsButton.title = "Edit";
            listView.completedFormsTableView.editing = false;
        } else if (listView.completedFormsTableView.sections.length > 0) {
            $.editFormsButton.title = "Done";
            listView.completedFromsTableView.editing = true;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dataWindow = Ti.UI.createWindow({
        id: "dataWindow"
    });
    $.__views.editFormsButton = Ti.UI.createButton({
        id: "editFormsButton",
        title: "Edit"
    });
    editFormsButtonClicked ? $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked) : __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] = true;
    $.__views.dataWindow.leftNavButton = $.__views.editFormsButton;
    $.__views.dataTab = Ti.UI.createTab({
        window: $.__views.dataWindow,
        id: "dataTab",
        title: "Data",
        icon: "globe_green.png"
    });
    $.__views.dataTab && $.addTopLevelView($.__views.dataTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var listView = Alloy.createController("dataList").getView();
    var mapView = Alloy.createController("dataMap").getView();
    $.dataWindow.add(listView);
    $.dataWindow.add(mapView);
    mapView.hide();
    var tabbedBar = Ti.UI.iOS.createTabbedBar({
        labels: [ "List", "Map" ],
        index: 0,
        top: 50,
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        height: 25,
        width: 150
    });
    tabbedBar.addEventListener("click", function() {
        if (0 == tabbedBar.index) {
            listView.show();
            mapView.hide();
        } else {
            listView.hide();
            mapView.show();
        }
    });
    $.dataWindow.setTitleControl(tabbedBar);
    __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] && $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
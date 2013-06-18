function Controller() {
    function toggleView() {
        if ($.mapView.visible) {
            $.completedFormsTableView.visible = true;
            $.mapView.visible = false;
        } else {
            $.completedFormsTableView.visible = false;
            $.mapView.visible = true;
        }
    }
    function loadFormsIntoList() {
        var completedForms = Ti.App.Properties.getList("completedForms");
        var formsToDisplay = [];
        for (var i = 0; completedForms.length > i; ++i) {
            var label = Ti.UI.createLabel({
                id: i,
                text: completedForms[i],
                color: "black"
            });
            var formTableViewRow = Ti.UI.createTableViewRow({
                id: i,
                label: label,
                height: "40dp",
                backgroundColor: "white",
                hasDetail: true,
                backgroundSelectedColor: "gray",
                className: "someTableViewRow"
            });
            formTableViewRow.label.color = "white";
            formTableViewRow.backgroundColor = "black";
            formTableViewRow.hasChild = true;
            formTableViewRow.add(label);
            formsToDisplay.push(formTableViewRow);
        }
        $.completedFormsTableView.data = formsToDisplay;
        $.completedFormsTableView.editable = true;
        $.completedFormsTableView.moveable = true;
    }
    function plotPointsOnMap() {
        var completedForms = Ti.App.Properties.getList("completedForms");
        var annotations = [];
        for (var i = 0; completedForms.length > i; ++i) {
            var completedForm = Ti.App.Properties.getObject(completedForms[i]);
            var index = null;
            var originalForm = Ti.App.Properties.getObject(completedForm.formName);
            for (var i = 0; originalForm.talkiviFormItemSet.length > i; i++) if ("Location" == originalForm.talkiviFormItemSet[i].talkiviField.field_type) {
                index = i;
                break;
            }
            if (null != index) {
                var newAnnotation = Ti.Map.createAnnotation({
                    latitude: completedForm.fields[index].latitude,
                    longitude: completedForm.fields[index].longitude,
                    title: completedForm.TDP_id,
                    pincolor: Ti.Map.ANNOTATION_RED,
                    animate: true
                });
                annotations.push(newAnnotation);
            }
        }
        $.mapView.annotations = annotations;
    }
    function deleteForm(event) {
        var forms = Ti.App.Properties.getList("completedForms");
        forms.splice(forms.indexOf(event.rowData.label.text), 1);
        Ti.App.Properties.setList("completedForms", forms);
    }
    function editFormsButtonClicked() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dataWindow = Ti.UI.createWindow({
        id: "dataWindow"
    });
    $.__views.completedFormsTableView = Ti.UI.createTableView({
        id: "completedFormsTableView",
        visible: "true"
    });
    $.__views.dataWindow.add($.__views.completedFormsTableView);
    var __alloyId1 = [];
    $.__views.mapView = Ti.Map.createView({
        annotations: __alloyId1,
        id: "mapView",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        visible: "false",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.dataWindow.add($.__views.mapView);
    $.__views.dataTab = Ti.UI.createTab({
        window: $.__views.dataWindow,
        id: "dataTab",
        title: "Data",
        icon: "globe_ios.png"
    });
    $.__views.dataTab && $.addTopLevelView($.__views.dataTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mapView.visible = false;
    $.mapView.bottom = "55dp";
    $.dataTab.icon = "globe_android.png";
    $.dataTab.addEventListener("focus", function() {
        loadFormsIntoList();
        plotPointsOnMap();
    });
    var spacer = Math.round(.5 * Ti.Platform.displayCaps.platformWidth);
    var height = Math.round(.055 * Ti.Platform.displayCaps.platformHeight);
    var width = spacer - 4;
    var tabBar = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: height,
        left: "0dp",
        bottom: "0dp",
        backgroundColor: "transparent"
    });
    $.dataWindow.add(tabBar);
    var listViewTab = Ti.UI.createView({
        width: width,
        height: height,
        left: "2dp",
        bottom: "2dp",
        backgroundColor: "#333",
        borderRadius: "2dp"
    });
    var listViewTabLabel = Ti.UI.createLabel({
        text: "List View",
        color: "#FFF"
    });
    listViewTab.add(listViewTabLabel);
    $.dataWindow.add(listViewTab);
    var mapViewTab = Ti.UI.createView({
        width: width,
        height: height,
        left: spacer,
        bottom: "2dp",
        backgroundColor: "#000"
    });
    var mapViewTabLabel = Ti.UI.createLabel({
        text: "Map View",
        color: "#777"
    });
    mapViewTab.add(mapViewTabLabel);
    $.dataWindow.add(mapViewTab);
    var currTab = listViewTab;
    listViewTab.addEventListener("click", function() {
        if (currTab != this) {
            currTab.backgroundColor = "#000";
            currTab.children[0].color = "#777";
            this.backgroundColor = "#333";
            this.children[0].color = "#FFF";
            currTab = this;
            toggleView();
        }
    });
    mapViewTab.addEventListener("click", function() {
        if (currTab != this) {
            currTab.backgroundColor = "#000";
            currTab.children[0].color = "#777";
            this.backgroundColor = "#333";
            this.children[0].color = "#FFF";
            currTab = this;
            toggleView();
        }
    });
    $.completedFormsTableView.addEventListener("click", function(event) {
        var controller = Alloy.createController("editForm", {
            formID: event.rowData.label.text
        }).getView();
        $.dataTab.open(controller);
    });
    $.completedFormsTableView.addEventListener("delete", function(event) {
        deleteForm(event);
        loadFormsIntoList();
    });
    $.completedFormsTableView.addEventListener("longpress", function(event) {
        if (null != event.rowData) {
            var dialog = Ti.UI.createAlertDialog({
                message: "Delete " + event.rowData.label.text + "?",
                buttonNames: [ "Delete", "Cancel" ]
            });
            dialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    deleteForm(event);
                    loadFormsIntoList();
                }
            });
            dialog.show();
        }
    });
    __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] && $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
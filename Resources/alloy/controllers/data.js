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
                text: Ti.App.Properties.getObject(completedForms[i]).displayName,
                color: "black"
            });
            var formTableViewRow = Ti.UI.createTableViewRow({
                id: i,
                TDP_id: Ti.App.Properties.getObject(completedForms[i]).TDP_id,
                label: label,
                height: "40dp",
                backgroundColor: "white",
                hasDetail: true,
                backgroundSelectedColor: "gray",
                className: "someTableViewRow"
            });
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
                    title: completedForm.displayName,
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
        forms.splice(forms.indexOf(event.rowData.TDP_id), 1);
        Ti.App.Properties.setList("completedForms", forms);
    }
    function editFormsButtonClicked() {
        if ($.completedFormsTableView.editing) {
            $.editFormsButton.title = "Edit";
            $.completedFormsTableView.editing = false;
        } else if ($.completedFormsTableView.sections.length > 0) {
            $.editFormsButton.title = "Done";
            $.completedFormsTableView.editing = true;
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
    $.dataTab.addEventListener("focus", function() {
        loadFormsIntoList();
        plotPointsOnMap();
    });
    var tabbedBar = Ti.UI.iOS.createTabbedBar({
        labels: [ "List", "Map" ],
        index: "0dp",
        top: "50dp",
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        height: "25dp",
        width: "150dp"
    });
    tabbedBar.addEventListener("click", function() {
        toggleView();
    });
    $.dataWindow.setTitleControl(tabbedBar);
    $.completedFormsTableView.addEventListener("click", function(event) {
        var controller = Alloy.createController("editForm", {
            formID: event.rowData.TDP_id
        }).getView();
        $.dataTab.open(controller);
    });
    $.completedFormsTableView.addEventListener("delete", function(event) {
        deleteForm(event);
        loadFormsIntoList();
    });
    $.completedFormsTableView.addEventListener("longpress", function(event) {
    });
    __defers["$.__views.editFormsButton!click!editFormsButtonClicked"] && $.__views.editFormsButton.addEventListener("click", editFormsButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
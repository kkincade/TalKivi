function Controller() {
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
                backgroundSelectedColor: "gray"
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
        id: "completedFormsTableView"
    });
    $.__views.dataWindow.add($.__views.completedFormsTableView);
    $.__views.dataTab = Ti.UI.createTab({
        window: $.__views.dataWindow,
        id: "dataTab",
        title: "Data",
        icon: "globe_green.png"
    });
    $.__views.dataTab && $.addTopLevelView($.__views.dataTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loadFormsIntoList();
    $.completedFormsTableView.show();
    $.completedFormsTableView.addEventListener("delete", function(event) {
        deleteForm(event);
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
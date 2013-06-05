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
            var singleTemplate = Ti.UI.createTableViewRow({
                id: i,
                label: label,
                height: "40dp",
                backgroundColor: "white",
                hasDetail: true,
                backgroundSelectedColor: "gray"
            });
            singleTemplate.add(label);
            formsToDisplay.push(singleTemplate);
        }
        $.completedFormsTableView.data = formsToDisplay;
        $.completedFormsTableView.editable = true;
        $.completedFormsTableView.moveable = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.dataListWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "dataListWindow"
    });
    $.__views.dataListWindow && $.addTopLevelView($.__views.dataListWindow);
    $.__views.completedFormsTableView = Ti.UI.createTableView({
        id: "completedFormsTableView"
    });
    $.__views.dataListWindow.add($.__views.completedFormsTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.dataListWindow.open();
    loadFormsIntoList();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
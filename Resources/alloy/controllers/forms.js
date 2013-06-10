function Controller() {
    function deleteTemplate(event) {
        var templates = Ti.App.Properties.getList("activeTemplates");
        templates.splice(templates.indexOf(event.rowData.label.text), 1);
        Ti.App.Properties.setList("activeTemplates", templates);
    }
    function addTemplatesButtonClicked() {
        $.downloadForms = Alloy.createController("downloadForms");
    }
    function editTemplatesButtonClicked() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.navGroupWindow = Ti.UI.createWindow({
        id: "navGroupWindow",
        title: "Forms"
    });
    $.__views.templatesTableView = Ti.UI.createTableView({
        id: "templatesTableView"
    });
    $.__views.navGroupWindow.add($.__views.templatesTableView);
    $.__views.navGroupWindow.activity.onCreateOptionsMenu = function(e) {
        var __alloyId13 = {
            title: "Download Forms",
            id: "__alloyId12"
        };
        $.__views.__alloyId12 = e.menu.add(_.pick(__alloyId13, Alloy.Android.menuItemCreateArgs));
        $.__views.__alloyId12.applyProperties(_.omit(__alloyId13, Alloy.Android.menuItemCreateArgs));
        addTemplatesButtonClicked ? $.__views.__alloyId12.addEventListener("click", addTemplatesButtonClicked) : __defers["$.__views.__alloyId12!click!addTemplatesButtonClicked"] = true;
    };
    $.__views.formsTab = Ti.UI.createTab({
        window: $.__views.navGroupWindow,
        id: "formsTab",
        title: "Forms",
        icon: "kiwi.png"
    });
    $.__views.formsTab && $.addTopLevelView($.__views.formsTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("populateTemplates", function() {
        var activeTemplates = Ti.App.Properties.getList("activeTemplates");
        var templates = [];
        for (var i = 0; activeTemplates.length > i; ++i) {
            var label = Ti.UI.createLabel({
                id: i,
                text: activeTemplates[i],
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
            singleTemplate.label.color = "white";
            singleTemplate.backgroundColor = "black";
            singleTemplate.hasChild = true;
            singleTemplate.add(label);
            templates.push(singleTemplate);
        }
        $.templatesTableView.data = templates;
        $.templatesTableView.editable = true;
        $.templatesTableView.moveable = true;
    });
    $.templatesTableView.addEventListener("click", function(event) {
        var controller = Alloy.createController("newForm", {
            formName: event.rowData.label.text
        }).getView();
        $.formsTab.open(controller);
    });
    $.templatesTableView.addEventListener("delete", function(event) {
        deleteTemplate(event);
    });
    $.templatesTableView.addEventListener("longpress", function(event) {
        if (null != event.rowData) {
            var dialog = Ti.UI.createAlertDialog({
                message: "Delete " + event.rowData.label.text + "?",
                buttonNames: [ "Delete", "Cancel" ]
            });
            dialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    deleteTemplate(event);
                    Ti.App.fireEvent("populateTemplates");
                }
            });
            dialog.show();
        }
    });
    __defers["$.__views.addTemplatesButton!click!addTemplatesButtonClicked"] && $.__views.addTemplatesButton.addEventListener("click", addTemplatesButtonClicked);
    __defers["$.__views.editTemplatesButton!click!editTemplatesButtonClicked"] && $.__views.editTemplatesButton.addEventListener("click", editTemplatesButtonClicked);
    __defers["$.__views.__alloyId12!click!addTemplatesButtonClicked"] && $.__views.__alloyId12.addEventListener("click", addTemplatesButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
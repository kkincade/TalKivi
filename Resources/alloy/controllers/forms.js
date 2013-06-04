function Controller() {
    function deleteTemplate(event) {
        var templates = Ti.App.Properties.getList("activeTemplates");
        templates.splice(templates.indexOf(event.rowData.label.text), 1);
        Ti.App.Properties.setList("activeTemplates", templates);
        Ti.API.info(Ti.App.Properties.getList("activeTemplates"));
    }
    function addTemplatesButtonClicked() {
        $.downloadForms = Alloy.createController("downloadForms");
    }
    function editTemplatesButtonClicked() {
        if ($.templatesTableView.editing) {
            $.editTemplatesButton.title = "Edit";
            $.addTemplatesButton.enabled = true;
            $.templatesTableView.editing = false;
        } else if ($.templatesTableView.sections.length > 0) {
            $.editTemplatesButton.title = "Done";
            $.addTemplatesButton.enabled = false;
            $.templatesTableView.editing = true;
        }
    }
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
    $.__views.addTemplatesButton = Ti.UI.createButton({
        id: "addTemplatesButton",
        title: "Add"
    });
    addTemplatesButtonClicked ? $.__views.addTemplatesButton.addEventListener("click", addTemplatesButtonClicked) : __defers["$.__views.addTemplatesButton!click!addTemplatesButtonClicked"] = true;
    $.__views.navGroupWindow.rightNavButton = $.__views.addTemplatesButton;
    $.__views.editTemplatesButton = Ti.UI.createButton({
        id: "editTemplatesButton",
        title: "Edit"
    });
    editTemplatesButtonClicked ? $.__views.editTemplatesButton.addEventListener("click", editTemplatesButtonClicked) : __defers["$.__views.editTemplatesButton!click!editTemplatesButtonClicked"] = true;
    $.__views.navGroupWindow.leftNavButton = $.__views.editTemplatesButton;
    $.__views.templatesTableView = Ti.UI.createTableView({
        id: "templatesTableView"
    });
    $.__views.navGroupWindow.add($.__views.templatesTableView);
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
    });
    __defers["$.__views.addTemplatesButton!click!addTemplatesButtonClicked"] && $.__views.addTemplatesButton.addEventListener("click", addTemplatesButtonClicked);
    __defers["$.__views.editTemplatesButton!click!editTemplatesButtonClicked"] && $.__views.editTemplatesButton.addEventListener("click", editTemplatesButtonClicked);
    __defers["$.__views.__alloyId6!click!addTemplatesButtonClicked"] && $.__views.__alloyId6.addEventListener("click", addTemplatesButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
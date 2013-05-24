function Controller() {
    function addTemplatesButtonClicked() {
        $.downloadForms = Alloy.createController("downloadForms");
        alert("Done adding...");
    }
    function editTemplatesButtonClicked() {
        if ($.templatesTableView.editing) {
            $.templatesTableView.editing = false;
            $.addTemplatesButton.enabled = true;
        } else if ($.templatesTableView.sections.length > 0) {
            $.templatesTableView.editing = true;
            $.addTemplatesButton.enabled = false;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.forms = Ti.UI.createWindow({
        id: "forms",
        title: "Forms"
    });
    $.__views.forms && $.addTopLevelView($.__views.forms);
    $.__views.addTemplatesButton = Ti.UI.createButton({
        id: "addTemplatesButton",
        title: "Add"
    });
    addTemplatesButtonClicked ? $.__views.addTemplatesButton.addEventListener("click", addTemplatesButtonClicked) : __defers["$.__views.addTemplatesButton!click!addTemplatesButtonClicked"] = true;
    $.__views.forms.rightNavButton = $.__views.addTemplatesButton;
    $.__views.editTemplatesButton = Ti.UI.createButton({
        id: "editTemplatesButton",
        title: "Edit"
    });
    editTemplatesButtonClicked ? $.__views.editTemplatesButton.addEventListener("click", editTemplatesButtonClicked) : __defers["$.__views.editTemplatesButton!click!editTemplatesButtonClicked"] = true;
    $.__views.forms.leftNavButton = $.__views.editTemplatesButton;
    $.__views.templatesTableView = Ti.UI.createTableView({
        id: "templatesTableView"
    });
    $.__views.forms.add($.__views.templatesTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("populateTemplates", function() {
        alert("Fire Away!");
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
                selectedBackgroundColor: "gray"
            });
            singleTemplate.add(label);
            templates.push(singleTemplate);
        }
        $.templatesTableView.data = templates;
    });
    __defers["$.__views.addTemplatesButton!click!addTemplatesButtonClicked"] && $.__views.addTemplatesButton.addEventListener("click", addTemplatesButtonClicked);
    __defers["$.__views.editTemplatesButton!click!editTemplatesButtonClicked"] && $.__views.editTemplatesButton.addEventListener("click", editTemplatesButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
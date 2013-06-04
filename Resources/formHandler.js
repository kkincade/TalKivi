var fieldHandler = require("fieldHandler");

exports.generateTemplate = function(data, tableView) {
    talkiviFormItemSet = data.talkiviFormItemSet;
    tableViewRows = [];
    if (null != talkiviFormItemSet) {
        for (var i = 0; talkiviFormItemSet.length > i; ++i) {
            var tableViewRow = fieldHandler.generateFieldView(talkiviFormItemSet[i].talkiviField);
            tableViewRows.push(tableViewRow);
        }
        tableView.data = tableViewRows;
    } else view.add(Ti.UI.createLabel({
        text: "Form could not be loaded"
    }));
};
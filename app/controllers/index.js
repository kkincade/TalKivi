alert("Starting app!");

Ti.App.Properties.removeProperty("activeTemplates");
// Setup persistence for downloaded forms (The only time these are null is on the first launch of the application)
if (Ti.App.Properties.getList("activeTemplates") == null) {
	Ti.App.Properties.setList("activeTemplates", []);
	Ti.API.info("It's Null!!!")
}

if (Ti.App.Properties.getList("completedForms") == null) {
	Ti.App.Properties.setList("completedForms", []);
}

if (Ti.App.Properties.getList("settings") == null) {
	Ti.App.Properties.setList("settings", []);
}

alert("Index.open()");

// open index window
//
$.index.open();


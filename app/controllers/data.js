var listView = Alloy.createController('dataList').getView();
$.dataWindow.add(listView);

var mapView = Alloy.createController('dataMap').getView();
$.dataWindow.add(mapView);

if (OS_IOS) {
	var tabbedBar = Ti.UI.iOS.createTabbedBar({
		labels: ['List', 'Map'],
		index: 0,
	    top: 50,
	    style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height: 25,
	    width: 150
	});
}

tabbedBar.addEventListener('click', function(event) {
	if (tabbedBar.index == 0) {
	
	} else {

	}
});

$.dataWindow.setTitleControl(tabbedBar);


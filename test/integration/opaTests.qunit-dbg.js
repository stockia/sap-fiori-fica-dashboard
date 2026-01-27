/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/stocki/ficadashboard/test/integration/AllJourneys"
], function () {
	QUnit.start();
});

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.stocki.ficadashboard.controller.Main", {
            onInit: function () {
                // initialization code, if needed
            },

            onPressBP: function (oEvent) {
                // get the pressed item
                var oItem = oEvent.getSource();
                
                // get the binding context of the item
                var oBindingContext = oItem.getBindingContext("fica");
                
                // get the actual data object (the customer object)
                var oModelData = oBindingContext.getObject();
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                var sMessage = oResourceBundle.getText("msgSelected", [
                    oModelData.name,
                    oModelData.totalAmount,
                    oModelData.currency
                ])
                
                MessageToast.show(sMessage);
            }
        });
    });
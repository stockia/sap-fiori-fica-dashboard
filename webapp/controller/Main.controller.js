sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, MessageToast, Filter, FilterOperator) {
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
            },

            /**
             * Function to filter the list based on search input
             * Filters by name or contractAccount
             */
            onSearch: function (oEvent) {
                // get the search query
                var sQuery = oEvent.getParameter("query");
                var aFilters = [];

                if (sQuery && sQuery.length > 0) {
                    // create filters for name and contractaccount
                    var oFilterName = new Filter("name", FilterOperator.Contains, sQuery);
                    var oFilterContractAccount = new Filter("contractAccount", FilterOperator.Contains, sQuery);

                    // combine filters with OR logic
                    var oCombinedFilter = new Filter({
                        filters: [oFilterName, oFilterContractAccount],
                        and: false
                    });

                    aFilters.push(oCombinedFilter);
                }

                // get the table and its binding
                var oTable = this.byId("idProductsTable");
                var oBinding = oTable.getBinding("items");

                // apply the filters to the binding
                oBinding.filter(aFilters);
            }
        });
    });
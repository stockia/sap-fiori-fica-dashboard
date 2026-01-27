sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (Controller, MessageToast, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("com.stocki.ficadashboard.controller.Main", {
            onInit: function () {
                // initialization code, if needed
            },

            onOpenUserMenu: function (oEvent) {
                var oButton = oEvent.getSource();

                // create the menu if it doesn't exist
                if (!this._oUserMenu) {
                    this._oUserMenu = sap.ui.xmlfragment(
                        "com.stocki.ficadashboard.view.fragments.UserMenu",
                        this // controller as event handler
                    );
                    this.getView().addDependent(this._oUserMenu);
                }

                this._oUserMenu.openBy(oButton);
            },

            onLanguageChange: function (sLang) {
                // get the current URL
                var oUrl = new URL(window.location.href);

                // set or update the 'lang' parameter
                oUrl.searchParams.set("sap-ui-language", sLang);

                // refresh the page with the new URL
                window.location.href = oUrl.toString();
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
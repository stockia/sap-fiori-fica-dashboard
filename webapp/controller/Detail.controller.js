sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.stocki.ficadashboard.controller.Detail", {
        
        onInit: function () {
            // Obtenemos el router de la aplicación
            var oRouter = this.getOwnerComponent().getRouter();
            
            // Nos suscribimos al evento "matched" de la ruta de detalle
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onDetailMatched, this);
        },

        /**
         * Se ejecuta automáticamente cada vez que el usuario selecciona un Business Partner
         */
        _onDetailMatched: function (oEvent) {
            // Extraemos el parámetro de la URL que mandó el controlador principal
            var sBpIndex = oEvent.getParameter("arguments").bpIndex;

            this.getView().bindElement({
                path: "fica>/BusinessPartners/" + sBpIndex
            })
            
            // Decodificamos el path para recuperar el formato original (ej: "BusinessPartners/0")
            // var sDecodedPath = decodeURIComponent(sBpPath);

            // Realizamos el Element Binding sobre la vista de detalle utilizando el modelo "fica"
            // this.getView().bindElement({bpPath
        }
    });
});
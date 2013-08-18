(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents all the basic functionalities available in the CocoonJS extension API.
    * @namespace
    */
    CocoonJS.App = {};

    CocoonJS.App.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_APP !== 'undefined';

    /**
    * Contains all the possible values to specify the input keyboard type to be used when introducing text.
    * @namespace
    */
    CocoonJS.App.KeyboardType =
    {
        /**
        * Represents a generic text input keyboard.
        */
        TEXT : "text",

        /**
        * Represents a number like input keyboard.
        */
        NUMBER : "num",

        /**
        * Represents a phone like input keyboard.
        */
        PHONE : "phone",

        /**
        * Represents an email like input keyboard.
        */
        EMAIL : "email",

        /**
        * Represents an URL like input keyboard.
        */
        URL : "url"
    };

    /**
    * The storage types to be used with file system related operations.
    * @namespace
    */
    CocoonJS.App.StorageType = 
    {
        /**
        * Represents the application storage. The application storage is the place where all the resources that come with the application are stored.
        */
        APP_STORAGE : "APP_STORAGE", 

        /**
        * Represents the internal storage. The internal storage is a different storage space that the application storage and only the data that the application has stored
        * in it will be in this storage. It is internal to the platform/device.
        */
        INTERNAL_STORAGE : "INTERNAL_STORAGE",

        /**
        * Represents an external storage. The external storage is similar to the internal storage in the sense that it only contains information that the application has written
        * in it but it represents an external storage device like a SD-CARD. If there is no exrernal storage, it will represent the same as the internal storage.
        */
        EXTERNAL_STORAGE : "EXTERNAL_STORAGE",

        /**
        * Represents the temporal storage. Same as the internal and external storage spaces in the sense that it only contains information that the application has written
        * in it but the main difference is that the information in this storage may dissapear without notice.
        */
        TEMPORARY_STORAGE : "TEMPORARY_STORAGE"    
    };

    /**
    * Makes a forward call of some javascript code to be executed in a different environment (i.e. from CocoonJS to the WebView and viceversa).
    * It waits until the code is executed and the result of it is returned.
    * @static
    * @param {string} javaScriptCode Some JavaScript code in a string to be forwarded and executed in a different JavaScript environment (i.e. from CocoonJS to the WebView and viceversa).
    * @return The result of the execution of the passed JavaScript code in the different JavaScript environment.
    */
    CocoonJS.App.forward = function(javaScriptCode)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "forward", arguments);
        }
    };

    /**
    * Makes a forward call of some javascript code to be executed in a different environment (i.e. from CocoonJS to the WebView and viceversa).
    * It is asyncrhonous so it does not wait until the code is executed and the result of it is returned. Instead, it calls a callback function when the execution has finished to pass the result.
    * @static
    * @param {string} javaScriptCode Some JavaScript code in a string to be forwarded and executed in a different JavaScript environment (i.e. from CocoonJS to the WebView and viceversa).
    * @param {function} [returnCallback] A function callback that will be called when the passed JavaScript code is executed in a different thread to pass the result of the execution in the different JavaScript environment.
    */
    CocoonJS.App.forwardAsync = function(javaScriptCode, returnCallback)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            if (typeof returnCallback !== 'undefined')
            {
                return ext.IDTK_APP.makeCallAsync("forward", javaScriptCode, returnCallback);
            }
            else
            {
                return ext.IDTK_APP.makeCallAsync("forward", javaScriptCode);
            }
        }
    };

    /**
    * Pops up a text dialog so the user can introduce some text and the application can get it back. It is the first approach CocoonJS has taken to be able to introduce 
    * text input in a easy way. The dialog execution events are passed to the application through the {@link CocoonJS.App.onTextDialogFinished} and the {@link CocoonJS.App.onTextDialogCancelled} event objects.
    * @param {string} [title] Default value is "". The title to be displayed in the dialog.
    * @param {string} [message] Default value is "". The message to be displayed in the dialog, next to the text input field.
    * @param {string} [text] Default value is "". The initial text to be introduced in the text input field.
    * @param {CocoonJS.App.KeyboardType} [keyboardType] Default value is {@link CocoonJS.App.KeyboardType.TEXT}. The keyboard type to be used when the text has to be introduced.
    * @param {string} [cancelButtonText] Default value is "". The text to be displayed in the cancel button of the dialog.
    * @param {string} [okButtonText] Default value is "". The text to be displayed in the ok button of the dialog.
    * @see CocoonJS.App.onTextDialogFinished
    * @see CocoonJS.App.onTextDialogCancelled
    */
    CocoonJS.App.showTextDialog = function(title, message, text, keyboardType, cancelButtonText, okButtonText)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "showTextDialog", arguments, true);
        }
        else
        {
            if (!message)
            {
                message = "";
            }
            if (!text)
            {
                text = "";
            }
            var result = prompt(message, text);
            var eventObject = result ? CocoonJS.App.onTextDialogFinished : CocoonJS.App.onTextDialogCancelled;
            eventObject.notifyEventListeners(result);
        }
    };

    /**
    * Pops up a message dialog so the user can decide between a yes or no like confirmation. The message box execution events are passed to the application through the {@link CocoonJS.App.onMessageBoxConfirmed} and the {@link CocoonJS.App.onMessageBoxDenied} event objects.
    * @param {string} [title] Default value is "". The title to be displayed in the dialog.
    * @param {string} [message] Default value is "". The message to be displayed in the dialog, next to the text input field.
    * @param {string} [confirmButtonText] Default value is "Yes". The text to be displayed for the confirm button.
    * @param {string} [denyButtonText] Default value is "No". The text to be displayed for the deny button.
    * @see CocoonJS.App.onMessageBoxConfirmed
    * @see CocoonJS.App.onMessageBoxDenied
    */
    CocoonJS.App.showMessageBox = function(title, message, confirmButtonText, denyButtonText)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "showMessageBox", arguments, true);
        }
        else
        {
            if (!message)
            {
                message = "";
            }
            var result = confirm(message);
            var eventObject = result ? CocoonJS.App.onMessageBoxConfirmed : CocoonJS.App.onMessageBoxDenied;
            eventObject.notifyEventListeners();
        }
    };

    /**
    * It allows to load a new JavaScript/HTML5 resource that can be loaded either locally (inside the platform/device storage) or using a remote URL.
    * @param {string} path A path to a resource stored in the platform or in a URL to a remote resource.
    * @param {CocoonJS.App.StorageType} [storageType] If the path argument represents a locally stored resource, the developer can specify the storage where it is stored. If no value is passes, the {@link CocoonJS.App.StorageType.APP_STORAGE} value is used by default.
    */
    CocoonJS.App.load = function(path, storageType)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "loadPath", arguments);
        }
    };

    /**
    * Opens a given URL using a system service that is able to open it. For example, open a HTTP URL using the system WebBrowser.
    * @param {string} url The URL to be opened by a system service.
    */
    CocoonJS.App.openURL = function(url)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "openURL", arguments, true);
        }
        else
        {
            window.open(url, '_blank');
        }
    }

    /**
    * Forces the app to be finished.
    */
    CocoonJS.App.forceToFinish = function()
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "forceToFinish", arguments);
        }
        else
        {
            window.close();
        }
    }

    /**
    * Creates a canvas element that is automatically resized to the screen size. When the app is being executed
    * inside CocoonJS. This canvas is optimized for rendering so it is higly recommended to use it if it fits
    * your app needs. If your app uses one canvas as the main canvas where all other canvases and images are displayed, Ludei recommends to 
    * call this function in order to create this main canvas. A usual 2x performance gain is achieved by doing so
    * depending on the device and the graphics card driver. 
    * @return The canvas object that should be used as the main canvas and that is resized to the screen resolution.
    */
    CocoonJS.App.createScreenCanvas = function()
    {
        var screenCanvas;
        if (navigator.isCocoonJS)
        {
            screenCanvas = document.createElement("screencanvas");
        }
        else
        {
            screenCanvas = document.createElement("canvas");
            screenCanvas.width = window.innerWidth;
            screenCanvas.height = window.innerHeight;
        }
        return screenCanvas;
    };

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.App.onTextDialogFinished} event calls.
    * @name OnTextDialogFinishedListener
    * @function
    * @static
    * @memberOf CocoonJS.App
    * @param {string} text The text that was introduced in the text dialog when it was finished.
    */

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the text dialog is finished by accepting it's content.
    * The callback function's documentation is represented by {@link CocoonJS.App.OnTextDialogFinishedListener}
    * @static
    */
    CocoonJS.App.onTextDialogFinished = new CocoonJS.EventHandler("IDTK_APP", "App", "ontextdialogfinish");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the text dialog is finished by dismissing it's content.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onTextDialogCancelled = new CocoonJS.EventHandler("IDTK_APP", "App", "ontextdialogcancel");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the text dialog is finished by accepting it's content.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onMessageBoxConfirmed = new CocoonJS.EventHandler("IDTK_APP", "App", "onmessageboxconfirmed");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the text dialog is finished by dismissing it's content.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onMessageBoxDenied = new CocoonJS.EventHandler("IDTK_APP", "App", "onmessageboxdenied");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the application is suspended.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onSuspended = new CocoonJS.EventHandler("IDTK_APP", "App", "onsuspended");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the application is activated.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onActivated = new CocoonJS.EventHandler("IDTK_APP", "App", "onactivated");

})();
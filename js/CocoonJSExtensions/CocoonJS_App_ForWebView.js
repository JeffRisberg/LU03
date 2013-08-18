(function()
{
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before adding more functionalities to an extension.");
    if (typeof window.CocoonJS.App === 'undefined' || window.CocoonJS.App === null) throw("The CocoonJS.App object must exist and be valid before adding more functionalities to it.");

    /**
    * Shows a transparent WebView on top of the CocoonJS hardware accelerated environment rendering context.
    * @param {number} [x] The horizontal position where to show the WebView.
    * @param {number} [y] The vertical position where to show the WebView.
    * @param {number} [width] The horitonzal size of the WebView.
    * @param {number} [height] the vertical size of the WebView.
    */
    CocoonJS.App.show = function(x, y, width, height)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
           return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "show", arguments);
        }
    };

    /**
    * Hides the transparent WebView on top of the CocoonJS hardware acceleration environment rendering contect.
    */
    CocoonJS.App.hide = function()
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
           return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_APP", "hide", arguments);
        }
    };

    /**
    * Loads a resource in the CocoonJS environment from the CocoonJS environment. 
    * @param {string} path The path to the resource. It can be a remote URL or a path to a local file.
    * @param {CocoonJS.App.StorageType} [storageType] An optional parameter to specify at which storage in the device the file path is stored. By default, APP_STORAGE is used.
    * @see CocoonJS.App.load
    */
    CocoonJS.App.loadInCocoonJS = function(path, storageType)
    {
        if (CocoonJS.App.nativeExtensionObjectAvailable)
        {
            var javaScriptCodeToForward = "ext.IDTK_APP.makeCall('loadPath'";
            if (typeof path !== 'undefined')
            {
                javaScriptCodeToForward += ", '" + path + "'";
                if (typeof storageType !== 'undefined')
                {
                    javaScriptCodeToForward += ", '" + storageType + "'";
                }
            }
            javaScriptCodeToForward += ");";

            return CocoonJS.App.forwardAsync(javaScriptCodeToForward);
        }
    };

    /**
    * This function allows to forward console messages from the WebView to the CocoonJS
    * debug console. What it does is to change the console object for a new one
    * with all it's methods (log, error, info, debug and warn) forwarding their
    * messages to the CocoonJS environment.
    * The original console object is stored in the CocoonJS.App.originalConsole property.
    */
    CocoonJS.App.proxifyConsole = function() 
    {
        if (window.navigator.isCocoonJS || !CocoonJS.nativeExtensionObjectAvailable) return;

        if (typeof CocoonJS.App.originalConsole === 'undefined')
        {
            CocoonJS.App.originalConsole = window.console;
        }
        var functions = ["log", "error", "info", "debug", "warn"];
        var newConsole = {};
        for (var i = 0; i < functions.length; i++)
        {
            newConsole[functions[i]] = function(functionName)
            {
                return function(message)
                {
                    ext.IDTK_APP.makeCallAsync("forward", "console." + functionName + "('" + message + "');");
                };
            }(functions[i]);
        }
        window.console = newConsole;
    };

    /**
    * This function restores the original console object and removes the proxified console object.
    */
    CocoonJS.App.deproxifyConsole = function()
    {
        if (window.navigator.isCocoonJS || !CocoonJS.nativeExtensionObjectAvailable) return;
        if (typeof CocoonJS.App.originalConsole !== 'undefined')
        {
            window.console = CocoonJS.App.originalConsole;
            CocoonJS.App.originalConsole = undefined;
        }
    };

    /**
    * Everytime the page is loaded, proxify the console.
    */
    window.addEventListener("load", function()
    {
        CocoonJS.App.proxifyConsole();
    });

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.App.onLoadInCocoonJSSucceed} event calls.
    * @name OnLoadInCocoonJSSucceedListener
    * @function
    * @static
    * @memberOf CocoonJS.App
    * @param {string} pageURL A string that represents the page URL loaded.
    */

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the CocoonJS load has completed successfully.
    * The callback function's documentation is represented by {@link CocoonJS.App.OnLoadInCocoonJSSucceedListener}
    * @static
    */
    CocoonJS.App.onLoadInCocoonJSSucceed = new CocoonJS.EventHandler("IDTK_APP", "App", "forwardpageload");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the CocoonJS load fails.
    * The callback function does not receive any parameter.
    * @static
    */
    CocoonJS.App.onLoadInCocoonJSFailed = new CocoonJS.EventHandler("IDTK_APP", "App", "forwardpagefail");

})();
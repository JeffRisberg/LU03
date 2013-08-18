(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents the CocoonJS Notification extension.
    * @namespace
    */
    CocoonJS.Notification = {};

    CocoonJS.Notification.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_SRV_NOTIFICATION !== 'undefined';

	/**
	* The data structure that represents the information of a local notification.
	* @namespace
	*/
	CocoonJS.Notification.LocalNotification = function()
	{
		/**
		* The notification message.
		* @type string
		*/
		this.message = "";

		/**
		* A flag that indicates if the sound should be enabled for the notification.
		* @type boolean
		*/
		this.soundEnabled = false;

		/**
		* @type number
		*/
		this.badgeNumber = 0;

		/**
		* Some arbitrary data to attached to the notification.
		* @type object
		*/
		this.userData = {};

		/**
		* @type string
		*/
		this.contentBody = "";

		/**
		* @type string
		*/
		this.contentTitle = "";
	};

	/**
	* The data structure that represents the information of a push notification.
	* @namespace
	*/
	CocoonJS.Notification.PushNotification = function()
	{
		/**
		* The notification message.
		* @type string
		*/
		this.message = "";

		/**
		* A flag that indicates if the sound should be enabled for the notification.
		* @type boolean
		*/
		this.soundEnabled = false;

		/**
		* @type number
		*/
		this.badgeNumber = 0;

		/**
		* Some arbitrary data to attached to the notification.
		* @type object
		*/
		this.userData = {};

		/**
		* An array of strings representing the channels where the notification is sent.
		* @type array
		*/
		this.channels = [];

		/**
		* @type number
		*/
		this.expirationTime = 0;

		/**
		* @type number
		*/
		this.expirationTimeInterval = 0;
	};

	/**
	* Register to be able to receive push notifications. The registration process is controlled using the {@link CocoonJS.Notification.onRegisterForPushNotificationsSucceed} and {@link CocoonJS.Notification.onRegisterForPushNotificationsFailed} event handlers.
	* @see {CocoonJS.Notification.onRegisterForPushNotificationsSucceed}
	* @see {CocoonJS.Notification.onRegisterForPushNotificationsFailed}
	*/ 
	CocoonJS.Notification.registerForPushNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "registerForPushNotifications", arguments);
		}
	};

	/**
	* Unregister from receiving push notifications.The unregistration process is controlled using the {@link CocoonJS.Notification.onUnregisterForPushNotificationsSucceed} event handler.
	* @see CocoonJS.Notification.onUnregisterForPushNotificationsSucceed
	*/ 
	CocoonJS.Notification.unregisterForPushNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "unregisterForPushNotifications", arguments);
		}
	};

	/**
	* Cancel the last sent local notification.
	* @see CocoonJS.Notification.sendLocalNotification
	*/ 
	CocoonJS.Notification.cancelLastSentLocalNotificiation = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "cancelLocalNotification", arguments);
		}
	};

	/**
	* Cancel all sent local notifications.
	*/ 
	CocoonJS.Notification.cancelAllLocalNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "cancelAllLocalNotifications", arguments);
		}
	};

	/**
	* Send a local notification.
	* @param {CocoonJS.Notification.LocalNotification} localNotification The structure with all the information about the local notification to be sent.
	* @see CocoonJS.Notification.onNotificationDeliverySucceed
	*/ 
	CocoonJS.Notification.sendLocalNotification = function(localNotification)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "sendLocalNotification", arguments);
		}
	};

	/**
	* Subscribe to a channel in order to receive notifications sent to it.
	* @param {string} channel The channel id to subscribe to.
	*/ 
	CocoonJS.Notification.subscribeToChannel = function(channel)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "subscribe", arguments);
		}
	};

	/**
	* Unsubscribe from a channel in order to stop receiving notifications sent to it.
	* @param {string} channel The channel id to unsubscribe from.
	*/ 
	CocoonJS.Notification.unsubscribeFromChannel = function(channel)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "unsubscribe", arguments);
		}
	};

	/**
	* Send a push notification.
	* @param {CocoonJS.Notification.PushNotification} pushNotification The structure with all the information about the push notification to be sent.
	* @see CocoonJS.Notification.onNotificationDeliverySucceed
	*/ 
	CocoonJS.Notification.sendPushNotification = function(pushNotification)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "sendPushNotification", arguments);
		}
	};

	/**
	* Set the badge number.
	* @param {number} badgeNumber The number of the badge.
	*/ 
	CocoonJS.Notification.setBadgeNumber = function(badgeNumber)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "setBadgeNumber", arguments);
		}
	};

	/**
	* Returns the badge number.
	* @returns {number} The badge number.
	*/ 
	CocoonJS.Notification.getBadgeNumber = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "getBadgeNumber", arguments);
		}
	};

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the registration for push notification succeeds.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onRegisterForPushNotificationsSucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceRegistered"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the unregistration for push notifications succeeds.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onUnregisterForPushNotificationsSucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceUnregistered"); 

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Notification.onRegisterForPushNotificationsFailed} event calls.
    * @name OnRegisterForPushNotificationsFailedListener
    * @function
    * @static
    * @memberOf CocoonJS.Notification
    * @param {string} message The error message explaining why the registration failed.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the registration for push notifications fails.
    * The callback function's documentation is represented by {@link CocoonJS.Notification.OnRegisterForPushNotificationsFailedListener}
    * @static
    */
	CocoonJS.Notification.onRegisterForPushNotificationsFailed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceFailedToRegister"); 

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Notification.onPushNotificationReceived} event calls.
    * @name OnPushNotificationReceivedListener
    * @function
    * @static
    * @memberOf CocoonJS.Notification
    * @param {object} userData The user data.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a push notification is received.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onPushNotificationReceived = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationReceived"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a local notification is received.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onLocalNotificationReceived = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "localNotificationReceived"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a notification is successfully delivered.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onPushNotificationDeliverySucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationSuccessfullyDelivered"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the delivery of a notification fails.
    * The callback function does not receive any parameter.
    * @static
    */
	CocoonJS.Notification.onPushNotificationDeliveryFailed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationDeliveryError"); 

})();
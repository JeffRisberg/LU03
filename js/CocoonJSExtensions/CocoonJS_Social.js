(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

	/**
	* This type represents the access to a native Social extension API. As there can be more than
	* one service of this type, more than one instance can be created.
	* @param {string} nativeExtensionName The name of the native ext object extension property name.
	* @param {string} extensionName The name of the CocoonJS object extension property name.
	*/
	CocoonJS.Social = function(nativeExtensionName, extensionName)
	{
		if (typeof nativeExtensionName !== 'string') throw "The given native extension name '" + nativeExtensionName + "' is not a string.";
		if (typeof extensionName !== 'string') throw "The given extension name '" + nativeExtensionName + "' is not a string.";

		this.nativeExtensionName = nativeExtensionName;
		this.extensionName = extensionName;
	    this.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext[nativeExtensionName] !== 'undefined';

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user login request succeeds.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onRequestLoginSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLoginSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user login request fails.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onRequestLoginFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLoginFailed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserInfoSucceed} event calls.
	    * @name OnRequestUserInfoSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {CocoonJS.Social.UserInfo} userInfo The info of the user.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request suceeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnUserInfoRequestSucceedListener}
	    * @static
	    */
		this.onRequestUserInfoSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onUserInfoRequestSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserInfoFailed} event calls.
	    * @name OnRequestUserInfoFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user for whom the info was requested.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnUserInfoRequestFailedListener}
	    * @static
	    */
		this.onRequestUserInfoFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onUserInfoRequestFailed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestFriendsInfoSucceed} event calls.
	    * @name OnRequestFriendsInfoSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {array} friendsInfo An array of {@link CocoonJS.Social.FriendInfo} objects representing the information of the friends of the user.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's friends info is successfully retrieved.
	    * @static
	    */
		this.onRequestFriendsInfoSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onFriendsRequestSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's friends info fails to be retrieved.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onRequestFriendsInfoFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onFriendsRequestFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user logs out.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onLogout = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLogout");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user message publication request succeeds.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onRequestMessagePublicationSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onMsgPublishSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user message publication request fails.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onRequestMessagePublicationFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onMsgPublishFailed");

	    return this;
	};

	CocoonJS.Social.prototype = 
	{
		/**
		* Request to log in the social gaming application.
		* @see CocoonJS.Social.onRequestLoginSucceed
		* @see CocoonJS.Socual.onRequestLoginFailed
		*/
		requestLogin : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestLogin", arguments);
			}
		},

		/**
		* Request to log out of the social gaming application.
		* @see CocoonJS.Social.onRequestLoginSucceed
		* @see CocoonJS.Socual.onRequestLoginFailed
		*/
		requestLogout : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestLogout", arguments);
			}
		},

		/**
		* Request to retrieve the current or a specific user's id. The request can be monitored using the {@link CocoonJS.Social.onUserInfoRequestSucceed} and {@link CocoonJS.Social.onUserInfoRequestFailed} event handlers.
		* @param {string} [userId] The id of the user to retireve the information from.
		* @see CocoonJS.Social.onRequestUserInfoSucceed
		* @see CocoonJS.Social.onRequestUserInfoFailed
		*/
		requestUserInfo : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserInfo", arguments);
			}
		},

		/**
		* Get the URL to the image of a user. 
		* @param {string} userID The id of the user to get the image for.
		* @param {CocoonJS.Social.ImageSizeType} [imageSizeType] The size of the image. One of the possible values among the ones in the {@link CocoonJS.Social.ImageSizeType}
		* @returns {string} The URL to the user image.
		*/
		getUserImageURL : function(userID, imageSizeType)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "getUserImageURL", arguments);
			}
		},

		/**
		* Request for the information of all the friends of the currently logged user.
		*/
		requestFriendsInfo : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestFriendsInfo", arguments);
			}
		},

		/**
		* Request the publication of a message using a dialog.
		* @param {CocoonJS.Social.Message} message A object representing the information to be published.
		* @see CocoonJS.Social.onRequestMessagePublicationSucceed
		* @see CocoonJS.Social.onRequestMessagePublicationFailed
		*/
		requestMessagePublicationWithDialog : function(message)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestMsgPublishWithDialog", arguments);
			}
		}
	};

	CocoonJS.SocialGaming = function(nativeExtensionName, extensionName)
	{
		CocoonJS.SocialGaming.superclass.constructor.call(this, nativeExtensionName, extensionName);
		return this;
	};

	CocoonJS.SocialGaming.prototype = 
	{
	};

	CocoonJS.extend(CocoonJS.SocialGaming, CocoonJS.Social);

	/**
	* This structure represents the possible images to be obtained for a user in the social gaming extension.
	* @namespace
	*/
	CocoonJS.Social.ImageSizeType = 
	{
		/**
		* Represent a thumbnail like image size.
		*/
	    THUMB : "thumb",

		/**
		*/
	    SMALL : "small",

		/**
		*/
	    MEDIUM : "medium",

		/**
		*/
	    LARGE : "large"
	};

	/**
	* Represents the possible genders for the social gaming service users.
	* @namespace
	*/
	CocoonJS.Social.GenderType =
	{
		/**
		*/
		MALE : "male",

		/**
		*/
		FEMALE : "female",

		/**
		*/
		UNKNOWN : "unknown"
	};

	/**
	* Represents the possible connections between a user and a friend.
	* @namespace
	*/
	CocoonJS.Social.ConnectionType =
	{
		/**
		*/
		IN : "inbound",

		/**
		*/
		OUT : "outbound",

		/**
		*/
		INOUT : "inout"
	};

	/**
	* The data structure that represents the information of a user inside the social gaming extension.
	* @namespace
	*/
	CocoonJS.Social.UserInfo =
	{
		/**
		* The id of the user.
		* @type string
		*/
		ID : null,

		/**
		* The gender of the user. One of the possible values inside {@link CocoonJS.Social.GenderType}.
		* @type CocoonJS.Social.GenderType
		*/
		gender : CocoonJS.Social.GenderType.UNKNOWN,

		/**
		* The user name of the user.
		* @type string
		*/
		userName : null,

		/**
		* The first name of the user.
		* @type string
		*/
		firstName : null,

		/**
		* The email of the user.
		* @type string
		*/
		email : null
	};

	/**
	* The data structure that represents the information of the friends of a user.
	* @namespace
	*/
	CocoonJS.Social.FriendInfo =
	{
		/**
		* The id of the friend/user.
		*/
		ID : null,

		/**
		* The connection of the friend to the user. One of the possible values inside {@link CocoonJS.Social.ConnectionType}.
		*/
		connection : null,

		/**
		* The user name of the user.
		* @type string
		*/
		userName : null,

		/**
		* The first name of the user.
		* @type string
		*/
		firstName : null,

		/**
		* The email of the user.
		* @type string
		*/
		email : null
	};

	/**
	* The data structure that represents the information of the user score in the application.
	* @namespace
	*/
	CocoonJS.Social.UserScoreInfo =
	{
		/**
		* The information of the user. 
		* @type CocoonJS.Social.UserInfo
		*/
		user : null,

		/**
		* Ths id of the application.
		* @type string
		*/
		applicationID : null,

		/**
		* The score of the user in the application.
		* @type number
		*/
		score : 0
	};

	/**
	* The data structure that represents the information of the user achievent in the application.
	* @namespace
	*/
	CocoonJS.Social.UserAchievementInfo =
	{
		/**
		* The user id.
		* @type string
		*/
		userID : null,

		/**
		* The application id.
		* @type string
		*/
		applicationID : null,

		/**
		* The title of the achievement.
		* @type string
		*/
		achievementTitle : null,

		/**
		* The achievement info id.
		* @type string
		*/
		achievementInfoID : null,

		/**
		* The time when the achievement was created.
		* @type number
		*/
		creationTime : 0
	};

	/**
	* The data structure that represents the information of an achievement in the application.
	* @namespace
	*/
	CocoonJS.Social.AchievementInfo =
	{
		/**
		* The id of the achievement info.
		* @type string
		*/
		ID : null,

		/**
		* The id of the application.
		* @type string
		*/
		applicationID : null,

		/**
		* The title of the achievement.
		* @type string
		*/
		title : null,

		/**
		* The description of the achievement.
		* @type string
		*/
		description : null,

		/**
		* The url to the image representing the achievement.
		* @type string
		*/
		imageURL : null,

		/**
		* The time when the achievement was created.
		* @type number
		*/
		creationTime : 0
	};

	/**
	* This type represents a message to be published.
	* @param {string} message The message to be published.
	* @param {string} [mediaURL] A URL to a media (image, video, ...)
	* @param {string} linkText
	*/
	CocoonJS.Social.Message = function(message, mediaURL, linkURL, linkText, linkCaption)
	{
		this.message = typeof(message) === "string" ? message : "";
		this.mediaURL = typeof(mediaURL) === "string" ? mediaURL : "";
		this.linkURL = typeof(linkURL) === "string" ? linkURL : "";
		this.linkText = typeof(linkText) === "string" ? linkText : "";
		this.linkCaption = typeof(linkCaption) === "string" ? linkCaption : "";
		return this;
	};

	/**
	* This instance represents the extension object to access Facebook related native functionalities.
	* @see CocoonJS.Social
	*/
	CocoonJS.SocialGaming.Facebook = new CocoonJS.SocialGaming("IDTK_SRV_SOCIAL_FACEBOOK", "SocialGaming.Facebook");

	/**
	* This instance represents the extension object to access Facebook related native functionalities.
	* @see CocoonJS.Social
	*/
	// CocoonJS.Social.Twitter = new CocoonJS.Social("IDTK_SRV_TWITTER", "Social.Twitter");

})();
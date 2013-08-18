(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents the CocoonJS In-App Purchase extension.
    * @namespace
    */
    CocoonJS.Store = {};

    CocoonJS.Store.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_SRV_STORE !== 'undefined';

	/**
	* The data structure that represents the information of a product in the store.
	* @namespace
	*/
	CocoonJS.Store.ProductInfo =
	{
		/**
		* The id of the prodcut.
		* @type string
		*/
		productId : null,

		/**
		* @type string
		*/
		alias : null,

		/**
		* @type CocoonJS.Store.ProductType
		*/
		productType : null,

		/**
		* The price of the product localized to the system settings.
		* @type string
		*/
		localizedPrice : null,

		/**
		* The title of the product.
		* @type string
		*/
		title : null,

		/**
		* The description of the product.
		* @type string
		*/
		description : null,

		/**
		* The price of the product.
		* @type string
		*/
		price : null
	};

	/**
    * The predefined possible states of a purchase.
    * @namespace 
    */
	CocoonJS.Store.ProductType = 
	{
		/**
		* Specifies that the purchase has been successfully purchased.
		*/
	    CONSUMABLE : 0,

		/**
		* Specifies that the purchase transaction has been canceled because of billing issues in the market.
		*/
	    NON_CONSUMABLE : 1,

	    /**
		* Specifies that the purchase has been refunded.
		*/
	    AUTO_RENEWABLE_SUBSCRIPTION : 2,

	    /**
		* Specifies that the purchase (subscriptions only) has expired and is no longer valid.
		*/
	    FREE_SUBSCRIPTION : 3,

	    /**
		* Specifies that the purchase (subscriptions only) has expired and is no longer valid.
		*/
	    NON_RENEWABLE_SUBSCRIPTION : 4
	};

	/**
	* The data structure that represents the information of a purchase.
	* @namespace
	*/
	CocoonJS.Store.PurchaseInfo =
	{
		/**
		* The id of the transaction.
		* @type string
		*/
		transactionId : null,

		/**
		* The time when the purchase was done.
		* @type string
		*/
		purchaseTime : null,

		/**
		* The state of the purchase. @see CocoonJS.Store.PurchaseState
		* @type CocoonJS.Store.PurchaseState
		*/
		purchaseState : null,

		/**
		* The product id related to this purchase. CocoonJS.Store.ProductInfo
		* @type string
		*/
		productId : null,

		/**
		* The number of products purchased in this transaction.
		* @type int
		*/
		quantity : null,
	};

	/**
    * The predefined possible states of a purchase.
    * @namespace 
    */
	CocoonJS.Store.PurchaseState = 
	{
		/**
		* Specifies that the purchase has been successfully purchased.
		*/
	    PURCHASED : 0,

		/**
		* Specifies that the purchase transaction has been canceled because of billing issues in the market.
		*/
	    CANCELED : 1,

	    /**
		* Specifies that the purchase has been refunded.
		*/
	    REFUNDED : 2,

	    /**
		* Specifies that the purchase (subscriptions only) has expired and is no longer valid.
		*/
	    EXPIRED : 3
	};

	/**
	* Returns if the StoreService is available in the platform.
	* @return true if the service is available and false otherwise.
	*/ 
	CocoonJS.Store.canPurchase = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "canPurchase", arguments);
		}
	};

	/**
	* Request the purchase of a product given it's product id. The request is monitored using the {@link CocoonJS.Store.onPurchaseProductSucceed}, {@link CocoonJS.Store.onPurchaseProductFailed} and {@link CocoonJS.Store.onPurchaseProductStarted} event handlers.
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onPurchaseProductSucceed
	* @see CocoonJS.Store.onPurchaseProductFailed
	* @see CocoonJS.Store.onPurchaseProductStarted
	*/ 
	CocoonJS.Store.purchaseProduct = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeature", arguments);
		}
	};

	/**
	* Request the purchase of a product given it's product id showing a modal dialog. The request is monitored using the {@link CocoonJS.Store.onPurchaseProductSucceed}, {@link CocoonJS.Store.onPurchaseProductFailed} and {@link CocoonJS.Store.onPurchaseProductStarted} event handlers.
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onPurchaseProductSucceed
	* @see CocoonJS.Store.onPurchaseProductFailed
	* @see CocoonJS.Store.onPurchaseProductStarted
	*/ 
	CocoonJS.Store.puchaseProductModal = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeatureModal", arguments);
		}
	};

	/**
	* Request the purchase of a product given it's product id showing a modal dialog and a preview of the product. The request is monitored using the {@link CocoonJS.Store.onPurchaseProductSucceed}, {@link CocoonJS.Store.onPurchaseProductFailed} and {@link CocoonJS.Store.onPurchaseProductStarted} event handlers.
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onPurchaseProductSucceed
	* @see CocoonJS.Store.onPurchaseProductFailed
	* @see CocoonJS.Store.onPurchaseProductStarted
	*/ 
	CocoonJS.Store.purchaseProductModalWithPreview = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeatureModalWithPreview", arguments);
		}
	};

	/**
	* Returns if a product has been already purchased or not.
	* @param {string} productId The product id to check if it has been already purchased or not.
	* @returns {boolean} A flag that indicates if the product has been already purchased (true) or not (false).
	*/
	CocoonJS.Store.isProductPurchased = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "isFeaturePurchased", arguments);
		}
	};

	/**
	* Returns all the products that can be purchased.
	* @returns {array} An array of all the {@link CocoonJS.Store.ProductInfo} objects available for purchase.
	*/
	CocoonJS.Store.getProducts = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "getProducts", arguments);
		}
	};

	/**
	* Returns all the purchases.
	* @returns {array} An array of all the {@link CocoonJS.Store.PurchaseInfo} purchases.
	*/
	CocoonJS.Store.getPurchases = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "getPurchases", arguments);
		}
	};

	/**
	* Returns if the product fetch has completed or not.
	* @returns {boolean} 
	* @see CocoonJS.Store.onProductFetchCompleted
	* @see CocoonJS.Store.onProductFetchFailed
	*/
	CocoonJS.Store.isProductFetchCompleted = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "isFetchCompleted", arguments);
		}
	};

	/**
	* Restores all the purchase transactions. For each already purchased product {@link CocoonJS.Store.onPurchaseProductSucceed}, {@link CocoonJS.Store.onPurchaseProductFailed} and {@link CocoonJS.Store.onPurchaseProductStarted} event handlers are called again
	* @returns {boolean} 
	* @see CocoonJS.Store.onPurchaseProductSucceed
	* @see CocoonJS.Store.onPurchaseProductFailed
	* @see CocoonJS.Store.onPurchaseProductStarted
	*/
	CocoonJS.Store.restorePurchases = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "restorePurchases", arguments);
		}
	};

	/**
	* Restores all the purchase transactions showing a modal dialog. For each already purchased product {@link CocoonJS.Store.onPurchaseProductSucceed}, {@link CocoonJS.Store.onPurchaseProductFailed} and {@link CocoonJS.Store.onPurchaseProductStarted} event handlers are called again
	* @returns {boolean} 
	* @see CocoonJS.Store.onPurchaseProductSucceed
	* @see CocoonJS.Store.onPurchaseProductFailed
	* @see CocoonJS.Store.onPurchaseProductStarted
	*/
	CocoonJS.Store.restorePurchasesModal = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "restorePurchasesModal", arguments);
		}
	};

	    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductPurchaseStarted} event calls.
    * @name OnPurchaseProductStartedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {CocoonJS.Store.ProductInfo} productInfo The product info.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of a product starts.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnPurchaseProductStartedListener}
    * @static
    */
	CocoonJS.Store.onProductPurchaseStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseStarted"); 

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductPurchaseCompleted} event calls.
    * @name OnPurchaseProductSucceedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {CocoonJS.Store.ProductInfo} productInfo The product info.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of the product succeeds.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnPurchaseProductSucceedListener}
    * @static
    */
	CocoonJS.Store.onProductPurchaseCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseCompleted"); 

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductPurchaseFailed} event calls.
    * @name OnPurchaseProductFailedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {CocoonJS.Store.ProductInfo} productInfo The product info.
    * @param {string} message The message that represents the error that arised while purchasing the product.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of the product fails.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnPurchaseProductFailedListener}
    * @static
    */
	CocoonJS.Store.onProductPurchaseFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseFailed"); 

	/**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductFetchStarted} event calls.
    * @name OnProductFetchStartedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the products fetch has started.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnProductFetchStartedListener}
    * @static
    */
	CocoonJS.Store.onProductFetchStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductFetchStarted");

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductFetchCompleted} event calls.
    * @name OnProductFetchCompletedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {array} validProductInfos An array of {@link CocoonJS.Store.ProductInfo} objects representing all the valid fetched products.
    * @param {array} invalidProductIds An array of strings representing all the invalid product ids.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the products fetch has been completed.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnProductFetchCompletedListener}
    * @static
    */
	CocoonJS.Store.onProductFetchCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductFetchCompleted"); 

    /**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onProductFetchFailed} event calls.
    * @name OnProductFetchFailedListener
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {string} errorMessage The error message explaining the error while fetching the products.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the product fetch has failed to complete.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnProductFetchFailedListener}
    * @static
    */
	CocoonJS.Store.onProductFetchFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductFetchFailed"); 

	/**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onRestorePurchasesStarted} event calls.
    * @name OnRestorePurchasesStarted
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {string} errorMessage The error message explaining the error while fetching the products.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases restoration has started.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnRestorePurchasesStarted}
    * @static
    */
	CocoonJS.Store.onRestorePurchasesStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesStarted"); 

	/**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onRestorePurchasesCompleted} event calls.
    * @name OnRestorePurchasesCompleted
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {string} errorMessage The error message explaining the error while fetching the products.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases has successfully completed.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnRestorePurchasesCompleted}
    * @static
    */
	CocoonJS.Store.onRestorePurchasesCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesCompleted"); 

	/**
    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Store.onRestorePurchasesFailed} event calls.
    * @name OnRestorePurchasesFailed
    * @function
    * @static
    * @memberOf CocoonJS.Store
    * @param {string} errorMessage The error message explaining the error while fetching the products.
    */
    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases has failed to complete.
    * The callback function's documentation is represented by {@link CocoonJS.Store.OnRestorePurchasesFailed}
    * @static
    */
	CocoonJS.Store.onRestorePurchasesFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesFailed");

})();
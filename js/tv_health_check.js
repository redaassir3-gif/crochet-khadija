/**
 * TradingView health check utility.
 * Confirms that the TradingView widget library is loaded and responsive.
 */

function tv_health_check() {
  return new Promise((resolve) => {
    const result = {
      connected: false,
      timestamp: new Date().toISOString(),
      details: {},
    };

    // Check that the TradingView global is present
    if (typeof TradingView === "undefined") {
      result.details.error = "TradingView global not found";
      console.warn("[tv_health_check] TradingView is NOT connected:", result.details.error);
      resolve(result);
      return;
    }

    // Check that the widget constructor is callable
    if (typeof TradingView.widget !== "function") {
      result.details.error = "TradingView.widget is not a function";
      console.warn("[tv_health_check] TradingView is NOT connected:", result.details.error);
      resolve(result);
      return;
    }

    result.connected = true;
    result.details.version = TradingView.version ? TradingView.version() : "unknown";
    console.info("[tv_health_check] TradingView is connected.", result);
    resolve(result);
  });
}

// Run immediately and expose the result on the global object for inspection
tv_health_check().then((result) => {
  window.__tvHealthCheck = result;
});

// Query to change
const targetUrl_ec = "https://ec.europa.eu/transparency/documents-request/api/portal/request/all";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = new URL(details.url);

    // avoid infitie loop, simple fix
    if (url.searchParams.get("modifiedByAddon") === "true") {
      return {};
    }

    // check if label is there
    if (url.searchParams.has("size")) {
      // Modify to 999999
      url.searchParams.set("size", "999999");
    }

    // avoid infitie loop, simple fix
    url.searchParams.append("modifiedByAddon", "true");

    // Redirect 
    return { redirectUrl: url.toString() };
  },
  {
    urls: [targetUrl_ec + "*"], // Match the rest
  },
  ["blocking"]
);

const targetUrl_ep = "https://www.europarl.europa.eu/meps/en/search-meetings";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = new URL(details.url);
    if (url.searchParams.get("modifiedByAddon") === "true") {
      return {};
    }

    // Replace "+" with "%20" in the query string
    url.searchParams.forEach((value, key) => {
      url.searchParams.set(key, encodeURIComponent(value));
    });
    
    // avoid infitie loop, simple fix
    url.searchParams.append("modifiedByAddon", "true");

    // Redirect
    return { redirectUrl: url.toString() };
  },
  {
    urls: [targetUrl_ep + "*"], // Match the rest
  },
  ["blocking"]
);
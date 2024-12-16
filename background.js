// Query to change
const targetUrl = "https://ec.europa.eu/transparency/documents-request/api/portal/request/all";

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
    urls: [targetUrl + "*"], // Match the rest
  },
  ["blocking"]
);

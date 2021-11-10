chrome.runtime.onInstalled.addListener(() => {
  var text = "Hello Welcome to tweenotes"
  chrome.storage.sync.set({"data": text }, function() {
  });
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log("tab changes");
// });

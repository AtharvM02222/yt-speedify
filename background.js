chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
  for (const tab of tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  document.querySelector('video').playbackRate = message.rate;
});

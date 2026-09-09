chrome.runtime.onMessage.addListener((message) => {
  const video = document.querySelector('video');
  if (!video) return;
  video.playbackRate = message.rate;
});

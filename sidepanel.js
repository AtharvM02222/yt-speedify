import './ninja-keys.js';

const ninja = document.querySelector('ninja-keys');

ninja.data = [
  {
    id: '1x',
    title: '1x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 1 });
      });
    }
  },
  {
    id: '2x',
    title: '2x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 2 });
      });
    }
  },
  {
    id: '3x',
    title: '3x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 3 });
      });
    }
  },
  {
    id: '4x',
    title: '4x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 4 });
      });
    }
  },
  {
    id: '5x',
    title: '5x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 5 });
      });
    }
  },
  {
    id: '6x',
    title: '6x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 6 });
      });
    }
  },
  {
    id: '7x',
    title: '7x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 7 });
      });
    }
  },
  {
    id: '8x',
    title: '8x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 8 });
      });
    }
  },
  {
    id: '9x',
    title: '9x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 9 });
      });
    }
  },
  {
    id: '10x',
    title: '10x speed',
    handler: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, t => {
        chrome.tabs.sendMessage(t[0].id, { rate: 10 });
      });
    }
  }
];

ninja.open();

import './ninja-keys.js';

const ninja = document.querySelector('ninja-keys');

ninja.data = [
  { id: '1x',  title: '1x speed',  handler: () => sendRate(1)  },
  { id: '2x',  title: '2x speed',  handler: () => sendRate(2)  },
  { id: '3x',  title: '3x speed',  handler: () => sendRate(3)  },
  { id: '4x',  title: '4x speed',  handler: () => sendRate(4)  },
  { id: '5x',  title: '5x speed',  handler: () => sendRate(5)  },
  { id: '6x',  title: '6x speed',  handler: () => sendRate(6)  },
  { id: '7x',  title: '7x speed',  handler: () => sendRate(7)  },
  { id: '8x',  title: '8x speed',  handler: () => sendRate(8)  },
  { id: '9x',  title: '9x speed',  handler: () => sendRate(9)  },
  { id: '10x', title: '10x speed', handler: () => sendRate(10) },
];

function sendRate(rate) {
  chrome.tabs.query({ active: true, currentWindow: true }, t => {
    chrome.tabs.sendMessage(t[0].id, { rate });
  });
}

ninja.addEventListener('selected', () => setTimeout(() => ninja.open(), 50));

ninja.open();

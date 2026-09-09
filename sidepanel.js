import './ninja-keys.js';

const ninja = document.querySelector('ninja-keys');

ninja.placeholder = 'Pick a speed or type (0.1 – 16)';

ninja.data = [
  { id: '1',  title: '1x'  },
  { id: '2',  title: '2x'  },
  { id: '3',  title: '3x'  },
  { id: '4',  title: '4x'  },
  { id: '5',  title: '5x'  },
  { id: '6',  title: '6x'  },
  { id: '7',  title: '7x'  },
  { id: '8',  title: '8x'  },
  { id: '9',  title: '9x'  },
  { id: '10', title: '10x' },
];

ninja.addEventListener('selected', (e) => {
  const typed = parseFloat(e.detail.search);
  const rate = !isNaN(typed) ? typed : parseFloat(e.detail.action?.id);
  if (rate >= 0.1 && rate <= 16) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { rate });
    });
  }
  setTimeout(() => ninja.open(), 50);
});

ninja.open();

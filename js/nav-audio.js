
if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change color to *color': color => {
        document.body.style.background = color;
      },
      'navigate to *page': page => {
        const p = page.toLowerCase();
        if (p === 'home')   window.location = 'index.html';
        if (p === 'stocks') window.location = 'stocks.html';
        if (p === 'dogs')   window.location = 'dogs.html';
      }
    };
    annyang.addCommands(commands);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-audio').onclick = () => annyang && annyang.start();
    document.getElementById('stop-audio').onclick  = () => annyang && annyang.abort();
  });
  
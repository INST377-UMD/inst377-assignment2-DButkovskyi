// Fech a random quote on load
window.addEventListener('load', () => {
    fetch('https://zenquotes.io/api/random')
      .then(res => res.json())
      .then(data => {
        const { q: quote, a: author } = data[0];
        document.getElementById('quote').textContent =
          `"${quote}" — ${author}`;
      })
      .catch(err => {
        console.error('Quote fetch error:', err);
        document.getElementById('quote').textContent =
          'Could not load quote.';
      });
  });
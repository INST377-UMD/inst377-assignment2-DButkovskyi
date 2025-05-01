const API_KEY = 'MmlQV6tprp8OUwqGn036kr2xi7yYpIu0'; // VERY BAD PRACTICE! NEDS TO BE KEPT AS SECRET ENV VAR
let chart;

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');

  document.getElementById('fetch-data').onclick = () => {
    const ticker = document.getElementById('ticker').value.trim().toUpperCase();
    const days   = +document.getElementById('range').value;
    if (!ticker) return alert('Enter a ticker.');

    // compute date range
    const to   = new Date();
    const from = new Date(Date.now() - days * 24*60*60*1000);
    const fStr = from.toISOString().split('T')[0];
    const tStr = to  .toISOString().split('T')[0];

    // fetch price data
    fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fStr}/${tStr}?apiKey=${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        const labels = data.results.map(r => {
          const d = new Date(r.t);
          return `${d.getMonth()+1}/${d.getDate()}`;
        });
        const vals = data.results.map(r => r.c);

        if (chart) chart.destroy();
        chart = new Chart(ctx, {
          type: 'line',
          data: { labels, datasets: [{ label: ticker, data: vals, fill: false }] },
          options: {
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
              x: { display: true, title: { display: true, text: 'Date' } },
              y: { display: true, title: { display: true, text: 'Close Price' } }
            },
            plugins: {
              legend: { position: 'top' },
              tooltip: { mode: 'index', intersect: false }
            }
          }
        });
      })
      .catch(() => alert('Error loading stock data'));
  };

  // fetch & render top 5 Reddit stocks
  const today = new Date().toISOString().split('T')[0];
  console.log('Fetching Reddit stocks for', today);
  fetch(`https://tradestie.com/api/v1/apps/reddit?date=${today}`)
    .then(r => r.json())
    .then(arr => {
      const top5 = arr
        .sort((a, b) => b.no_of_comments - a.no_of_comments)
        .slice(0, 5);

      const tbody = document.getElementById('reddit-stocks');
      tbody.innerHTML = ''; 

      top5.forEach(s => {
        const icon = s.sentiment === 'Bullish' ? '🔼' : '🔽';
        const count = s.no_of_comments;
        const link  = `https://finance.yahoo.com/quote/${s.ticker}`;
        tbody.innerHTML += `
          <tr>
            <td><a href="${link}" target="_blank">${s.ticker}</a></td>
            <td>${count}</td>
            <td>${icon} ${s.sentiment}</td>
          </tr>`;
      });
    })
    .catch(() => {
      document.getElementById('reddit-stocks').innerHTML =
        '<tr><td colspan="3">Could not load.</td></tr>';
    });
});

let allBreeds = [];

function setupDogsPage() {
  const sliderEl = document.getElementById('dog-slider');
  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(res => res.json())
    .then(data => {
      data.message.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        sliderEl.appendChild(img);
      });
      const slider = simpleslider.getSlider({
        container: sliderEl,
        delay: 3,
        duration: 0.5
      });
      document.getElementById('prev-btn').onclick = () => slider.prev();
      document.getElementById('next-btn').onclick = () => slider.next();
    })
    .catch(err => console.error(err));

  fetch('https://dogapi.dog/api/v2/breeds')
    .then(res => res.json())
    .then(json => {
      allBreeds = json.data;
      const btnContainer = document.getElementById('breed-buttons');
      allBreeds.forEach(item => {
        const name = item.attributes.name;
        const btn  = document.createElement('button');
        btn.textContent = name;
        btn.className   = 'btn';
        btn.onclick     = () => showBreed(item.id);
        btnContainer.appendChild(btn);
      });
    })
    .catch(err => console.error(err));
}

function showBreed(id) {
  const info = document.getElementById('breed-info');
  const item = allBreeds.find(b => b.id === id);
  if (!item) {
    info.innerHTML = '<p>No info available.</p>';
    return;
  }
  const { name, description, life } = item.attributes;
  info.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Description:</strong> ${description || 'N/A'}</p>
    <p><strong>Life Span:</strong> ${life.min}–${life.max} years</p>
  `;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDogsPage);
} else {
  setupDogsPage();
}

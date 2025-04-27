let allBreeds = [];

function setupDogsPage() {
  const slider = document.getElementById('dog-slider');
  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(r => r.json())
    .then(o => {
      o.message.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        slider.appendChild(img);
      });
      // init Simple-Slider (2.3.0)
      if (window.SimpleSlider) {
        SimpleSlider.init();
      }
    })
    .catch(err => console.error('Dog CEO error:', err));

  fetch('https://dogapi.dog/api/v2/breeds')
    .then(r => r.json())
    .then(o => {
      allBreeds = o.data;
      const container = document.getElementById('breed-buttons');
      allBreeds.forEach(item => {
        const name = item.attributes.name;
        const btn  = document.createElement('button');
        btn.textContent = name;
        btn.className   = 'btn';
        btn.onclick     = () => showBreed(item.id);
        container.appendChild(btn);
      });
    })
    .catch(err => console.error('Breed list error:', err));
}

function showBreed(id) {
  const info = document.getElementById('breed-info');
  const item = allBreeds.find(b => b.id === id);
  if (!item) {
    info.innerHTML = '<p>No information available.</p>';
    return;
  }
  const { name, description, life } = item.attributes;
  info.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Life Span:</strong> ${life.min} – ${life.max} years</p>
  `;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDogsPage);
} else {
  setupDogsPage();
}

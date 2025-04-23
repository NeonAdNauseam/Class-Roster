const dataSource = 'https://assets.codepen.io/16425/web-3-spring-2024-roster.json';
const gallery = document.querySelector('main');
const infoPanel = document.getElementById('info-panel');

// Updated query selectors for semantic panel
const infoImg = document.getElementById('info-img');
const infoName = document.getElementById('info-name');
const infoQuote = document.getElementById('info-quote');
const infoSuper = document.getElementById('info-superpower');

fetch(dataSource)
  .then(response => response.json())
  .then(students => {
    students.forEach(student => {
      // Create a character card template
      const template = `
        <div class="character-wrapper" style="--accent-color: ${student.Color};">
          <div class="character" style="background:${student.Color};">
            <div class="card-image">
              <img src="${student.Image}" alt="${student.Name}" />
            </div>
          </div>
        </div>
      `;

      // Insert into DOM
      gallery.insertAdjacentHTML('beforeend', template);

      const newCard = gallery.lastElementChild;

      // Update info panel content
      const updateInfoPanel = () => {
        // Re-trigger panel animation
        infoPanel.classList.remove('active');
        void infoPanel.offsetWidth;
        infoPanel.classList.add('active');

        // Populate semantic content
        infoImg.src = student.Image;
        infoImg.alt = `${student.Name}'s portrait`;
        infoName.textContent = `${student.Emoji} ${student.Name}`;
        infoQuote.textContent = `"${student.Quote}"`;
        infoSuper.textContent = `Superpower: ${student.Superpower}`;

        // Visually mark selected card
        document.querySelectorAll('.character-wrapper').forEach(card => {
          card.classList.remove('selected');
        });
        newCard.classList.add('selected');
      };

      // Trigger on hover (desktop) and click (mobile)
      newCard.addEventListener('mouseenter', updateInfoPanel);
      newCard.addEventListener('click', updateInfoPanel);
    });
  });

const emberContainer = document.getElementById('embers');

function createEmber() {
  const ember = document.createElement('div');
  ember.className = 'ember';

  // Size: BIGGER embers
  const size = Math.random() * 10 + 10; // 10–20px
  ember.style.width = `${size}px`;
  ember.style.height = `${size}px`;

  // Color: Brighter ember tones
  const hue = 10 + Math.random() * 30; // reddish-orange to gold
  const baseColor = `hsl(${hue}, 100%, 65%)`;

  ember.style.background = `radial-gradient(circle, ${baseColor} 0%, transparent 70%)`;

  // Brighter layered glow
  ember.style.boxShadow = `
    0 0 12px ${baseColor},
    0 0 30px ${baseColor},
    0 0 60px ${baseColor}
  `;

  // Position near bottom-left
  ember.style.left = `${-200 + Math.random() * (window.innerWidth + 200)}px`;


  ember.style.bottom = `0px`;

  emberContainer.appendChild(ember);

  // Animate with GSAP
  gsap.to(ember, {
    x: `+=${300 + Math.random() * 300}`,   // drift to the right
    y: `-=${500 + Math.random() * 400}`,   // float up
    scale: 0.4,
    opacity: 0,
    duration: 4 + Math.random() * 2,
    ease: "power1.out",
    onComplete: () => ember.remove()
  });
}

let emberActive = true;

document.addEventListener('visibilitychange', () => {
  emberActive = !document.hidden;

  // Fade all current embers
  gsap.to('#embers', {
    opacity: emberActive ? 1 : 0,
    duration: 0.5,
    ease: "power1.out"
  });
});




// Steady stream of embers
setInterval(() => {
  if (!emberActive) return; // 💡 Prevent ember creation when inactive
  for (let i = 0; i < 2; i++) createEmber();
}, 100);


const dataSource = 'https://assets.codepen.io/16425/Spring-2025-Roster.json';
const gallery = document.querySelector('main');
const infoPanel = document.getElementById('info-panel');

// Updated DOM references
const infoImg = document.getElementById('info-img');
const infoName = document.getElementById('info-name');
const infoQuote = document.getElementById('info-quote');
const infoTalent = document.getElementById('info-talent');
const infoFunFact = document.getElementById('info-funfact');
const infoTeam = document.getElementById('info-team');
const infoColor = document.getElementById('info-color');
const infoSimpsons = document.getElementById('info-simpsons');
const infoBand = document.getElementById('info-band');
const infoFood = document.getElementById('info-food');
const infoSong = document.getElementById('info-song');

fetch(dataSource)
  .then(response => response.json())
  .then(students => {
    students.forEach(student => {
      // Create a character card template
const template = `
  <div class="character-wrapper" style="--accent-color:${student.favoriteColor};">
    <div class="character" style="background:${student.favoriteColor};">
      <div class="card-image">
        <img src="${student.imageUrl}" alt="${student.name}" />
      </div>
    </div>
  </div>
`;


      // Insert into DOM
      gallery.insertAdjacentHTML('beforeend', template);

      const newCard = gallery.lastElementChild;

      const updateInfoPanel = () => {
        infoPanel.classList.remove('active');
        void infoPanel.offsetWidth; // force reflow
        infoPanel.classList.add('active');

        infoImg.src = student.imageUrl;
        infoImg.alt = `${student.name}'s portrait`;
        infoName.textContent = `${student.status} ${student.name}`;
        infoQuote.textContent = student.motto || "No quote.";
        infoTalent.textContent = `${student.talent || "Unknown"}`;
        infoFunFact.textContent = student.funFact || "No fun fact.";
        infoTeam.textContent = student.team || "No team.";
        infoColor.textContent = student.favoriteColor || "N/A";
        infoSimpsons.textContent = student.favoriteSimpsonsCharacter || "N/A";
        infoBand.textContent = student.favoriteBand || "N/A";
        infoFood.textContent = student.favoriteFood || "N/A";
        infoSong.textContent = student.favoriteSong || "N/A";

        document.querySelectorAll('.character-wrapper').forEach(card => {
          card.classList.remove('selected');
        });
        newCard.classList.add('selected');
      };

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
  for (let i = 0; i < 3; i++) createEmber();
}, 100);


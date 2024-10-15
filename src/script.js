const starsContainer = document.querySelector('.stars');

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Postavljamo početnu poziciju na gornji desni ugao
    star.style.left = '100vw'; // Početna pozicija na desnoj strani
    star.style.top = Math.random() * 100 + 'vh'; // Nasumična visina

    // Dodaj zvijezdu u kontejner
    starsContainer.appendChild(star);

    // Animiraj zvijezdu
    animateStar(star);
}

function animateStar(star) {
    const duration = Math.random() * 10 + 5; // Nasumično vreme trajanja animacije (5-15 sekundi)

    star.animate([
        { transform: 'translate(0, 0)' }, // Početna pozicija
        { transform: `translate(-100vw, 100vh)` } // Pomjeraj lijevo i dolje
    ], {
        duration: duration * 1000,
        easing: 'linear', // Linearno kretanje
        iterations: Infinity // Samo jednom se kreće
    });

    // Nakon animacije, ukloni zvijezdu
    star.addEventListener('finish', () => {
        star.remove(); // Ukloni zvijezdu nakon animacije
    });
}

// Kreiraj zvezde u petlji
for (let i = 0; i < 5; i++) { // Postavi broj zvezda na 5
    setTimeout(createStar, i * 2000); // Dodaj odlaganje između zvijezda (2 sekunde)
}

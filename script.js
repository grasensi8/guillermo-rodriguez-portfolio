//Cursor personalizado
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
  cursor.style.opacity = '1'; // Asegura que sea visible al moverse
});

// Cuando el ratón sale de la ventana del navegador
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Cuando vuelve a entrar
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

//Mensaje oculto1 en la foto header
const photoZone = document.getElementById('photoZone');

const introText1 = document.querySelector('.intro-text');
const introText2 = document.querySelector('.intro-text2');

window.addEventListener('mousemove', (e) => {
  const rect = photoZone.getBoundingClientRect();

  const zoneLeft = rect.left + window.scrollX;
  const zoneTop = rect.top + window.scrollY;
  const zoneRight = zoneLeft + rect.width;
  const zoneBottom = zoneTop + rect.height;

  const mouseX = e.pageX;
  const mouseY = e.pageY;

  const inZone = mouseX > zoneLeft && mouseX < zoneRight && mouseY > zoneTop && mouseY < zoneBottom;

  if (inZone) {
    introText1.style.opacity = '1';
    introText1.style.transform = 'translateX(333px)';  // mueve a la derecha

    introText2.style.opacity = '1';
    introText2.style.transform = 'translateX(-366px)'; // mueve a la izquierda
  } else {
    introText1.style.opacity = '0';
    introText1.style.transform = 'translateX(0)';

    introText2.style.opacity = '0';
    introText2.style.transform = 'translateX(0)';
  }
});

//Boton para volver arriba al menu
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 1000) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

//Menú fijo y con background
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) { 
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
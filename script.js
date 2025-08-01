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

//Mensajes ocultos en la foto del index
const photoZone = document.getElementById('photoZone');
const introText1 = document.querySelector('.intro-text');
const introText2 = document.querySelector('.intro-text2');

if (photoZone && introText1 && introText2) {
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
      introText1.style.transform = 'translateX(333px)';

      introText2.style.opacity = '1';
      introText2.style.transform = 'translateX(-366px)';
    } else {
      introText1.style.opacity = '0';
      introText1.style.transform = 'translateX(0)';

      introText2.style.opacity = '0';
      introText2.style.transform = 'translateX(0)';
    }
  });
}

//Botón para volver arriba al menu
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

//Imagen animación hacer scroll en pag. sobre mí
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -190px 0px',
  threshold: 0
});

document.querySelectorAll('.scroll-flip-down').forEach(el => {
  observer.observe(el);
});

//Animación de servicios show room portfolio
const container = document.querySelector('.projects_cards__show_container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const scrollAmount = 600;

if (container && leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

//Animación skills tipo radio
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll('.circle');

  const totalDots = 50;
  const rotationStep = 360 / totalDots;

  // Crear puntos una sola vez al cargar la página
  circles.forEach(circle => {
    for (let i = 0; i < totalDots; i++) {
      const point = document.createElement('div');
      point.classList.add('points');
      point.style.setProperty('--i', i + 1);
      point.style.transform = `rotate(${i * rotationStep}deg) translateY(-50px)`;
      circle.appendChild(point);
    }
  });

  // Observer para activar marcado cuando entren al viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const markedDots = parseInt(circle.getAttribute('data-dots')) || 0;
        const allPoints = circle.querySelectorAll('.points');

        // Añadir clase .marked solo a los necesarios
        for (let i = 0; i < markedDots && i < totalDots; i++) {
          allPoints[i].classList.add('marked');
        }

        observer.unobserve(circle); // Detener observación tras animación
      }
    });
  }, {
    threshold: 0.01 // Con que entre un píxel, se activa
  });

  // Observar cada círculo
  circles.forEach(circle => observer.observe(circle));
});

//Animacion barras habilidades cada vez que se muestran en el viewport se animan
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(
    '.skill-bar .bar .react, .skill-bar .bar .motion, .skill-bar .bar .color, .skill-bar .bar .digitales, .skill-bar .bar .tipografia, .skill-bar .bar .branding, .skill-bar .bar .adobe'
  );

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting > 0) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  bars.forEach(bar => {
    observer.observe(bar);
  });
});

//Contador numérico para seccion estadisticas
 const counters = document.querySelectorAll('.parragragh_style7');
  const duration = 4000; // tiempo de conteo
  const delayBetweenCycles = 3000; // pausa entre ciclos
  const frameRate = 80; // cada cuánto se actualiza

  function startSynchronizedCounting() {
    const stepsMap = new Map();
    const maxSteps = Math.ceil(duration / frameRate);

    // Inicializa todos a 0 y calcula paso por contador
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const step = Math.ceil(target / maxSteps);
      counter.textContent = '0';
      stepsMap.set(counter, { target, current: 0, step });
    });

    let frame = 0;

    function updateCounters() {
      frame++;
      stepsMap.forEach((data, counter) => {
        if (data.current < data.target) {
          data.current += data.step;
          if (data.current > data.target) data.current = data.target;
          counter.textContent = data.current + "+";
        }
      });

      if (frame < maxSteps) {
        setTimeout(updateCounters, frameRate);
      } else {
        setTimeout(() => {
          startSynchronizedCounting(); // vuelve a empezar todos juntos
        }, delayBetweenCycles);
      }
    }

    updateCounters();
  }

  document.addEventListener("DOMContentLoaded", () => {
    startSynchronizedCounting();
  });
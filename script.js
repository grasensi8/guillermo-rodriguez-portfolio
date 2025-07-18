//Cursor personalizado
const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  }
);

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
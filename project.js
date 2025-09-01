// 1. Obtener el parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

// 2. Cargar projects.json
fetch("data/projects.json")
  .then(response => response.json())
  .then(projects => {
    // 3. Buscar el proyecto por ID
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      document.getElementById("project-title").textContent = "Proyecto no encontrado";
      return;
    }

    // 4. Rellenar la plantilla con los datos
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-client").textContent = project.client;
    document.getElementById("project-service").textContent = project.service;
    document.getElementById("project-sector").textContent = project.sector;
    document.getElementById("project-year").textContent = project.year;

    // Párrafos (description es un array)
    const descContainer = document.getElementById("project-description");
    project.description.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      descContainer.appendChild(p);

      const br = document.createElement("br");
      descContainer.appendChild(br);
    });

    // Párrafos
    document.getElementById("project-details").textContent = project.details;


    // Imágenes del proyecto
    const imgContainer = document.getElementById("project-images");
    project.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.title;
      imgContainer.appendChild(img);
    });

    // Más Imágenes del proyecto
    const moreImgContainer = document.getElementById("project-more-images");
    project.moreImages.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.title;
      moreImgContainer.appendChild(img);
    });

    //Link Behance
    document.getElementById("project-link-behance").href = project.linkBehance;

    // Cambiar título de la pestaña
    document.title = `Portfolio Guillermo Rodríguez Asensio | ${project.title}`;

    // Cambiar meta description dinámicamente
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", project.metaDescription);
    }
  })
.catch(error => console.error("Error cargando projects.json:", error));


// Imágenes galería
// Lista de todas las imágenes disponibles
const imageFiles = [
  "images/Imágenes proyectos/Pizzeria Quattrocento.png",
  "images/Imágenes proyectos/Brand Global Summit.png",
  "images/Imágenes proyectos/Carta restauirante Hattori hanzo.png",
  "images/Imágenes proyectos/Unido RCID.png",
  "images/Imágenes proyectos/Manual Señalética.png",
  "images/Imágenes proyectos/Revista A TRAVÉS.png",
  "images/Imágenes proyectos/Libro las Profecías Mayas.jpg",
  "images/Imágenes proyectos/Carteles Music Festival.png"
];

// Seleccionamos el contenedor de la galería
const gallery = document.getElementById("project-gallery");
const imgs = gallery.querySelectorAll("img");

// Hacemos una copia del array para ir eliminando las usadas
const availableImages = [...imageFiles];

// Reemplazamos cada imagen sin repetir
imgs.forEach(img => {
  if (availableImages.length === 0) return; // no quedan más imágenes

  // Elegir índice aleatorio
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  img.src = availableImages[randomIndex];
  img.alt = "Imagen de proyecto";

  // Eliminar la imagen usada para no repetir
  availableImages.splice(randomIndex, 1);
});
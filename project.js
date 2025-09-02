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
    const detailsContainer = document.getElementById("project-details");
    project.details.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      detailsContainer.appendChild(p);

      const br = document.createElement("br");
      detailsContainer.appendChild(br);
    });

    // Imagen main del proyecto
    const mainImgContainer = document.getElementById("project-main-image");
    const mainImg = document.createElement("img");
    mainImg.src = project["project-main-image"]; // Una sola imagen
    mainImg.alt = project.title;
    mainImgContainer.appendChild(mainImg);

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
    document.getElementById("project-link").href = project.link;

    // Cambiar título de la pestaña
    document.title = `Portfolio Guillermo Rodríguez Asensio | ${project.title}`;

    // Cambiar meta description dinámicamente
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", project.metaDescription);
    }
    
    // Mostrar prototipo Figma de CHESSTRA solo en la página proyecto de CHESSTRA en mi portfolio
    if (project.title === "CHESSTRA - Web Platform") {
    const projectContainer = document.getElementById("project-content");

    if (projectContainer) {
      const prototypeContainer = document.createElement("div");
      prototypeContainer.classList.add("figma-prototype");

    prototypeContainer.innerHTML = `
    <h3 style="margin-top: 160px; margin-bottom: 40px; text-align: center;">Prototipo interactivo</h3>
    <div style="display:flex; justify-content:center; margin:1rem 0;">
      <div style="position:relative; width:100%; max-width:1200px; padding-top:75%; overflow:hidden; background-color: transparent; border-radius:12px;">
        <iframe 
          src="${project.prototype}" 
          allowfullscreen 
          style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;">
        </iframe>
      </div>
    </div>
    `;
    projectContainer.appendChild(prototypeContainer);
    // Nos aseguramos de que se muestre
    projectContainer.style.display = "block";
    }
    } else {
    // Si no es CHESSTRA, ocultamos completamente el div
    const projectContainer = document.getElementById("project-content");
    if (projectContainer) projectContainer.style.display = "none";
    }
  })
.catch(error => console.error("Error cargando projects.json:", error));
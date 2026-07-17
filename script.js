// ════════════════════════════════════════════════
// Dropdown Setup
// ════════════════════════════════════════════════
document.querySelector('.options-btn').addEventListener('click', function (e) {
  e.stopPropagation();
  document.getElementById('search-box-container').classList.remove('active');
  document.querySelector('.options-dropdown').classList.toggle('open');
});

document.addEventListener('click', function () {
  const dropdown = document.querySelector('.options-dropdown');
  if (dropdown && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
  }
});

// ════════════════════════════════════════════════
// Dynamic Search Bar Slide Integration Layer
// ════════════════════════════════════════════════
// const searchTrigger = document.getElementById('search-trigger-btn');
// const searchBox = document.getElementById('search-box-container');
// const searchInputField = document.getElementById('search-input-field');

// searchTrigger.addEventListener('click', (e) => {
//     e.stopPropagation();
//    document.querySelector('.options-dropdown').classList.remove('open');
//    searchBox.classList.toggle('active');
//    
//    if (searchBox.classList.contains('active')) {
//        searchInputField.focus();
//    }
// });

// ==============================================
// Dark and Light Mode Context Swapper Logic
// ==============================================
const button = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

button.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  const isDarkMode = body.classList.contains('dark-mode');
  
  if (isDarkMode) {
      themeIcon.src = 'images/dark.png';
      themeIcon.alt = 'Switch to Light Mode';
  } else {
      themeIcon.src = 'images/light.png';
      themeIcon.alt = 'Switch to Dark Mode';
  }
});


// ════════════════════════════════════════════════
// Mobile Hamburger View Controller
// ════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const ctaContainer = document.getElementById('cta-container');

  hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('show');
      ctaContainer.classList.toggle('show');
  });
});

// ===================
// Hero animation
// ===================
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('threadsCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const linesCount = 18; 
  let step = 0;

  const mouse = {
    x: undefined,
    y: undefined,
    radius: 180,
    force: 0.12
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    step += 0.005; 

    for (let i = 0; i < linesCount; i++) {
      ctx.beginPath();
      
      const opacity = (1 - (i / linesCount)) * 0.22;
      ctx.strokeStyle = `rgba(184, 154, 90, ${opacity})`;
      ctx.lineWidth = 1.2;

      for (let x = 0; x < width; x += 10) {
        const baseSin = Math.sin(x * 0.002 + step + (i * 0.08));
        const secondaryCos = Math.cos(x * 0.001 - step * 0.5 + (i * 0.04));
        
        let targetY = (height / 2) + (baseSin * secondaryCos * (height * 0.28));

        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = x - mouse.x;
          const dy = targetY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceFactor = (mouse.radius - distance) / mouse.radius;
            
            targetY += (mouse.y - targetY) * forceFactor * mouse.force;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, targetY);
        } else {
          ctx.lineTo(x, targetY);
        }
      }
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener('click', (event) => {
    if (!searchBox.contains(event.target) && !searchTrigger.contains(event.target)) {
        searchBox.classList.remove('active');
    }
});

// ════════════════════════════════════════════════
// LÓGICA DEL MODAL "PRÓXIMAMENTE" PARA LA TIENDA
// ════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    const cartTriggerBtn = document.getElementById('cart-trigger-btn');
    const storeModal = document.getElementById('store-coming-soon-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalActionBtn = document.getElementById('close-modal-action-btn');

    if (cartTriggerBtn && storeModal) {
        cartTriggerBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            storeModal.classList.add('active');
        });
    }

    const closeModal = () => {
        storeModal.classList.remove('active');
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (closeModalActionBtn) {
        closeModalActionBtn.addEventListener('click', closeModal);
    }

    if (storeModal) {
        storeModal.addEventListener('click', (e) => {
            if (e.target === storeModal) {
                closeModal();
            }
        });
    }
});

// ==============================================
// Term and conditions
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    const textOptions = document.querySelectorAll(".text-container div");
    const descriptions = document.querySelectorAll(".description-item");

    textOptions.forEach((textOption) => {
        textOption.addEventListener("click", () => {
            const id = textOption.getAttribute("data-id");

            textOptions.forEach((text) => text.classList.remove("active"));
            descriptions.forEach((desc) => desc.classList.remove("active"));

            textOption.classList.add("active");
            const matchingDescription = document.querySelector(`.description-item[data-id="${id}"]`);
            
            if (matchingDescription) {
                matchingDescription.classList.add("active");
                matchingDescription.scrollTop = 0;
            }
        });
    });
});

// ==============================================
// Products Page 3D Flip Card Animation
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    const showcaseCard = document.getElementById("dynamic-showcase-card");
    const targetSlot = document.getElementById("grid-target-box");

    function animateShowcaseOnScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const startTop = viewportHeight * 0.65;
        const startLeft = window.innerWidth / 2;
        const startWidth = 280;
        const startHeight = 340;
        const startRotation = 0;

        const targetRect = targetSlot.getBoundingClientRect();
        
        const endTop = targetRect.top + (targetRect.height / 2) + scrollY;
        const endLeft = targetRect.left + (targetRect.width / 2);
        const endWidth = targetRect.width;
        const endHeight = targetRect.height;
        const endRotation = 180; 

        const animationStartScroll = 0;
        const animationEndScroll = viewportHeight * 0.85; 

        let progress = (scrollY - animationStartScroll) / (animationEndScroll - animationStartScroll);
        progress = Math.min(Math.max(progress, 0), 1);

        const lerp = (start, end, amt) => start + (end - start) * amt;

        const currentTop = lerp(startTop, endTop, progress);
        const currentLeft = lerp(startLeft, endLeft, progress);
        const currentWidth = lerp(startWidth, endWidth, progress);
        const currentHeight = lerp(startHeight, endHeight, progress);
        const currentRotation = lerp(startRotation, endRotation, progress);

        showcaseCard.style.setProperty("--img-top", `${currentTop - scrollY}px`); 
        showcaseCard.style.setProperty("--img-left", `${currentLeft}px`);
        showcaseCard.style.setProperty("--img-width", `${currentWidth}px`);
        showcaseCard.style.setProperty("--img-height", `${currentHeight}px`);
        showcaseCard.style.setProperty("--img-rotate", `${currentRotation}deg`);
    }

    window.addEventListener("scroll", animateShowcaseOnScroll);
    window.addEventListener("resize", animateShowcaseOnScroll);
    
    animateShowcaseOnScroll();
});

document.addEventListener("DOMContentLoaded", () => {
    const rCanvas = document.getElementById("goldRainCanvas");
    if (!rCanvas) return;

    const rCtx = rCanvas.getContext("2d");
    let rWidth = rCanvas.width = window.innerWidth;
    let rHeight = rCanvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 90; // Cantidad de hilos de lluvia dorada activos simultáneamente

    const rMouse = {
        x: undefined,
        y: undefined,
        radius: 130, // Radio de repulsión de la lluvia
        force: 0.08
    };

    window.addEventListener("mousemove", (e) => {
        rMouse.x = e.clientX;
        rMouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        rMouse.x = undefined;
        rMouse.y = undefined;
    });

    window.addEventListener("resize", () => {
        rWidth = rCanvas.width = window.innerWidth;
        rHeight = rCanvas.height = window.innerHeight;
    });

    // Constructor de partículas individuales de oro
    class GoldDrop {
        constructor() {
            this.reset();
            // Iniciar en una posición aleatoria dentro de la altura de pantalla
            this.y = Math.random() * rHeight;
        }

        reset() {
            this.x = Math.random() * rWidth;
            this.y = -20; // Reaparece un poco más arriba de la pantalla
            this.length = Math.random() * 15 + 10; // Longitud del hilo de lluvia
            this.speed = Math.random() * 2 + 1.5; // Velocidad de caída
            this.opacity = Math.random() * 0.3 + 0.15; // Luminosidad dorada
            this.width = Math.random() * 1 + 0.6; // Grosor de la línea
            this.vx = 0; // Velocidad lateral acumulada (interacción)
        }

        update() {
            // Movimiento por defecto de caída vertical
            this.y += this.speed;

            // Retorno progresivo a la verticalidad natural de la gota
            this.vx *= 0.95; 
            this.x += this.vx;

            // Interacción física con el cursor
            if (rMouse.x !== undefined && rMouse.y !== undefined) {
                const dx = this.x - rMouse.x;
                const dy = this.y - rMouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < rMouse.radius) {
                    const forceFactor = (rMouse.radius - distance) / rMouse.radius;
                    // Empujar la gota de lluvia hacia los lados dependiendo de su posición relativa al cursor
                    const direction = dx > 0 ? 1 : -1;
                    this.vx += direction * forceFactor * rMouse.force * 25;
                }
            }

            // Si la partícula llega al fondo, reaparece en el borde superior
            if (this.y > rHeight) {
                this.reset();
            }
        }

        draw() {
            rCtx.beginPath();
            // Genera la trayectoria lineal vertical
            rCtx.moveTo(this.x, this.y);
            rCtx.lineTo(this.x + this.vx, this.y + this.length);
            
            // Degradado dorado elegante para cada hilo vertical
            rCtx.strokeStyle = `rgba(184, 154, 90, ${this.opacity})`;
            rCtx.lineWidth = this.width;
            rCtx.stroke();
        }
    }

    // Inicializar el arreglo de partículas doradas
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new GoldDrop());
    }

    function animateRain() {
        // Un efecto sutil de barrido con opacidad ayuda a crear un leve rastro (trail effect)
        rCtx.clearRect(0, 0, rWidth, rHeight);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateRain);
    }

    animateRain();
});


// ==============================================
// Controlador de Formulario Multietapa en Español
// ==============================================
const initMultiStepForm = () => {
  const form = document.getElementById("multi-step-form");
  if (!form) return; 

  const steps = Array.from(form.querySelectorAll(".form-step"));
  const tabs = Array.from(document.querySelectorAll(".step-tab"));
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const footerNav = document.getElementById("wizard-footer-nav");
  const successScreen = document.getElementById("success-screen");
  let currentStepIndex = 0;

  function updateFormWizardView() {
    steps.forEach((step, idx) => step.classList.toggle("active", idx === currentStepIndex));
    tabs.forEach((tab, idx) => tab.classList.toggle("active", idx === currentStepIndex));
    
    if (currentStepIndex === 0) {
      prevBtn.classList.add("invisible");
    } else {
      prevBtn.classList.remove("invisible");
    }

    if (currentStepIndex === steps.length - 1) {
      nextBtn.textContent = "Enviar Formulario";
    } else {
      nextBtn.textContent = "Siguiente Paso ›";
    }
  }

  function validateCurrentStep() {
    const activeStep = steps[currentStepIndex];
    let isStepValid = true;

    const requiredInputs = activeStep.querySelectorAll("input[required], textarea[required]");
    requiredInputs.forEach(input => {
      if (input.closest(".hidden")) return;
      
      let isValidInput = true;
      
      if (input.id === "contact-phone") {
        if (input.value.trim().length < 7) {
          isValidInput = false;
        }
      } else if (!input.value.trim()) {
        isValidInput = false;
      }

      if (!isValidInput) {
        input.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        input.closest(".input-group").classList.remove("invalid");
      }
    });

    const emailInputs = activeStep.querySelectorAll("input[type='email']");
    emailInputs.forEach(email => {
      if (email.closest(".hidden")) return;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        email.closest(".input-group").classList.remove("invalid");
      }
    });

    return isStepValid;
  }

  form.addEventListener("input", (e) => {
    const group = e.target.closest(".input-group");
    if (group && group.classList.contains("invalid")) {
      group.classList.remove("invalid");
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateFormWizardView();
    } else {
      steps.forEach(step => step.classList.remove("active"));
      footerNav.classList.add("hidden");
      successScreen.classList.remove("hidden");
      
      form.reset();
      currentStepIndex = 0;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateFormWizardView();
    }
  });

  const radioMethods = form.querySelectorAll('input[name="contact-method"]');
  const emailFieldGroup = document.getElementById("email-field-group");
  const phoneFieldGroup = document.getElementById("phone-field-group");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");

  radioMethods.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "email") {
        emailFieldGroup.classList.remove("hidden");
        phoneFieldGroup.classList.add("hidden");
        emailInput.setAttribute("required", "true");
        phoneInput.removeAttribute("required");
      } else {
        emailFieldGroup.classList.add("hidden");
        phoneFieldGroup.classList.remove("hidden");
        phoneInput.setAttribute("required", "true");
        emailInput.removeAttribute("required");
      }
    });
  });

  if (emailInput) emailInput.setAttribute("required", "true");

  const categoryButtons = form.querySelectorAll(".cat-btn");
  const hiddenCategoryInput = document.getElementById("selected-category");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      if (hiddenCategoryInput) hiddenCategoryInput.value = button.getAttribute("data-category");
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMultiStepForm);
} else {
  initMultiStepForm();
}

// ==============================================
// FAQ Section
// ==============================================
const initFaqPage = () => {
  const container = document.querySelector(".faq-page-wrapper");
  if (!container) return; 

  const triggers = container.querySelectorAll(".faq-accordion-trigger");
  
  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".faq-accordion-item");
      const content = item.querySelector(".faq-accordion-content");
      const isOpen = item.classList.contains("open");

      const activeSection = item.closest(".faq-section-block");
      activeSection.querySelectorAll(".faq-accordion-item").forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");
          otherItem.querySelector(".faq-accordion-content").style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        item.classList.remove("open");
        content.style.maxHeight = null;
      }
    });
  });

  const navLinks = container.querySelectorAll(".faq-nav-link");
  const sections = container.querySelectorAll(".faq-section-block");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("data-target");

      navLinks.forEach(btn => btn.classList.remove("active"));
      link.classList.add("active");

      sections.forEach(section => {
        if (section.id === `sec-${targetId}`) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });

  const searchInput = document.getElementById("faq-search-input");
  const allAccordionItems = container.querySelectorAll(".faq-accordion-item");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      if (searchTerm.length > 0) {
        sections.forEach(sec => sec.classList.add("active"));
        navLinks.forEach(btn => btn.classList.remove("active"));
      } else {
        sections.forEach((sec, idx) => sec.classList.toggle("active", idx === 0));
        if (navLinks[0]) navLinks[0].classList.add("active");
      }

      allAccordionItems.forEach(item => {
        const questionText = item.querySelector(".faq-accordion-trigger span").textContent.toLowerCase();
        const answerText = item.querySelector(".faq-accordion-content p").textContent.toLowerCase();

        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFaqPage);
} else {
  initFaqPage();
}

// ==========================================================================
// MÓDULO DE BÚSQUEDA Y FILTRADO - SECCIÓN MAIN (MOSAVID)
// ==========================================================================

const SITE_DATA = [
    { id: 1, category: 'productos', title: 'Lukara - Serum', desc: 'Fórmula avanzada reafirmante con activos antioxidantes para devolverle la luminosidad natural a tu piel.', url: 'lukaraS.html', img: 'images/lukara-serum.jpg' },
    { id: 2, category: 'productos', title: 'Lukara - Day', desc: 'Crema hidratante de día diseñada para proteger la barrera cutánea frente a agentes externos y rayos UV.', url: 'lukaraD.html', img: 'images/lukara-day.jpg' },
    { id: 3, category: 'productos', title: 'Lukara - Night', desc: 'Tratamiento restaurador de noche que asiste la regeneración celular profunda mientras descansas.', url: 'lukaraN.html', img: 'images/lukara-night.jpg' },
    { id: 4, category: 'recursos', title: '¿En qué orden debo aplicar la línea Lukara?', desc: 'Aplica primero el Serum sobre la piel limpia, seguido de la crema Day por la mañana o la crema Night por la noche.', url: 'faq.html', img: 'images/logo.png' },
    { id: 5, category: 'recursos', title: '¿Los productos de MOSAVID son aptos para pieles sensibles?', desc: 'Sí, todas nuestras fórmulas están testadas dermatológicamente y libres de irritantes agresivos.', url: 'faq.html', img: 'images/logo.png' }
];

const centralSearchField = document.getElementById('central-search-field');
const resultsCountText = document.getElementById('results-count-text');
const resultsOutputContainer = document.getElementById('results-output-container');
const filterAll = document.getElementById('filter-all');
const sectionFilters = document.querySelectorAll('.section-filter');

const getQueryParam = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
};

const performSearch = () => {
    if (!centralSearchField || !resultsOutputContainer || !resultsCountText) return;

    const query = centralSearchField.value.toLowerCase().trim();
    
    let activeCategories = [];
    if (!filterAll.checked) {
        sectionFilters.forEach(f => { if(f.checked) activeCategories.push(f.value); });
    }

    const matchedResults = SITE_DATA.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
        const matchesCategory = filterAll.checked || activeCategories.includes(item.category);
        return matchesQuery && matchesCategory;
    });

    resultsCountText.textContent = `${matchedResults.length} resultados encontrados`;

    resultsOutputContainer.innerHTML = '';
    if (matchedResults.length === 0) {
        resultsOutputContainer.innerHTML = `<p style="color: var(--muted); padding: 2rem 0;">No encontramos coincidencias para tu búsqueda. Intenta con otras palabras clave.</p>`;
        return;
    }

    matchedResults.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.className = 'result-card';
        card.innerHTML = `
            <div class="result-img-wrapper">
                <img src="${item.img}" alt="${item.title}" onerror="this.src='images/logo.png'">
            </div>
            <div class="result-info">
                <span class="result-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        resultsOutputContainer.appendChild(card);
    });
};

if (filterAll) {
    filterAll.addEventListener('change', () => {
        if (filterAll.checked) {
            sectionFilters.forEach(f => f.checked = false);
        }
        performSearch();
    });
}

sectionFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        if (filter.checked && filterAll) filterAll.checked = false;
        
        const anyChecked = Array.from(sectionFilters).some(f => f.checked);
        if (!anyChecked && filterAll) filterAll.checked = true;
        
        performSearch();
    });
});

if (centralSearchField) {
    centralSearchField.addEventListener('input', performSearch);
}

document.addEventListener('DOMContentLoaded', () => {
    if (centralSearchField) {
        const initialQuery = getQueryParam();
        centralSearchField.value = initialQuery;
        performSearch();
    }
});

// ==========================================================================
// MOTOR DINÁMICO DE SCROLL Y PINNING (.PIN-SPACER)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const spacers = document.querySelectorAll('.pin-spacer');
    const track = document.querySelector('.vo-stack-track');

    if (spacers.length === 0 || !track) return;

    const collapsedCardHeight = window.innerWidth > 768 ? 65 : 45;
    const baseTopOffset = 130; 

    const handleScrollPinning = () => {
        const trackRect = track.getBoundingClientRect();
        
        spacers.forEach((spacer, index) => {
            const cardContent = spacer.querySelector('.vo-card-content');
            const targetTop = baseTopOffset + (index * collapsedCardHeight);
            
            const spacerRect = spacer.getBoundingClientRect();

            if (spacerRect.top <= targetTop) {
                spacer.classList.add('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'fixed';
                    cardContent.style.top = `${targetTop}px`;
                }
                
                spacer.style.height = `${spacerRect.height}px`;
            } else {
                spacer.classList.remove('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'relative';
                    cardContent.style.top = 'auto';
                }
                spacer.style.height = 'auto';
            }
        });
    };

    window.addEventListener('scroll', handleScrollPinning, { passive: true });
    window.addEventListener('resize', handleScrollPinning);
    handleScrollPinning();
});

// ==========================================================================
// Scroll Text Animation Module (.SCROLL-TEXT)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const textElements = document.querySelectorAll('.scroll-text');

  if (!textElements.length) return;

  textElements.forEach((textElement) => {
    const text = textElement.getAttribute('data-text');
    if (!text) return;
    
    const textArray = text.split('');

    textElement.innerHTML = textArray
      .map(letter => `<span>${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const letters = entry.target.querySelectorAll('span');
            
            letters.forEach((span, letterIndex) => {
              setTimeout(() => {
                span.classList.add('visible');
              }, letterIndex * 30); 
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 } 
    );

    observer.observe(textElement);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const vCanvas = document.getElementById('verticalCanvas');
  
  // Seguridad: Solo ejecuta si el canvas vertical existe en la página
  if (!vCanvas) return;

  const vCtx = vCanvas.getContext('2d');

  let vWidth = vCanvas.width = window.innerWidth;
  let vHeight = vCanvas.height = window.innerHeight;

  const vLinesCount = 20; // Incrementado ligeramente para mejor densidad visual
  let vStep = 0;

  // Variables de ratón aisladas
  const vMouse = {
    x: undefined,
    y: undefined,
    radius: 220,       // Radio de distorsión un poco más grande para el movimiento rápido
    force: 0.18        // Mayor sensibilidad al puntero
  };

  window.addEventListener('mousemove', (e) => {
    vMouse.x = e.clientX;
    vMouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    vMouse.x = undefined;
    vMouse.y = undefined;
  });

  function resizeVertical() {
    vWidth = vCanvas.width = window.innerWidth;
    vHeight = vCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeVertical);

  function animateVertical() {
    vCtx.clearRect(0, 0, vWidth, vHeight);

    // CONTROL DE VELOCIDAD: Incrementado a 0.015 para una oscilación más rápida y fluida
    vStep += 0.015; 

    for (let i = 0; i < vLinesCount; i++) {
      vCtx.beginPath();
      
      const opacity = (1 - (i / vLinesCount)) * 0.25;
      vCtx.strokeStyle = `rgba(184, 154, 90, ${opacity})`;
      vCtx.lineWidth = 1.2;

      // COBERTURA TOTAL: Distribuye las líneas proporcionalmente cubriendo todo el ancho de la pantalla
      const baseLineX = (vWidth / (vLinesCount - 1)) * i;

      for (let y = 0; y < vHeight; y += 10) {
        const baseSin = Math.sin(y * 0.002 + vStep + (i * 0.08));
        const secondaryCos = Math.cos(y * 0.001 - vStep * 0.5 + (i * 0.04));
        
        // MOVIMIENTO DE LADO A LADO: Mayor amplitud (vWidth * 0.12) para que viajen más hacia los laterales
        let targetX = baseLineX + (baseSin * secondaryCos * (vWidth * 0.12));

        // Interacción física con el ratón
        if (vMouse.x !== undefined && vMouse.y !== undefined) {
          const dx = targetX - vMouse.x;
          const dy = y - vMouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < vMouse.radius) {
            const forceFactor = (vMouse.radius - distance) / vMouse.radius;
            targetX += (vMouse.x - targetX) * forceFactor * vMouse.force;
          }
        }

        if (y === 0) {
          vCtx.moveTo(targetX, y);
        } else {
          vCtx.lineTo(targetX, y);
        }
      }
      vCtx.stroke();
    }

    requestAnimationFrame(animateVertical);
  }

  animateVertical();
});

// ==========================================================================
// Product Page Mobile Devices 
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', function() {
            this.classList.toggle('mobile-flip');
        });
    }

    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('click', function() {

            ingredients.forEach(item => {
                if(item !== this) item.classList.remove('expanded');
            });
            this.classList.toggle('expanded');
        });
    });
    
});

// ==========================================================================
// Familia & Historia Section Animation Engine
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        {
            trigger: document.querySelector('.bg-half-left'),
            glow: document.querySelector('.familia-section .ether-glow'),
            easing: 0.06,
            target: { x: 0, y: 0 },
            current: { x: 0, y: 0 }
        },
        {
            trigger: document.querySelector('.bg-half-right'),
            glow: document.querySelector('.historia-section .ether-glow'),
            easing: 0.05,
            target: { x: 0, y: 0 },
            current: { x: 0, y: 0 }
        }
    ];

    sections.forEach(s => {
        if (s.trigger) {
            // Set initial position
            s.target.x = s.trigger.offsetWidth / 2;
            s.target.y = s.trigger.offsetHeight / 2;
            s.current = { ...s.target };
            
            s.trigger.addEventListener('mousemove', (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                s.target.x = e.clientX - rect.left;
                s.target.y = e.clientY - rect.top;
            });
        }
    });

    function update() {
        sections.forEach(s => {
            if (!s.trigger || !s.glow) return;
            
            s.current.x += (s.target.x - s.current.x) * s.easing;
            s.current.y += (s.target.y - s.current.y) * s.easing;
            
            s.glow.style.left = `${s.current.x}px`;
            s.glow.style.top = `${s.current.y}px`;
        });
        requestAnimationFrame(update);
    }

    update();
});
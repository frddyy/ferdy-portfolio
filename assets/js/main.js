/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Check for previously selected theme
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Detect system theme
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

// Get current theme and icon
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// Apply theme
if (selectedTheme) {
  // Apply user-selected theme
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
} else {
  // Apply system theme if no user preference
  if (systemPrefersDark) {
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
  } else {
    document.body.classList.remove(darkTheme);
    themeButton.classList.remove(iconTheme);
  }
}

// Manually toggle theme
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // Save the current theme and icon
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== ACCORDION SKILLS ====================*/
function toggleSkills() {
  const itemClass = this.parentNode.className;
  const skillsContent = document.querySelectorAll(".skills__content");

  skillsContent.forEach((content) => {
    content.className = "skills__content skills__close";
  });

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
function initializeServicesModal() {
  const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

  function modal(modalClick) {
    modalViews[modalClick].classList.add("active-modal");
  }

  modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
      modal(i);
    });
  });

  modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
      modalViews.forEach((modalView) => {
        modalView.classList.remove("active-modal");
      });
    });
  });
}

/*==================== PORTFOLIO SWIPER ====================*/
let swiperPortfolio;

function initializePortfolioSwiper() {
  swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}

/*==================== TESTIMONIAL SWIPER ====================*/
// let swiperTestimonial = new Swiper(".testimonial__container", {
//   loop: true,
//   grabCursor: true,
//   spaceBetween: 48,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
//   breakpoints: {
//     568: {
//       slidesPerView: 2,
//     },
//   },
// });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50; // Offset for fixed header
    const sectionId = current.getAttribute("id");

    const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) navLink.classList.add("active-link");
    } else {
      if (navLink) navLink.classList.remove("active-link");
    }
  });
}

// Attach the event listener for scrolling
window.addEventListener("scroll", scrollActive);

/*==================== LOAD CONTENT FROM JSON ====================*/
async function loadContent() {
  try {
    const response = await fetch("data/data.json");
    const data = await response.json();

    // Header
    if (data.header) {
      document.querySelector(".nav__logo").textContent = data.header.logo;

      const navList = document.querySelector(".nav__list");
      navList.innerHTML = "";
      data.header.menu.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "nav__item";
        listItem.innerHTML = `
                    <a href="${item.link}" class="nav__link">
                        <i class="${item.icon} nav__icon"></i>${item.text}
                    </a>`;
        navList.appendChild(listItem);
      });
    }

    // Home
    if (data.home) {
      document.querySelector(".home__title").textContent = data.home.title;
      document.querySelector(".home__subtitle").textContent =
        data.home.subtitle;
      document.querySelector(".home__description").textContent =
        data.home.description;
      document
        .querySelector(".home__blob-img")
        .setAttribute("href", data.home.img);

      const homeSocial = document.querySelector(".home__social");
      homeSocial.innerHTML = "";
      data.home.socials.forEach((social) => {
        const link = document.createElement("a");
        link.href = social.link;
        link.target = "_blank";
        link.className = "home__social-icon";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        homeSocial.appendChild(link);
      });
    }

    // About
    if (data.about) {
      document.querySelector(".about__img").src = data.about.img;
      document.querySelector(".about__description").textContent =
        data.about.description;

      const aboutInfo = document.querySelector(".about__info");
      aboutInfo.innerHTML = "";
      data.about.info.forEach((info) => {
        aboutInfo.innerHTML += `
                    <div>
                        <span class="about__info-title">${info.title}</span>
                        <span class="about__info-name">${info.subtitle}</span>
                    </div>`;
      });

      // const aboutButtons = document.querySelector(".about__buttons");
      // aboutButtons.innerHTML = `
      //           <a download="" href="${data.about.cv}" class="button button--flex">
      //               Download CV <i class="uil uil-download-alt button__icon"></i>
      //           </a>`;
    }

    // Skills
    if (data.skills) {
      const skillsGrid = document.getElementById("skills-grid");
      skillsGrid.innerHTML = "";

      data.skills.forEach((category) => {
        // Membuat elemen kategori skill
        const categorySection = document.createElement("div");
        categorySection.className = "skills__category";
        categorySection.innerHTML = `
      <h3 class="skills__category-title">${category.title}</h3>
      <p class="skills__category-subtitle">${category.subtitle}</p>
      <div class="skills__items">
        ${category.skills
          .map((skill) => {
            // Periksa apakah ikon menggunakan URL atau class
            if (skill.icon.startsWith("http")) {
              return `
                <div class="skills__item">
                  <img src="${skill.icon}" alt="${skill.name} Icon" class="skills__icon" />
                  <p class="skills__name">${skill.name}</p>
                </div>
              `;
            } else {
              return `
                <div class="skills__item">
                  <i class="${skill.icon} skills__icon"></i>
                  <p class="skills__name">${skill.name}</p>
                </div>
              `;
            }
          })
          .join("")}
      </div>
    `;
        // Menambahkan elemen ke grid
        skillsGrid.appendChild(categorySection);
      });

      initializeSkillsSlider(); // Animasi horizontal
    }

    // Qualification
    // if (data.qualification) {
    //   const qualificationSections = document.querySelector(
    //     ".qualification__sections"
    //   );

    //   // Clear existing content
    //   qualificationSections.innerHTML = "";

    //   // Function to create qualification content dynamically
    //   function createQualificationSection(sectionId, qualifications) {
    //     const section = document.createElement("div");
    //     section.className = `qualification__content ${
    //       sectionId === "education" ? "qualification__active" : ""
    //     }`;
    //     section.setAttribute("data-content", "");
    //     section.setAttribute("id", sectionId);

    //     section.innerHTML = qualifications
    //       .map((item, index) => {
    //         return `
    //     <div class="qualification__data">
    //       ${
    //         index % 2 === 0
    //           ? `
    //       <div>
    //         <h3 class="qualification__title">${item.title}</h3>
    //         <span class="qualification__subtitle">${item.subtitle}</span>
    //         <div class="qualification__calendar">
    //           <i class="uil uil-calendar-alt"></i> ${item.calendar}
    //         </div>
    //       </div>
    //       <div>
    //         <span class="qualification__rounder"></span>
    //         ${
    //           index < qualifications.length - 1
    //             ? '<span class="qualification__line"></span>'
    //             : ""
    //         }
    //       </div>
    //       <div></div>`
    //           : `
    //       <div></div>
    //       <div>
    //         <span class="qualification__rounder"></span>
    //         ${
    //           index < qualifications.length - 1
    //             ? '<span class="qualification__line"></span>'
    //             : ""
    //         }
    //       </div>
    //       <div>
    //         <h3 class="qualification__title">${item.title}</h3>
    //         <span class="qualification__subtitle">${item.subtitle}</span>
    //         <div class="qualification__calendar">
    //           <i class="uil uil-calendar-alt"></i> ${item.calendar}
    //         </div>
    //       </div>`
    //       }
    //     </div>
    //   `;
    //       })
    //       .join("");

    //     qualificationSections.appendChild(section);
    //   }

    //   // Generate Education and Work sections
    //   createQualificationSection("education", data.qualification.education);
    //   createQualificationSection("work", data.qualification.work);

    //   // Tabs Functionality
    //   const tabs = document.querySelectorAll(".qualification__button");
    //   const contents = document.querySelectorAll(".qualification__content");

    //   tabs.forEach((tab) => {
    //     tab.addEventListener("click", () => {
    //       const target = document.querySelector(tab.dataset.target);

    //       // Remove active classes
    //       tabs.forEach((t) => t.classList.remove("qualification__active"));
    //       contents.forEach((c) => c.classList.remove("qualification__active"));

    //       // Add active classes
    //       tab.classList.add("qualification__active");
    //       target.classList.add("qualification__active");
    //     });
    //   });
    // }

    // Services
    if (data.services) {
      const servicesContainer = document.querySelector(".services__container");
      servicesContainer.innerHTML = "";
      data.services.forEach((service) => {
        const serviceContent = document.createElement("div");
        serviceContent.className = "services__content";
        serviceContent.innerHTML = `
                    <div>
                        <i class="${service.icon} services__icon"></i>
                        <h3 class="services__title">${service.title}</h3>
                    </div>
                    <span class="button button--flex button--small button--link services__button">
                        View More
                        <i class="uil uil-arrow-right button__icon"></i>
                    </span>
                    <div class="services__modal">
                        <div class="services__modal-content">
                            <h4 class="services__modal-title">${
                              service.title
                            }</h4>
                            <i class="uil uil-times services__modal-close"></i>
                            <ul class="services__modal-services grid">
                                ${service.description
                                  .map(
                                    (desc) => `
                                    <li class="services__modal-service">
                                        <i class="uil uil-check-circle services__modal-icon"></i>
                                        <p>${desc}</p>
                                    </li>`
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    </div>`;
        servicesContainer.appendChild(serviceContent);
      });

      // Reinitialize modal functionality
      initializeServicesModal();
    }

    // Portfolio
    if (data.portfolio) {
      const portfolioWrapper = document.getElementById("portfolio-items");
      const modal = document.getElementById("portfolio-modal");
      const closeModal = document.getElementById("close-modal");
      const modalImages = document.getElementById("modal-images");

      // Render Portfolio Items
      data.portfolio.forEach((project) => {
        const hasMultipleImages = project.images.length > 1;

        const projectItem = document.createElement("div");
        projectItem.className = "portfolio__content grid swiper-slide";
        projectItem.innerHTML = `
      <div class="portfolio__img-wrapper">
        <img src="${project.images[0]}" alt="${
          project.title
        }" class="portfolio__img" data-id="${project.title}">
        ${
          hasMultipleImages
            ? '<div class="portfolio__img-icon"><i class="uil uil-images"></i></div>'
            : ""
        }
      </div>
      <div class="portfolio__data">
        <h3 class="portfolio__title">${project.title}</h3>
        <p class="portfolio__description">${project.description}</p>
        <div class="portfolio__details">
          <div class="portfolio__badge">
            <i class="uil uil-brackets-curly"></i> ${project.technologies}
          </div>
          <div class="portfolio__badge">
            <i class="uil uil-calendar-alt"></i> ${project.timeframe}
          </div>
        </div>
        ${
          project.hasGithub
            ? `<a href="${project.github}" target="_blank" class="button button--flex">
         Code <i class="uil uil-github button__icon"></i>
       </a>`
            : ""
        }

      </div>
    `;

        portfolioWrapper.appendChild(projectItem);

        // Open Modal when Image is Clicked
        const projectImage = projectItem.querySelector(".portfolio__img");
        projectImage.addEventListener("click", () => {
          openModal(project.images);
        });

        // Open Modal when Icon is Clicked
        const imgIcon = projectItem.querySelector(".portfolio__img-icon");
        if (imgIcon) {
          imgIcon.addEventListener("click", (e) => {
            e.stopPropagation(); // Menghindari event bubbling
            openModal(project.images);
          });
        }
      });

      // Open Modal Function
      function openModal(images) {
        if (!images || images.length === 0) {
          console.error("No images found for modal.");
          return; // Hentikan jika tidak ada gambar
        }

        modal.style.display = "flex";
        modalImages.innerHTML = ""; // Clear previous images

        images.forEach((img) => {
          modalImages.innerHTML += `
        <div class="swiper-slide">
          <img src="${img}" alt="Project Image">
        </div>
      `;
        });

        // Tampilkan modal dengan menambahkan class "show"
        modal.classList.add("show");

        // Tunggu modal terlihat sebelum inisialisasi Swiper
        setTimeout(() => {
          initializeModalSwiper(); // Inisialisasi Swiper
        }, 500); // Delay kecil untuk memastikan modal stabil
      }

      // Close Modal
      closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
      });

      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });

      // Initialize Swiper for Modal
      function initializeModalSwiper() {
        new Swiper(".modal-swiper-container", {
          loop: true,
          navigation: {
            nextEl: ".swiper-modal-next",
            prevEl: ".swiper-modal-prev",
          },
          pagination: {
            el: ".swiper-modal-pagination",
            clickable: true,
          },
        });
      }

      // Initialize Portfolio Swiper
      initializePortfolioSwiper();
    }

    // Project in Mind
    if (data.project) {
      const projectContainer = document.querySelector(".project__container");
      if (projectContainer) {
        document.querySelector(".project__title").textContent =
          data.project.title;
        document.querySelector(".project__description").textContent =
          data.project.description;
        document.querySelector(".project__img").src = data.project.img;
        document
          .querySelector(".project__link")
          .setAttribute("href", data.project.link);
      }
    }

    // Testimonial
    // if (Array.isArray(data.testimonial)) {
    //   const testimonialContainer = document.querySelector(
    //     ".testimonial__container .swiper-wrapper"
    //   );
    //   testimonialContainer.innerHTML = ""; // Clear existing content

    //   data.testimonial.forEach((testimonial) => {
    //     const testimonialSlide = document.createElement("div");
    //     testimonialSlide.className = "testimonial__content swiper-slide";
    //     testimonialSlide.innerHTML = `
    //   <div class="testimonial__data">
    //     <div class="testimonial__header">
    //       <img src="${testimonial.img}" alt="" class="testimonial__img">
    //       <div>
    //         <h3 class="testimonial__name">${testimonial.name}</h3>
    //         <span class="testimonial__client">${testimonial.role}</span>
    //       </div>
    //     </div>
    //     <div>
    //       ${Array(testimonial.rating)
    //         .fill('<i class="uil uil-star testimonial__icon-star"></i>')
    //         .join("")}
    //     </div>
    //   </div>
    //   <p class="testimonial__description">${testimonial.comment}</p>
    // `;
    //     testimonialContainer.appendChild(testimonialSlide);
    //   });

    //   // Reinitialize Swiper for testimonials
    //   new Swiper(".testimonial__container", {
    //     loop: true,
    //     grabCursor: true,
    //     spaceBetween: 48,
    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //       dynamicBullets: true,
    //     },
    //     breakpoints: {
    //       568: {
    //         slidesPerView: 2,
    //       },
    //     },
    //   });
    // }

    //Footer
    // Footer
    if (data.footer) {
      // Update footer title and subtitle
      document.querySelector(".footer__title").textContent = data.footer.title;
      document.querySelector(".footer__subtitle").textContent =
        data.footer.subtitle;

      // Update footer links
      const footerLinks = document.querySelector(".footer__links");
      footerLinks.innerHTML = ""; // Clear any existing content
      data.footer.links.forEach((link) => {
        const linkItem = document.createElement("li");
        linkItem.innerHTML = `<a href="${link.link}" class="footer__link">${link.text}</a>`;
        footerLinks.appendChild(linkItem);
      });

      // Update footer socials
      const footerSocials = document.querySelector(".footer__socials");
      footerSocials.innerHTML = ""; // Clear any existing content
      data.footer.socials.forEach((social) => {
        const socialLink = document.createElement("a");
        socialLink.href = social.link;
        socialLink.target = "_blank";
        socialLink.className = "footer__social";
        socialLink.innerHTML = `<i class="${social.icon}"></i>`;
        footerSocials.appendChild(socialLink);
      });

      // Update footer copyright
      document.querySelector(".footer__copy").innerHTML = data.footer.copy;
    }
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

/*==================== INITIALIZE SKILLS SLIDER ====================*/
function initializeSkillsSlider() {
  const sliders = document.querySelectorAll(".skills__items");

  sliders.forEach((slider) => {
    let scrollAmount = 2; // Kecepatan scroll
    let isHoveredOrTouched = false; // Menandakan apakah pengguna berinteraksi

    // Duplikasi elemen untuk menciptakan efek loop
    const items = Array.from(slider.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      slider.appendChild(clone);
    });

    // Deteksi hover (desktop) atau touch (mobile)
    slider.addEventListener("mouseenter", () => {
      isHoveredOrTouched = true;
    });
    slider.addEventListener("mouseleave", () => {
      isHoveredOrTouched = false;
    });
    slider.addEventListener("touchstart", () => {
      isHoveredOrTouched = true;
    });
    slider.addEventListener("touchend", () => {
      isHoveredOrTouched = false;
    });

    function scrollAnimation() {
      if (!isHoveredOrTouched) {
        slider.scrollLeft += scrollAmount;

        // Jika scroll mencapai akhir elemen asli
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0; // Reset ke awal tanpa jeda
        }
      }

      requestAnimationFrame(scrollAnimation); // Lanjutkan animasi
    }

    scrollAnimation();
  });
}


document.addEventListener("DOMContentLoaded", loadContent);

function generateMailto(event) {
  event.preventDefault(); // Mencegah reload formulir

  // Ambil nilai input
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const project = document.getElementById("project").value;
  const message = document.getElementById("message").value;

  // Format isi email
  const subject = encodeURIComponent(`New Project Inquiry: ${project}`);
  const body = encodeURIComponent(
    `Hello,\n\nMy name is ${name}.\n\nProject: ${project}\n\nMessage:\n${message}\n\nYou can reply to me at: ${email}`
  );

  // Buat link mailto
  const mailtoLink = `mailto:m.ferdyfauzan@gmail.com?subject=${subject}&body=${body}`;

  // Redirect ke mailto
  window.location.href = mailtoLink;
}

// AOS
AOS.init({ duration: 800, once: true, offset: 60 });

// Theme
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  icon.classList.replace("fa-moon", "fa-sun");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  icon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Navbar scroll
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// Close mobile nav on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = document.getElementById("nav");
    if (collapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

// Typing effect
const words = ["Project Engineer", "PLC Programmer", "Problem Solver","Automation Engineer","Database Engineer","SCADA Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
  const current = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// Counter animation on scroll
const counters = document.querySelectorAll(".counter");
let counted = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach((counter) => {
        const target = +counter.dataset.target;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };

        update();
      });
    }
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) counterObserver.observe(statsSection);

// Projects
const projects = [
  {
    title: "Current testing and Screwing setup",
    type: "PLC",
    desc: "It's a special purpose machine with primary purpose to test the current rating of Bajaj RE Max tail lamps with current test by testing the current between two acceptable ranges and screwing of the tail lamp by using a screwing gun.",
    link: "https://github.com/yashsbhakre/plc_image/blob/3e2d593000b17897fec2276ffe820c48532da4ff/Screenshot%202026-05-28%20080051.png",
    icon: "fa-laptop-code",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    tags: ["PLC", "HMI"]
  },
  {
    title: "EV Rickshaw Junction Box Assembly Conveyor SCADA",
    type: "SCADA",
    desc: "SCADA built in GENESIS64 primarily to store torque values of screw gun at different stages at conveyor in database for different child parts screwing in an EV junction box",
    link: "https://github.com/yashsbhakre/plc_image/blob/3e2d593000b17897fec2276ffe820c48532da4ff/Screenshot%202026-05-28%20080051.png",
    icon: "fa-server",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    tags: ["GENESIS64", "WORKBENCH", "MCWORKSX"]
  },
  {
    title: "Sealent dispensing SPM for two wheeler indicators",
    type: "PLC",
    desc: "Pneumatic cylinder based sealent dispensing SPM for sealing wires of PCB's with the housing in two wheelers ",
    link: "https://github.com/",
    icon: "fa-list-check",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    tags: ["GXWorks3", "GTDesigner3", "PLC & HMI"]
  },
  {
    title: "SCADA for OD Variation checking SPM for ball bearing industry",
    type: "SCADA",
    desc: "SCADA built and designed in Genesis64 for an OD Variation SPM used for ball bearing in automotive industry primarily storing the OD variation values, Total job production, OK and NG Jobs",
    link: "https://github.com/",
    icon: "fa-cloud-sun",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
    tags: ["Genesis64", "Workbench", "SQL"]
  },
  {
    title: "Screwjack Assembly",
    type: "CAD",
    desc: "Screwjack assembly designed in CREO parametric software for final year design project",
    link: "https://github.com/",
    icon: "fa-newspaper",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    tags: ["CREO Parametric", "3D Cad", "3D Modelling"]
  },
  {
    title: "Laser Marking machine SPM for engine casting",
    type: "PLC",
    desc: "Lase Marking machine SPM of engine casting primarily for marking QR and barcode over it and model selection via HMI with different marking data and marking parameters like laser speed, laser frequency and depth.",
    link: "https://github.com/",
    icon: "fa-newspaper",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    tags: ["GXWorks3", "GTDesigner3", "Laser Marking"]
  },
  {
    title: "Rack & Pinion assembly for ATV ",
    type: "CAD",
    desc: "Rack & Pinion assembly designed primarily for ATV in BAJA. Designed ergonomically for steering system with FOS, Steering parameters into consideration with reference of research papers",
    link: "https://github.com/",
    icon: "fa-newspaper",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    tags: ["CREO Parametric", "3D Cad", "3D Modelling"]
  }

 
];

const container = document.getElementById("projectContainer");
let activeFilter = "all";

function renderProjects(filter) {
  activeFilter = filter;
  const filtered = projects.filter((p) => filter === "all" || p.type === filter);

  container.innerHTML = filtered
    .map(
      (p, index) => `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
      <div class="project-card">
        <div class="project-img" style="background:${p.gradient}">
         
          <img src=${p.link} alt="project photo"> </img>
        </div>
        <div class="project-body">
          <h5>${p.title}</h5>
          <p>${p.desc.substring(0, 90)}...</p>
          <div class="project-footer">
            <span class="project-type">${p.type}</span>
            <button class="btn-view" onclick="openModal('${p.title}')">View Details</button>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");

  AOS.refresh();
}

renderProjects("all");

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

function openModal(title) {
  const project = projects.find((p) => p.title === title);
  if (!project) return;

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDesc").textContent = project.desc;
  document.getElementById("modalLink").href = project.link;

  document.getElementById("modalImage").style.background = project.gradient;
  document.getElementById("modalImage").innerHTML = `<i class="fa-solid ${project.icon}"></i>`;

  document.getElementById("modalTags").innerHTML = project.tags
    .map((t) => `<span>${t}</span>`)
    .join("");

  new bootstrap.Modal(document.getElementById("projectModal")).show();
}

// Contact form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    e.target.reset();
  }, 2500);
});

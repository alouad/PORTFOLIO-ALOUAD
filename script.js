// Loading animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".loading")
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden")
      setTimeout(() => {
        loader.remove()
      }, 500)
    }, 1000)
  }
})

// Create floating particles
function createParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles"
  document.body.appendChild(particlesContainer)

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Initialize particles
createParticles()

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navigation scroll effect
const nav = document.querySelector(".nav")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Advanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Add stagger effect for multiple elements
      if (entry.target.classList.contains("skill-item")) {
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100
        entry.target.style.transitionDelay = delay + "ms"
      }

      if (entry.target.classList.contains("project-card")) {
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200
        entry.target.style.transitionDelay = delay + "ms"
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-item, .project-card, .education-item, .contact-item").forEach((el) => {
  el.classList.add("fade-in-up")
  observer.observe(el)
})

// Typing effect for hero title with more sophistication
function typeWriter(element, text, speed = 100) {
  let i = 0
  // Ne pas effacer le texte s'il est déjà présent
  if (element.textContent.trim() === text.trim()) {
    return
  }

  element.textContent = ""
  element.style.borderRight = "3px solid var(--pastel-purple)"

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed + Math.random() * 50)
    } else {
      // Remove cursor after typing
      setTimeout(() => {
        element.style.borderRight = "none"
      }, 1000)
    }
  }

  type()
}

// Initialize typing effect
window.addEventListener("load", () => {
  const nameElement = document.querySelector(".name")
  if (nameElement) {
    const originalText = nameElement.textContent
    // Vérifier que le texte n'est pas vide avant d'appliquer l'effet
    if (originalText && originalText.trim()) {
      setTimeout(() => {
        typeWriter(nameElement, originalText, 60)
      }, 1500)
    }
  }
})

// Enhanced parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero::before, .profile-circle")

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.3
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Mouse movement parallax for hero section
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero")
  if (!hero) return

  const rect = hero.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const moveX = (x - centerX) / centerX
  const moveY = (y - centerY) / centerY

  const profileCircle = document.querySelector(".profile-circle")
  if (profileCircle) {
    profileCircle.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`
  }
})

// Enhanced form submission with better UX
const contactForm = document.querySelector(".form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const inputs = this.querySelectorAll("input, textarea")
    let isValid = true

    // Validate inputs
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false
        input.style.borderColor = "#ff6b6b"
        input.style.animation = "shake 0.5s ease-in-out"
      } else {
        input.style.borderColor = "var(--pastel-purple)"
        input.style.animation = ""
      }
    })

    if (isValid) {
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Create loading animation
      submitBtn.innerHTML = '<div class="loader" style="width: 20px; height: 20px; margin: 0 auto;"></div>'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.textContent = "Message envoyé ! ✨"
        submitBtn.style.background = "linear-gradient(135deg, #4CAF50, #45a049)"

        // Add success animation
        submitBtn.style.animation = "pulse 0.5s ease-in-out"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
          submitBtn.style.animation = ""
          this.reset()
        }, 3000)
      }, 2000)
    }
  })
}

// Add shake animation for form validation
const style = document.createElement("style")
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`
document.head.appendChild(style)

// Enhanced copy contact info functionality
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("click", function () {
    const text = this.querySelector("p").textContent

    if (text.includes("@") || text.includes("+")) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Create floating notification
          const notification = document.createElement("div")
          notification.textContent = "Copié ! ✨"
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 10px 30px var(--shadow-medium);
          `

          document.body.appendChild(notification)

          setTimeout(() => {
            notification.style.animation = "slideOutRight 0.3s ease-in"
            setTimeout(() => notification.remove(), 300)
          }, 2000)
        })
        .catch(() => {
          console.log("Impossible de copier le texte")
        })
    }
  })
})

// Add slide animations for notifications
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`
document.head.appendChild(notificationStyles)

// Enhanced skill items interaction
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.08) rotate(2deg)"

    // Add ripple effect
    const ripple = document.createElement("div")
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `

    this.style.position = "relative"
    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })

  skill.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotate(0deg)"
  })
})

// Add ripple animation
const rippleStyles = document.createElement("style")
rippleStyles.textContent = `
  @keyframes ripple {
    0% { width: 0; height: 0; opacity: 1; }
    100% { width: 100px; height: 100px; opacity: 0; }
  }
`
document.head.appendChild(rippleStyles)

// Enhanced project cards with 3D tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8

    this.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateY(-15px) 
      scale(1.02)
    `
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)"
  })
})

// Add loading screen
const loadingHTML = `
  <div class="loading">
    <div class="loader"></div>
  </div>
`

document.body.insertAdjacentHTML("afterbegin", loadingHTML)

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(50px)"
  section.style.transition = "all 0.8s ease-out"
  revealObserver.observe(section)
})

// Console welcome message with style
console.log(
  `
%c✨ Portfolio Interactif de Alouad Nour Al Houda ✨
%c💜 Design moderne avec animations avancées 💜
%c🎨 Développé avec passion et créativité 🎨
`,
  "color: #c8a8e9; font-size: 16px; font-weight: bold;",
  "color: #a8d0f0; font-size: 14px;",
  "color: #7c5295; font-size: 12px;",
)

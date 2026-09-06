/**
 * [SANJAY ANAND] PORTFOLIO JAVASCRIPT
 * macOS / iOS Native UI Micro-interactions & Navigation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Dynamic Year ---
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --- Navigation Elements ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const btnBackToTop = document.getElementById('btnBackToTop');

  // --- Scroll Spy with IntersectionObserver ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === activeId) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // --- Smooth Scroll with Nav Height Offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (nav height + padding)
        const isMobile = window.innerWidth <= 768;
        const navOffset = isMobile ? 20 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Set keyboard focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // --- Back to Top ---
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Copy Email to Clipboard with Dynamic Island Toast ---
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const emailTextEl = document.getElementById('emailText');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const copyBtnLabel = document.getElementById('copyBtnLabel');

  let toastTimeout = null;

  function showToast(message) {
    if (!toastNotification) return;

    if (toastMessage) toastMessage.textContent = message;
    toastNotification.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  if (btnCopyEmail && emailTextEl) {
    btnCopyEmail.addEventListener('click', async () => {
      const rawText = emailTextEl.textContent.trim();
      // Clean bracket placeholders if present
      const emailToCopy = rawText.replace(/^\[|\]$/g, '');

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback method
          const textarea = document.createElement('textarea');
          textarea.value = emailToCopy;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Visual feedback on button
        if (copyBtnLabel) copyBtnLabel.textContent = 'Copied!';
        btnCopyEmail.classList.add('btn-primary');
        btnCopyEmail.classList.remove('btn-secondary');

        showToast(`Copied ${emailToCopy} to clipboard`);

        setTimeout(() => {
          if (copyBtnLabel) copyBtnLabel.textContent = 'Copy';
          btnCopyEmail.classList.remove('btn-primary');
          btnCopyEmail.classList.add('btn-secondary');
        }, 2000);

      } catch (err) {
        showToast('Unable to copy to clipboard');
        console.error('Copy failed', err);
      }
    });
  }

  // --- PROJECTS DATA & macOS WINDOW MODAL ---
  const projectsData = {
    'finx': {
      title: 'FinX',
      category: 'Fintech',
      subTag: 'Personal Project',
      video: 'assets/projects/finx-demo.mp4',
      image: 'assets/projects/finx-demo.png',
      fallbackImage: 'assets/projects/Expense tracker.png',
      oneLiner: 'An AI-powered personal finance tracker App that helps users understand and manage their spending.',
      description: 'An AI-powered personal finance tracker App that helps users understand and manage their spending.',
      builtWith: ['React', 'Firebase', 'Gemini API', 'Tailwind CSS', 'Recharts'],
      liveLink: '[https://finx.app.example.com]',
      sourceLink: '[https://github.com/sanjayanand/finx]'
    },
    'a2s-embroidery': {
      title: 'A2S Embroidery Studio',
      category: 'Client Site',
      subTag: 'Client Project',
      video: 'assets/projects/A2S.mp4',
      image: 'assets/projects/a2s-embroidery.png',
      oneLiner: 'A brand website for an embroidery studio, built to showcase their work and take custom orders.',
      description: 'A brand website for an embroidery studio, built to showcase their work and take custom orders.',
      builtWith: ['HTML5/CSS3', 'JavaScript', 'Figma', 'Custom Order UI'],
      liveLink: 'https://a2-s-swart.vercel.app/',
      sourceLink: null
    },
    'aurelia': {
      title: 'Aurelia',
      category: 'Client Site',
      subTag: 'Client Project',
      video: 'assets/projects/Aurelia.mp4',
      image: 'assets/projects/aurelia.png',
      oneLiner: 'A portfolio website for an interior designer, designed to feel as considered as her own work.',
      description: 'A portfolio website for an interior designer, designed to feel as considered as her own work.',
      builtWith: ['React', 'CSS Modules', 'Figma', 'Framer Motion'],
      liveLink: 'https://aurelia2-murex.vercel.app/',
      sourceLink: null
    },
    'design-debt-auditor': {
      title: 'Design Debt Auditor',
      category: 'AI Tool',
      subTag: 'Personal Project, In Progress',
      video: 'assets/projects/design-debt-auditor-demo.mp4',
      image: 'assets/projects/design-debt-auditor.png',
      fallbackImage: 'assets/projects/design-debt-auditor-demo.png',
      oneLiner: 'An AI agent that audits any live product like a senior design critic and hands back a prioritized fix roadmap.',
      description: 'An AI agent that audits any live product like a senior design critic and hands back a prioritized fix roadmap.',
      builtWith: ['Gemini API', 'Node.js', 'AST Parser', 'Design Tokens', 'Tailwind CSS'],
      liveLink: '#contact',
      sourceLink: '[https://github.com/sanjayanand/design-debt-auditor]'
    },
    'phc-federated-health': {
      title: 'PHC Federated Health Platform',
      category: 'Hackathon',
      subTag: 'Hack2Skill "Code for Communities 2"',
      video: 'assets/projects/phc-platform-demo.mp4',
      image: 'assets/projects/phc-platform-demo.png',
      fallbackImage: 'assets/projects/Healthcare.png',
      oneLiner: 'A federated AI platform prototype for coordinating public health resources during a crisis.',
      description: 'A federated AI platform prototype for coordinating public health resources during a crisis.',
      builtWith: ['React', 'Firebase', 'TensorFlow.js', 'Gemini API', 'Data Visualization'],
      liveLink: 'https://federated-healthcare-3fcd3.web.app',
      sourceLink: null
    },
    'legacy-rescue': {
      title: 'Legacy Rescue',
      category: 'Hackathon',
      subTag: 'BuildSprint (48-hour hackathon)',
      video: 'assets/projects/Legacycode.mp4',
      image: 'assets/projects/legacy-rescue.png',
      oneLiner: 'An autonomous agent that modernizes legacy jQuery front ends into React and opens the pull request itself.',
      description: 'An autonomous agent that modernizes legacy jQuery front ends into React and opens the pull request itself.',
      builtWith: ['LatentForce.ai', 'React', 'jQuery', 'AST Migration', 'Automated Testing'],
      liveLink: '#contact',
      sourceLink: '[https://github.com/sanjayanand/legacy-rescue]'
    },
    'graphic-design': {
      title: 'Graphic Design',
      category: 'Portfolio Collection',
      subTag: 'Personal Work',
      type: 'gallery',
      image: 'assets/projects/graphic-design/Midnight Grace.jpg',
      oneLiner: 'A curated collection of poster artwork, brand identity, and visual compositions.',
      description: 'A curated collection of poster artwork, brand identity, and visual compositions.',
      galleryItems: [
        'Midnight Grace.jpg',
        'The Queen RED.jpg',
        'The Queen 3.png',
        'Poster Design THE PARADISE.png',
        'EARBUDS-Recovered.png',
        'Headphones poster.png',
        'Choco Shake.png',
        'Cartoon poster.png',
        'burger poster.png',
        'ghost.jpg',
        'shoe.png'
      ].map(file => {
        const name = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        return {
          src: `assets/projects/graphic-design/${file}`,
          name: name,
          caption: name
        };
      }),
      liveLink: null,
      sourceLink: null
    },
    'motion-graphics': {
      title: 'Motion Graphics',
      category: 'Portfolio Collection',
      subTag: 'Personal Work',
      type: 'video-grid',
      image: 'assets/projects/motion-graphics.png',
      oneLiner: 'Short-form animated and edited pieces — reels, intros, and motion identity work.',
      description: 'Short-form animated and edited pieces — reels, intros, and motion identity work.',
      builtWithHeading: 'Tools Used',
      builtWith: ['DaVinci Resolve', 'CapCut', 'After Effects', 'Motion Design', 'Video Editing'],
      videoItems: [],
      liveLink: null,
      sourceLink: null
    }
  };

  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalWindow = document.getElementById('projectModalWindow');
  const modalWindowTitle = document.getElementById('modalWindowTitle');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalSubTag = document.getElementById('modalSubTag');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectOneLiner = document.getElementById('modalProjectOneLiner');
  const modalMediaContainer = document.getElementById('modalMediaContainer');
  const modalProjectVideo = document.getElementById('modalProjectVideo');
  const modalProjectImg = document.getElementById('modalProjectImg');
  const modalGalleryContainer = document.getElementById('modalGalleryContainer');
  const modalGalleryGrid = document.getElementById('modalGalleryGrid');
  const modalVideoContainer = document.getElementById('modalVideoContainer');
  const modalVideoGrid = document.getElementById('modalVideoGrid');
  const modalProjectDescription = document.getElementById('modalProjectDescription');
  const modalBuiltWithSection = document.getElementById('modalBuiltWithSection');
  const modalBuiltWithHeading = document.getElementById('modalBuiltWithHeading');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalSecondaryLink = document.getElementById('modalSecondaryLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseBtnSecondary = document.getElementById('modalCloseBtnSecondary');

  // --- Lightbox Elements ---
  let currentLightboxItems = [];
  let currentLightboxIndex = 0;

  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function showLightboxItem(index) {
    if (!currentLightboxItems || currentLightboxItems.length === 0) return;
    if (index < 0) index = currentLightboxItems.length - 1;
    if (index >= currentLightboxItems.length) index = 0;
    currentLightboxIndex = index;

    const item = currentLightboxItems[currentLightboxIndex];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.name || 'Poster Preview';
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length} — ${item.name}`;
    }
  }

  function openLightbox(items, index = 0) {
    currentLightboxItems = items;
    showLightboxItem(index);
    if (galleryLightbox) {
      galleryLightbox.classList.add('active');
      galleryLightbox.setAttribute('aria-hidden', 'false');
      if (lightboxCloseBtn) lightboxCloseBtn.focus();
    }
  }

  function closeLightbox() {
    if (galleryLightbox && galleryLightbox.classList.contains('active')) {
      galleryLightbox.classList.remove('active');
      galleryLightbox.setAttribute('aria-hidden', 'true');
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxItem(currentLightboxIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxItem(currentLightboxIndex + 1);
    });
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });
  }

  let lastFocusedElement = null;

  function loadFallbackImage(project) {
    if (!modalMediaContainer || !modalProjectImg) return;
    
    const candidateSrc = project.image || project.fallbackImage;
    if (candidateSrc) {
      if (modalProjectVideo) {
        modalProjectVideo.style.display = 'none';
        modalProjectVideo.pause();
      }
      modalProjectImg.style.display = 'block';
      modalProjectImg.src = candidateSrc;
      modalProjectImg.alt = `${project.title} Preview`;
      modalMediaContainer.style.display = 'block';

      modalProjectImg.onerror = () => {
        if (project.fallbackImage && candidateSrc !== project.fallbackImage) {
          modalProjectImg.src = project.fallbackImage;
        } else {
          modalMediaContainer.style.display = 'none';
        }
      };
      modalProjectImg.onload = () => {
        modalMediaContainer.style.display = 'block';
      };
    } else {
      modalMediaContainer.style.display = 'none';
    }
  }

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !projectModalBackdrop) return;

    lastFocusedElement = document.activeElement;

    // Populate modal text content
    if (modalWindowTitle) modalWindowTitle.textContent = `${project.title} — Project Details`;
    if (modalCategoryTag) modalCategoryTag.textContent = project.category;
    if (modalSubTag) modalSubTag.textContent = project.subTag;
    if (modalProjectTitle) modalProjectTitle.textContent = project.title;
    if (modalProjectOneLiner) modalProjectOneLiner.textContent = project.oneLiner;
    if (modalProjectDescription) modalProjectDescription.textContent = project.description;
    if (modalBuiltWithHeading) modalBuiltWithHeading.textContent = project.builtWithHeading || 'Built With';

    // Handle Layout & Media Display based on project type
    if (project.type === 'gallery') {
      // Instagram-Style Gallery Mode (Graphic Design Collection)
      if (modalMediaContainer) modalMediaContainer.style.display = 'none';
      if (modalVideoContainer) modalVideoContainer.style.display = 'none';
      if (modalBuiltWithSection) modalBuiltWithSection.style.display = 'none';
      if (modalLiveLink) modalLiveLink.style.display = 'none';
      if (modalSecondaryLink) modalSecondaryLink.style.display = 'none';

      if (modalGalleryContainer && modalGalleryGrid) {
        modalGalleryContainer.style.display = 'block';
        modalGalleryGrid.innerHTML = '';

        if (project.galleryItems && project.galleryItems.length > 0) {
          project.galleryItems.forEach((item, index) => {
            const tile = document.createElement('div');
            tile.className = 'modal-gallery-tile';
            tile.setAttribute('role', 'button');
            tile.setAttribute('tabindex', '0');
            tile.setAttribute('aria-label', `View ${item.name} full size`);
            tile.innerHTML = `
              <img src="${item.src}" alt="${item.name}" loading="lazy" onerror="this.parentElement.style.display='none';">
              <div class="tile-hover-overlay">
                <div class="tile-zoom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </div>
              </div>
            `;
            tile.addEventListener('click', () => openLightbox(project.galleryItems, index));
            tile.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(project.galleryItems, index);
              }
            });
            modalGalleryGrid.appendChild(tile);
          });
        } else {
          // Empty State fallback
          modalGalleryGrid.innerHTML = `
            <div class="modal-empty-state">
              <div class="empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <p class="empty-title">Add your work here</p>
              <p class="empty-sub">Place your graphic design images inside <code class="code-pill">assets/projects/graphic-design/</code> to showcase your portfolio pieces here.</p>
            </div>
          `;
        }
      }
    } else if (project.type === 'video-grid') {
      // Video Grid Mode (Motion Graphics Collection)
      if (modalMediaContainer) modalMediaContainer.style.display = 'none';
      if (modalGalleryContainer) modalGalleryContainer.style.display = 'none';
      if (modalBuiltWithSection) modalBuiltWithSection.style.display = 'flex';

      if (modalVideoContainer && modalVideoGrid) {
        modalVideoContainer.style.display = 'block';
        modalVideoGrid.innerHTML = '';

        if (project.videoItems && project.videoItems.length > 0) {
          project.videoItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'modal-video-item';
            if (item.videoSrc) {
              card.innerHTML = `
                <video src="${item.videoSrc}" controls muted loop playsinline poster="${item.poster || ''}" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';"></video>
                <img src="${item.poster || 'assets/projects/motion-graphics.png'}" alt="${item.caption || project.title}" style="display:none;" onerror="this.parentElement.style.display='none';">
                ${item.caption ? `<div class="modal-video-caption">${item.caption}</div>` : ''}
              `;
            } else if (item.link) {
              card.innerHTML = `
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
                  <img src="${item.poster || 'assets/projects/motion-graphics.png'}" alt="${item.caption || project.title}" loading="lazy" onerror="this.parentElement.style.display='none';">
                  <div class="modal-video-caption">${item.caption || 'Watch Reel &rarr;'}</div>
                </a>
              `;
            }
            modalVideoGrid.appendChild(card);
          });
        } else {
          // Empty State fallback
          modalVideoGrid.innerHTML = `
            <div class="modal-empty-state">
              <div class="empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </div>
              <p class="empty-title">Add your work here</p>
              <p class="empty-sub">Place video files or links inside <code class="code-pill">assets/projects/motion-graphics/</code> to showcase your reels and motion pieces here.</p>
            </div>
          `;
        }
      }

      // Populate Tech Tags for video-grid
      if (modalTechTags && project.builtWith) {
        modalTechTags.innerHTML = '';
        project.builtWith.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = tech;
          modalTechTags.appendChild(tag);
        });
      }
    } else {
      // Standard Single Media Mode (FinX, Aurelia, Legacy Rescue, etc.)
      if (modalGalleryContainer) modalGalleryContainer.style.display = 'none';
      if (modalVideoContainer) modalVideoContainer.style.display = 'none';
      if (modalBuiltWithSection) modalBuiltWithSection.style.display = 'flex';

      if (modalMediaContainer) {
        if (project.video && modalProjectVideo) {
          modalMediaContainer.style.display = 'block';
          modalProjectImg.style.display = 'none';
          modalProjectVideo.style.display = 'block';
          modalProjectVideo.muted = true;
          modalProjectVideo.loop = true;
          modalProjectVideo.currentTime = 0;
          modalProjectVideo.src = project.video;

          // Autoplay muted
          const playPromise = modalProjectVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }

          // Fallback to static screenshot if video fails
          modalProjectVideo.onerror = () => {
            loadFallbackImage(project);
          };
        } else {
          loadFallbackImage(project);
        }
      }

      // Populate Tech Tags for single project
      if (modalTechTags && project.builtWith) {
        modalTechTags.innerHTML = '';
        project.builtWith.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = tech;
          modalTechTags.appendChild(tag);
        });
      }

      // Configure Links for single project
      if (modalLiveLink) {
        if (project.liveLink) {
          modalLiveLink.style.display = 'inline-flex';
          modalLiveLink.setAttribute('href', project.liveLink);
          if (project.liveLink.startsWith('#')) {
            modalLiveLink.removeAttribute('target');
            modalLiveLink.onclick = () => closeProjectModal();
          } else {
            modalLiveLink.setAttribute('target', '_blank');
            modalLiveLink.onclick = null;
          }
        } else {
          modalLiveLink.style.display = 'none';
        }
      }

      if (modalSecondaryLink) {
        if (project.sourceLink) {
          modalSecondaryLink.style.display = 'inline-flex';
          modalSecondaryLink.setAttribute('href', project.sourceLink);
          if (project.sourceLink.startsWith('#')) {
            modalSecondaryLink.removeAttribute('target');
            modalSecondaryLink.onclick = () => closeProjectModal();
          } else {
            modalSecondaryLink.setAttribute('target', '_blank');
            modalSecondaryLink.onclick = null;
          }
        } else {
          modalSecondaryLink.style.display = 'none';
        }
      }
    }

    // Show modal with animation
    projectModalBackdrop.classList.add('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!projectModalBackdrop) return;

    // Also ensure lightbox is closed
    closeLightbox();

    // Pause and reset main modal video
    if (modalProjectVideo) {
      modalProjectVideo.pause();
      modalProjectVideo.currentTime = 0;
      modalProjectVideo.removeAttribute('src');
      modalProjectVideo.load();
    }

    // Pause any gallery/collection videos
    document.querySelectorAll('.macos-window video').forEach(v => {
      try {
        v.pause();
        v.currentTime = 0;
      } catch (e) {}
    });

    projectModalBackdrop.classList.remove('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Folder card click listeners
  const folderCards = document.querySelectorAll('.folder-card');
  folderCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      if (projectId) openProjectModal(projectId);
    });

    // Keyboard accessibility for folder cards (Enter or Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.getAttribute('data-project-id');
        if (projectId) openProjectModal(projectId);
      }
    });
  });

  // Modal close listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseBtnSecondary) modalCloseBtnSecondary.addEventListener('click', closeProjectModal);

  // Click outside modal to close
  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Keyboard navigation for Lightbox and Project Modal (Escape / Arrow keys)
  document.addEventListener('keydown', (e) => {
    // If Lightbox is open, handle its keys first and DO NOT close the project modal
    if (galleryLightbox && galleryLightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showLightboxItem(currentLightboxIndex - 1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showLightboxItem(currentLightboxIndex + 1);
        return;
      }
    } else if (e.key === 'Escape' && projectModalBackdrop && projectModalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --- Subtle Card Interactive Pointer Glow Effect ---
  const interactiveCards = document.querySelectorAll('.folder-card, .pillar-card, .skills-card, .timeline-card, .contact-card');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});


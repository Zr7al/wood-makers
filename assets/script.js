/* ============================================================
   WOOD MAKER EST. — Premium Website JS
   Custom cursor · Navigation · Scroll animations · Filter
   ============================================================ */

'use strict';

/* ── Custom Cursor ──────────────────────────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.innerWidth > 768) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(trackRing);
  })();

  const hoverEls = 'a,button,.filter-btn,.proj-item,.proj-preview-card,.service-card,.ps-step';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ── Navigation ─────────────────────────────────────────────── */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ── Intersection Observer — fade-in ────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

/* ── Counter animation ──────────────────────────────────────── */
function countUp(el, end, dur, suffix) {
  let t0 = null;
  const step = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    el.textContent = Math.floor(p * end) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    countUp(el, target, 2000, suffix);
    statObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stats-num[data-target]').forEach(el => statObserver.observe(el));

/* ── Hero parallax ───────────────────────────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
}

/* ── Project Filter ─────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projItems  = document.querySelectorAll('.proj-item');

if (filterBtns.length && projItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      projItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;

        if (match) {
          item.style.display = '';
          void item.offsetWidth;
          item.style.opacity   = '1';
          item.style.transform = 'scale(1)';
          item.classList.remove('is-hidden');
        } else {
          item.style.opacity   = '0';
          item.style.transform = 'scale(0.96)';
          item.classList.add('is-hidden');
          setTimeout(() => {
            if (item.classList.contains('is-hidden')) item.style.display = 'none';
          }, 420);
        }
      });
    });
  });
}

/* ── Project Modal ───────────────────────────────────────────── */
const projectData = [
  // Private (0-5)
  { title:'Al-Rasheed Villa', category:'Private Residence', categoryFilter:'private',
    desc:'A full interior joinery fit-out for a luxury villa in Abdoun. Scope covers custom entrance doors, panelled reception walls, bespoke bedroom wardrobes, and a fully fitted kitchen across four floors.',
    images:['img-001.jpg','img-002.jpg','img-003.jpg','img-004.jpg'] },
  { title:'Shoman Residence', category:'Private Residence', categoryFilter:'private',
    desc:'Complete woodwork package for a modern family home in the Shoman district — kitchen cabinetry, built-in wardrobes, and decorative wall cladding throughout.',
    images:['img-005.jpg','img-006.jpg','img-007.jpg','img-008.jpg'] },
  { title:'Khalda Private Home', category:'Private Residence', categoryFilter:'private',
    desc:'Custom joinery for a private home in Khalda including a statement entrance door, custom-built entertainment unit, and full bedroom fit-out with integrated lighting channels.',
    images:['img-009.jpg','img-010.jpg','img-011.jpg','img-012.jpg'] },
  { title:'Dabouq Villa', category:'Private Residence', categoryFilter:'private',
    desc:'Bespoke interior woodwork for a high-end villa in Dabouq. Features include veneered wall panels in the majlis, solid-wood library, and custom marble-topped kitchen.',
    images:['img-013.jpg','img-014.jpg','img-015.jpg','img-016.jpg'] },
  { title:'Abdoun Executive Residence', category:'Private Residence', categoryFilter:'private',
    desc:'Executive-level fit-out for a large private residence in Abdoun — reception cabinetry, a custom home office with integrated joinery, and full bedroom suite woodwork.',
    images:['img-017.jpg','img-018.jpg','img-019.jpg','img-020.jpg'] },
  { title:'Sweifieh Luxury Apartment', category:'Private Residence', categoryFilter:'private',
    desc:'Full woodwork scope for a premium apartment in Sweifieh. Bespoke kitchen, walk-in wardrobe system, and floor-to-ceiling decorative panels in the living area.',
    images:['img-021.jpg','img-022.jpg','img-023.jpg','img-024.jpg'] },
  // Tendering (6-11)
  { title:'Four Seasons Hotel — Amman', category:'Tendering / Hospitality', categoryFilter:'tendering',
    desc:'Interior fit-out of guest rooms and lobby areas for the Four Seasons Hotel in Amman. Full woodwork package including custom headboards, casegoods, and reception joinery.',
    images:['img-025.jpg','img-026.jpg','img-027.jpg','img-028.jpg'] },
  { title:'Jordan National Bank HQ', category:'Tendering / Commercial', categoryFilter:'tendering',
    desc:'Comprehensive interior woodwork for the Jordan National Bank headquarters — executive offices, boardrooms, banking hall cabinetry, and decorative panelling across multiple floors.',
    images:['img-029.jpg','img-030.jpg','img-031.jpg','img-032.jpg'] },
  { title:'Ministry of Health Building', category:'Tendering / Government', categoryFilter:'tendering',
    desc:'Full fit-out of the Ministry of Health administrative building. Custom office furniture, reception counters, conference room joinery, and corridor feature walls.',
    images:['img-033.jpg','img-034.jpg','img-035.jpg','img-036.jpg'] },
  { title:'InterContinental Hotel Fit-Out', category:'Tendering / Hospitality', categoryFilter:'tendering',
    desc:'Large-scale fit-out project for the InterContinental Hotel including lobby feature walls, restaurant joinery, and complete guest room woodwork across several floors.',
    images:['img-037.jpg','img-038.jpg','img-039.jpg','img-040.jpg'] },
  { title:'Royal Medical Services', category:'Tendering / Healthcare', categoryFilter:'tendering',
    desc:'Interior joinery for the Royal Medical Services complex — clinical reception counters, administrative office fit-out, and custom cabinetry for medical staff areas.',
    images:['img-041.jpg','img-042.jpg','img-043.jpg','img-044.jpg'] },
  { title:'Commercial Plaza — Downtown', category:'Tendering / Commercial', categoryFilter:'tendering',
    desc:'Full interior woodwork and fit-out for a downtown commercial complex. Retail unit fit-outs, shared lobby joinery, and reception desk installations across multiple levels.',
    images:['img-045.jpg','img-046.jpg','img-047.jpg','img-048.jpg'] },
  // In-Home (12-17)
  { title:'Modern Kitchen · Khalda', category:'In-Home', categoryFilter:'inhome',
    desc:'Contemporary handleless kitchen design with integrated appliances, quartz countertops, and custom overhead storage — built and installed by our in-home specialist team.',
    images:['img-049.jpg','img-050.jpg','img-051.jpg','img-052.jpg'] },
  { title:'Master Bedroom Suite', category:'In-Home', categoryFilter:'inhome',
    desc:'Bespoke master bedroom fit-out including floor-to-ceiling wardrobe system, upholstered headboard frame with side joinery, and a custom vanity unit.',
    images:['img-053.jpg','img-054.jpg','img-055.jpg','img-056.jpg'] },
  { title:'Open-Plan Living Room', category:'In-Home', categoryFilter:'inhome',
    desc:'Custom entertainment and display unit for an open-plan living space — combining veneer panelling, integrated LED lighting, and concealed cable management.',
    images:['img-057.jpg','img-058.jpg','img-059.jpg','img-060.jpg'] },
  { title:'Home Office · Abdali', category:'In-Home', categoryFilter:'inhome',
    desc:'Bespoke home office conversion with custom built-in desk, floor-to-ceiling bookcase, and acoustic panelling — designed for both focus and executive presence.',
    images:['img-061.jpg','img-062.jpg','img-063.jpg','img-064.jpg'] },
  { title:"Children's Bedroom · Mecca St.", category:'In-Home', categoryFilter:'inhome',
    desc:'Fun and functional custom bedroom for a family home on Mecca Street — built-in bunk bed frame, pull-out study desk, and storage wall with mix of open and closed units.',
    images:['img-065.jpg','img-066.jpg','img-067.jpg','img-068.jpg'] },
  { title:'Dining & Kitchen Combo', category:'In-Home', categoryFilter:'inhome',
    desc:'Seamless open-plan kitchen and dining area transformation. Full kitchen refit with island unit, integrated dining storage, and matching overhead cabinetry throughout.',
    images:['img-069.jpg','img-070.jpg','img-071.jpg','img-072.jpg'] },
];

const modal      = document.getElementById('projModal');
const modalMain  = document.getElementById('modalMainImg');
const modalCat   = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalThmbs = document.getElementById('modalThumbs');
const modalCount = document.getElementById('modalCounter');
const modalClose = document.getElementById('modalClose');
const modalBack  = document.getElementById('modalBackdrop');
const modalPrev  = document.getElementById('modalPrev');
const modalNext  = document.getElementById('modalNext');

let activeProject = null;
let activeImg     = 0;

function openModal(projectIdx) {
  const p = projectData[projectIdx];
  activeProject = projectIdx;
  activeImg = 0;

  modalCat.textContent   = p.category;
  modalTitle.textContent = p.title;
  modalDesc.textContent  = p.desc;

  // Build thumbnails
  modalThmbs.innerHTML = '';
  p.images.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'modal-thumb' + (i === 0 ? ' active' : '');
    div.dataset.idx = i;
    const imgEl = document.createElement('img');
    imgEl.src = 'assets/images/projects/' + img;
    imgEl.alt = p.title + ' — photo ' + (i + 1);
    imgEl.loading = 'lazy';
    div.appendChild(imgEl);
    div.addEventListener('click', () => setModalImg(i));
    modalThmbs.appendChild(div);
  });

  setModalImg(0);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function setModalImg(idx) {
  const p = projectData[activeProject];
  activeImg = idx;
  modalMain.src = 'assets/images/projects/' + p.images[idx];
  modalMain.alt = p.title + ' — photo ' + (idx + 1);
  modalCount.textContent = (idx + 1) + ' / ' + p.images.length;
  modalThmbs.querySelectorAll('.modal-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

if (modal) {
  // Open on project card click
  document.querySelectorAll('.proj-item[data-project]').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.project));
  });

  modalClose.addEventListener('click', closeModal);
  modalBack.addEventListener('click', closeModal);

  modalPrev.addEventListener('click', e => {
    e.stopPropagation();
    const len = projectData[activeProject].images.length;
    setModalImg((activeImg - 1 + len) % len);
  });
  modalNext.addEventListener('click', e => {
    e.stopPropagation();
    const len = projectData[activeProject].images.length;
    setModalImg((activeImg + 1) % len);
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
  });
}

/* ── Contact Form ───────────────────────────────────────────── */
const form       = document.querySelector('.contact-form-el');
const successMsg = document.querySelector('.form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.transition = 'opacity .4s, transform .4s';
      form.style.opacity    = '0';
      form.style.transform  = 'translateY(12px)';
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('show');
      }, 420);
    }, 900);
  });
}

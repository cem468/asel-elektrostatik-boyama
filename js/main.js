(function(){
  const WA_NUMBER = '905323431207';

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.innerHTML = open ? '&times;' : '&#9776;';
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.innerHTML = '&#9776;';
      })
    );
  }

  // Lightbox
  const items = document.querySelectorAll('.gallery .item');
  if(items.length){
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="close" aria-label="Kapat">&times;</button><img alt="">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const closeLB = () => lb.classList.remove('open');
    items.forEach(it => it.addEventListener('click', () => {
      const img = it.querySelector('img');
      if(!img) return;
      lbImg.src = img.src; lbImg.alt = img.alt || '';
      lb.classList.add('open');
    }));
    lb.addEventListener('click', closeLB);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLB(); });
  }

  // Contact form -> WhatsApp redirect
  const form = document.querySelector('#contactForm');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const text =
        `Merhaba ASEL Elektrostatik Boyama,\n\n` +
        `Ad Soyad: ${name}\n` +
        `Telefon: ${phone}\n` +
        (subject ? `Konu: ${subject}\n` : '') +
        `\nMesaj:\n${message}`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // Active nav link by current page
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === file || (file === '' && href === 'index.html')) a.classList.add('active');
  });
})();

(function () {
  var body = document.body;
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-menu');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = body.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (body.classList.contains('menu-open')) {
          body.classList.remove('menu-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var quoteForm = document.getElementById('quote-form');
  var serviceSelect = document.getElementById('service-select');
  var successMessage = document.getElementById('quote-success');

  function normalizeService(raw) {
    if (!raw) return '';
    var value = String(raw).trim().toLowerCase();
    var map = {
      houses: 'houses',
      house: 'houses',
      home: 'houses',
      homes: 'houses',
      construction: 'houses',
      'scandinavian-house-construction': 'houses',
      interiors: 'interiors',
      interior: 'interiors',
      kitchens: 'interiors',
      kitchen: 'interiors',
      bathrooms: 'interiors',
      bathroom: 'interiors',
      saunas: 'interiors',
      sauna: 'interiors',
      pergolux: 'pergolux',
      pergola: 'pergolux',
      pergolas: 'pergolux'
    };
    return map[value] || '';
  }

  if (serviceSelect) {
    var params = new URLSearchParams(window.location.search);
    var requestedService = normalizeService(params.get('service'));
    if (requestedService) {
      serviceSelect.value = requestedService;
    }
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (successMessage) {
        successMessage.hidden = false;
      }

      var params = new URLSearchParams(window.location.search);
      var requestedService = normalizeService(params.get('service'));

      quoteForm.reset();
      if (serviceSelect && requestedService) {
        serviceSelect.value = requestedService;
      }

      if (successMessage) {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
})();

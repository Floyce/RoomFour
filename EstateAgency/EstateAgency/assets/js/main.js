/**
* Template Name: Meriadian Estates
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Updated: Aug 09 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Filter the homepage listings and keep the available count in sync
   */
  const propertyFilter = document.querySelector('#property-filter');
  const propertyCards = Array.from(document.querySelectorAll('[data-property-card]'));
  if (propertyFilter && propertyCards.length) {
    const searchInput = propertyFilter.querySelector('#property-search-input');
    const typeFilter = propertyFilter.querySelector('#property-type-filter');
    const areaFilter = propertyFilter.querySelector('#property-area-filter');
    const clearFilters = propertyFilter.querySelector('.btn-filter-reset');
    const resultsCount = document.querySelector('#property-results-count');
    const totalCount = document.querySelector('#property-total-count');
    const noResults = document.querySelector('#property-no-results');

    if (totalCount) {
      totalCount.textContent = `${propertyCards.length} available now`;
    }

    const updatePropertyResults = () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const selectedType = typeFilter.value;
      const selectedArea = areaFilter.value.toLowerCase();
      let visibleCount = 0;

      propertyCards.forEach((card) => {
        const matchesSearch = !searchTerm || card.textContent.toLowerCase().includes(searchTerm) ||
          card.dataset.search.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || card.dataset.type === selectedType;
        const matchesArea = !selectedArea || card.dataset.area.toLowerCase() === selectedArea;
        const isVisible = matchesSearch && matchesType && matchesArea;

        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (resultsCount) {
        resultsCount.textContent = visibleCount;
      }
      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    };

    propertyFilter.addEventListener('input', updatePropertyResults);
    propertyFilter.addEventListener('change', updatePropertyResults);
    propertyFilter.addEventListener('submit', (event) => {
      event.preventDefault();
      updatePropertyResults();
    });
    clearFilters.addEventListener('click', () => {
      searchInput.value = '';
      typeFilter.value = '';
      areaFilter.value = '';
      updatePropertyResults();
    });
  }

  /**
   * Populate property details from the selected listing
   */
  const propertyUnits = {
    'kilimani-apartment': {
      title: 'Modern 3-Bedroom Apartment',
      location: 'Kilimani, Nairobi',
      type: 'Apartment',
      status: 'For sale',
      price: 'Ksh 32,000,000',
      area: '185 m2',
      beds: '3',
      baths: '2',
      image: 'assets/img/properties/property-1.jpg',
      description: 'A modern three-bedroom apartment in Kilimani, conveniently placed for Nairobi shopping, schools and business districts. Contact us to confirm availability and arrange a private viewing.'
    },
    'syokimau-maisonette': {
      title: '4-Bedroom Maisonette',
      location: 'Syokimau, Nairobi',
      type: 'Maisonette',
      status: 'For sale',
      price: 'Ksh 25,000,000',
      area: '220 m2',
      beds: '4',
      baths: '3',
      image: 'assets/img/properties/property-2.jpg',
      description: 'Explore this four-bedroom maisonette in Syokimau. Contact our Nairobi team for current availability, viewing times and more information about the home.'
    },
    'kileleshwa-apartment': {
      title: '3-Bedroom Apartment',
      location: 'Kileleshwa, Nairobi',
      type: 'Apartment',
      status: 'For sale',
      price: 'Ksh 38,500,000',
      area: '185 m2',
      beds: '3',
      baths: '3',
      image: 'assets/img/properties/property-3.jpg',
      description: 'Discover a three-bedroom apartment in Kileleshwa. Get in touch with our team to confirm the listing details and schedule a tour.'
    },
    'karen-villa': {
      title: 'Luxury 5-Bedroom Villa',
      location: 'Karen, Nairobi',
      type: 'Villa',
      status: 'For sale',
      price: 'Ksh 85,000,000',
      area: '420 m2',
      beds: '5',
      baths: '5',
      image: 'assets/img/properties/property-4.jpg',
      description: 'A spacious five-bedroom villa in Karen, ideal for buyers looking for room to settle and grow. Ask our team about availability and private viewings.'
    },
    'westlands-apartment': {
      title: 'Executive Apartment',
      location: 'Westlands, Nairobi',
      type: 'Apartment',
      status: 'For rent',
      price: 'Ksh 180,000 / month',
      area: '145 m2',
      beds: '2',
      baths: '2',
      image: 'assets/img/properties/property-5.jpg',
      description: 'An executive apartment in Westlands, close to the neighbourhood’s offices, dining and shopping. Contact us to confirm current availability and arrange a viewing.'
    },
    'runda-villa': {
      title: '5-Bedroom Villa',
      location: 'Runda, Nairobi',
      type: 'Villa',
      status: 'For sale',
      price: 'Ksh 68,000,000',
      area: '420 m2',
      beds: '5',
      baths: '5',
      image: 'assets/img/properties/property-6.jpg',
      description: 'View this five-bedroom villa in Runda. Our team can provide current listing information and help arrange a private tour.'
    },
    'lavington-apartment': {
      title: '2-Bedroom Apartment',
      location: 'Lavington, Nairobi',
      type: 'Apartment',
      status: 'For rent',
      price: 'Ksh 145,000 / month',
      area: '130 m2',
      beds: '2',
      baths: '2',
      image: 'assets/img/properties/property-1.jpg',
      description: 'A comfortable two-bedroom apartment in Lavington, with easy access to everyday shopping and key Nairobi routes. Contact us to confirm availability and arrange a viewing.'
    },
    'ruiru-townhouse': {
      title: '3-Bedroom Townhouse',
      location: 'Ruiru, Kiambu',
      type: 'Townhouse',
      status: 'For sale',
      price: 'Ksh 18,500,000',
      area: '190 m2',
      beds: '3',
      baths: '3',
      image: 'assets/img/properties/property-2.jpg',
      description: 'A three-bedroom townhouse in Ruiru with generous living space and a practical layout for family life. Contact us for more information and viewing arrangements.'
    },
    'westlands-studio': {
      title: 'Furnished Studio',
      location: 'Westlands, Nairobi',
      type: 'Studio',
      status: 'For rent',
      price: 'Ksh 75,000 / month',
      area: '48 m2',
      beds: '1',
      baths: '1',
      image: 'assets/img/properties/property-3.jpg',
      description: 'A furnished studio in Westlands, suited to convenient city living close to offices, dining and shopping. Ask our team about current availability.'
    },
    'langata-maisonette': {
      title: '4-Bedroom Maisonette',
      location: 'Langata, Nairobi',
      type: 'Maisonette',
      status: 'For sale',
      price: 'Ksh 29,000,000',
      area: '240 m2',
      beds: '4',
      baths: '3',
      image: 'assets/img/properties/property-4.jpg',
      description: 'A spacious four-bedroom maisonette in Langata, with room for family living and entertaining. Contact us to learn more and arrange a private tour.'
    },
    'parklands-apartment': {
      title: '2-Bedroom Apartment',
      location: 'Parklands, Nairobi',
      type: 'Apartment',
      status: 'For rent',
      price: 'Ksh 110,000 / month',
      area: '105 m2',
      beds: '2',
      baths: '2',
      image: 'assets/img/properties/property-5.jpg',
      description: 'A well-laid-out two-bedroom apartment in Parklands, close to amenities and convenient transport links. Contact us to confirm availability.'
    },
    'ridgeways-home': {
      title: '5-Bedroom Family Home',
      location: 'Ridgeways, Nairobi',
      type: 'Family home',
      status: 'For sale',
      price: 'Ksh 72,000,000',
      area: '390 m2',
      beds: '5',
      baths: '4',
      image: 'assets/img/properties/property-6.jpg',
      description: 'A generous five-bedroom family home in Ridgeways, offering space to settle in a leafy Nairobi neighbourhood. Get in touch to arrange a viewing.'
    },
    'riverside-duplex': {
      title: '3-Bedroom Duplex',
      location: 'Riverside, Nairobi',
      type: 'Duplex',
      status: 'For sale',
      price: 'Ksh 45,500,000',
      area: '210 m2',
      beds: '3',
      baths: '3',
      image: 'assets/img/properties/property-1.jpg',
      description: 'A three-bedroom duplex in Riverside with comfortable living spaces and convenient access to Nairobi’s business and lifestyle hubs.'
    },
    'kilimani-one-bedroom': {
      title: '1-Bedroom Apartment',
      location: 'Kilimani, Nairobi',
      type: 'Apartment',
      status: 'For rent',
      price: 'Ksh 68,000 / month',
      area: '65 m2',
      beds: '1',
      baths: '1',
      image: 'assets/img/properties/property-2.jpg',
      description: 'A one-bedroom Kilimani apartment offering a convenient base near shopping, dining and transport. Contact us to check availability.'
    },
    'athi-river-townhouse': {
      title: '4-Bedroom Townhouse',
      location: 'Athi River, Machakos',
      type: 'Townhouse',
      status: 'For sale',
      price: 'Ksh 24,500,000',
      area: '230 m2',
      beds: '4',
      baths: '3',
      image: 'assets/img/properties/property-3.jpg',
      description: 'A four-bedroom townhouse in Athi River with room for the whole family and convenient access to the Nairobi-Mombasa highway.'
    },
    'ngong-road-apartment': {
      title: '3-Bedroom Apartment',
      location: 'Ngong Road, Nairobi',
      type: 'Apartment',
      status: 'For rent',
      price: 'Ksh 125,000 / month',
      area: '145 m2',
      beds: '3',
      baths: '2',
      image: 'assets/img/properties/property-4.jpg',
      description: 'A three-bedroom apartment along Ngong Road, with convenient access to local services and key Nairobi neighbourhoods.'
    },
    'loresho-home': {
      title: '6-Bedroom Family Home',
      location: 'Loresho, Nairobi',
      type: 'Family home',
      status: 'For sale',
      price: 'Ksh 95,000,000',
      area: '460 m2',
      beds: '6',
      baths: '5',
      image: 'assets/img/properties/property-5.jpg',
      description: 'A spacious six-bedroom family home in Loresho, offering generous interiors in a peaceful residential setting. Contact us for a private viewing.'
    },
    'embakasi-apartment': {
      title: '2-Bedroom Apartment',
      location: 'Embakasi, Nairobi',
      type: 'Apartment',
      status: 'For sale',
      price: 'Ksh 9,800,000',
      area: '92 m2',
      beds: '2',
      baths: '2',
      image: 'assets/img/properties/property-6.jpg',
      description: 'A practical two-bedroom apartment in Embakasi, with convenient access to local amenities and transport. Contact our team to arrange a visit.'
    }
  };

  const propertyPage = document.querySelector('.property-single-page');
  if (propertyPage) {
    const unitId = new URLSearchParams(window.location.search).get('unit') || 'syokimau-maisonette';
    const unit = propertyUnits[unitId] || propertyUnits['syokimau-maisonette'];
    document.title = `${unit.title} | Meriadian Estates`;

    document.querySelectorAll('[data-property-title]').forEach((element) => {
      element.textContent = unit.title;
    });
    document.querySelector('[data-property-location]').textContent = unit.location;
    document.querySelector('[data-property-breadcrumb]').textContent = unit.title;
    document.querySelector('[data-property-description]').textContent = unit.description;
    document.querySelector('[data-property-price]').textContent = unit.price;
    document.querySelector('[data-property-summary-location]').textContent = unit.location;
    document.querySelector('[data-property-type]').textContent = unit.type;
    document.querySelector('[data-property-status]').textContent = unit.status;
    document.querySelector('[data-property-area]').textContent = unit.area;
    document.querySelector('[data-property-beds]').textContent = unit.beds;
    document.querySelector('[data-property-baths]').textContent = unit.baths;

    const propertyMap = document.querySelector('[data-property-map]');
    propertyMap.src = `https://www.google.com/maps?q=${encodeURIComponent(unit.location)}&output=embed`;

    const galleryImages = document.querySelectorAll('[data-gallery-image]');
    const gallerySources = [
      unit.image,
      'assets/img/property-slide/property-slide-1.jpg',
      'assets/img/property-slide/property-slide-3.jpg'
    ];
    galleryImages.forEach((image, index) => {
      image.src = gallerySources[index];
      image.alt = `${unit.title} gallery image ${index + 1}`;
    });

    const tourLink = document.querySelector('[data-property-tour]');
    const tourUrl = new URL('contact.html', window.location.href);
    tourUrl.searchParams.set('intent', 'tour');
    tourUrl.searchParams.set('property', `${unit.title} in ${unit.location}`);
    tourUrl.hash = 'contact';
    tourLink.href = tourUrl.href;
  }

  /**
   * Show an agent profile and link its booking request to the contact form
   */
  const agentProfileModal = document.querySelector('#agent-profile-modal');
  if (agentProfileModal) {
    agentProfileModal.addEventListener('show.bs.modal', (event) => {
      const trigger = event.relatedTarget;
      const member = trigger.closest('.member');
      const name = member.dataset.agentName;
      const role = member.dataset.agentRole;
      const image = member.querySelector('.pic img');

      agentProfileModal.querySelector('#agent-profile-name').textContent = name;
      agentProfileModal.querySelector('#agent-profile-role').textContent = role;
      agentProfileModal.querySelector('#agent-profile-bio').textContent = member.dataset.agentBio;

      const profileImage = agentProfileModal.querySelector('#agent-profile-image');
      profileImage.src = image.src;
      profileImage.alt = `Portrait of ${name}`;

      const bookingUrl = new URL('contact.html', window.location.href);
      bookingUrl.searchParams.set('intent', 'booking');
      bookingUrl.searchParams.set('agent', name);
      bookingUrl.hash = 'contact';
      agentProfileModal.querySelector('#agent-book-link').href = bookingUrl.href;
    });
  }

  /**
   * Prefill contact enquiries from tour and agent booking links
   */
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    const requestParams = new URLSearchParams(window.location.search);
    const requestIntent = requestParams.get('intent');
    const requestedProperty = requestParams.get('property');
    const requestedAgent = requestParams.get('agent');
    const subjectInput = contactForm.querySelector('[name="subject"]');
    const messageInput = contactForm.querySelector('[name="message"]');

    if (requestIntent === 'tour' && requestedProperty) {
      subjectInput.value = `Property tour request: ${requestedProperty}`;
      messageInput.value = `Hello, I would like to schedule a tour for ${requestedProperty}. Please let me know the available viewing times.`;
    } else if (requestIntent === 'booking' && requestedAgent) {
      subjectInput.value = `Appointment request for ${requestedAgent}`;
      messageInput.value = `Hello, I would like to book an appointment with ${requestedAgent}. Please let me know their availability.`;
    }
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})();
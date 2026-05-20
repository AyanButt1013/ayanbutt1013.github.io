(function () {
    'use strict';

    // ─── DOM References ───
    var header     = document.getElementById('header');
    var navToggle  = document.getElementById('navToggle');
    var navLinks   = document.getElementById('navLinks');
    var navOverlay = document.getElementById('navOverlay');
    var allNavLinks = document.querySelectorAll('.nav-link');
    var sections   = document.querySelectorAll('.section, .hero');
    var fadeEls    = document.querySelectorAll('.fade-in');

    // ─── Header scroll state ───
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── Mobile menu ───
    function openMenu() {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
            navOverlay.classList.add('visible');
        });
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('visible');
        document.body.style.overflow = '';
        setTimeout(function () {
            navOverlay.style.display = 'none';
        }, 350);
    }

    navToggle.addEventListener('click', function () {
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    allNavLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // ─── Active nav highlighting ───
    var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;

    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                allNavLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        rootMargin: '-' + (headerH + 20) + 'px 0px -45% 0px',
        threshold: 0
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // ─── Fade-in on scroll ───
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
    });

    fadeEls.forEach(function (el) {
        fadeObserver.observe(el);
    });

})();
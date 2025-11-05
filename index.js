// 1) ScrollSpy + navbar click handler
(function () {
    window.addEventListener('DOMContentLoaded', function () {
        if (window.bootstrap && document.body) {
            try { document.body._scrollspy && document.body._scrollspy.dispose(); } catch (e) { }
            var spy = new bootstrap.ScrollSpy(document.body, { target: '#navbar', offset: 90 });
            document.body._scrollspy = spy;

            document.querySelectorAll('#navbar .nav-link').forEach(function (el) {
                el.addEventListener('click', function () {
                    setTimeout(function () { spy.refresh(); }, 120);
                });
            });
        }
    });
})();

// 2) Stacked slider 
(function () {
    const slides = [
        { image: 'assets/alongTheCanal.jpg', title: 'Take a Walk Along the Canals in the Early Morning' },
        { image: 'assets/canalCruise.jpg', title: 'Take a Canal Cruise to See the City from a Different Perspective' },
        { image: 'assets/rijksMuseum.jpg', title: 'Learn About Dutch History at the Rijksmuseum' },
        { image: 'assets/vanGoghMuseum.jpg', title: 'Get Inside an Artist’s Mind at the Van Gogh Museum' },
        { image: 'assets/anneFrankHouse.jpg', title: 'Visit The Anne Frank House' },
        { image: 'assets/amsterdamCozyCafe.jpg', title: 'Explore Amsterdam’s Cozy Cafes' },
        { image: 'assets/albertCuypMarket.jpg', title: 'Hit the Albert Cuyp Market in De Pijp' },
        { image: 'assets/jordaanDistrict.jpg', title: 'Explore the Jordaan District' }

    ];

    const bg = document.getElementById('things-slider-bg');
    const bgCaptionTitle = document.getElementById('things-slider-bg-caption-title');
    const bgCaptionSub = document.getElementById('things-slider-bg-caption-sub');
    const cards = Array.from(document.querySelectorAll('#things-slider-cards .card-stack-item'));
    const prevBtn = document.getElementById('things-prev');
    const nextBtn = document.getElementById('things-next');

    if (!bg || cards.length < 3) return;

    let index = 0;

    function mod(n) { return ((n % slides.length) + slides.length) % slides.length; }

    function render() {
        const s = slides[mod(index)];
        bg.style.backgroundImage = `url('${s.image}')`;

        if (bgCaptionTitle) bgCaptionTitle.textContent = s.title || '';
        if (bgCaptionSub) bgCaptionSub.textContent = s.desc || '';

        for (let i = 0; i < 3; i++) {
            const si = slides[mod(index + i + 1)];
            const el = cards[i];
            el.style.backgroundImage = `url('${si.image}')`;
            el.setAttribute('aria-label', si.title || '');

            el.classList.remove('pos-0', 'pos-1', 'pos-2');
            el.classList.add(`pos-${i}`);

            const cardCap = el.querySelector('.card-caption');
            if (cardCap) cardCap.textContent = si.title || '';
        }
    }

    function next() { index = mod(index + 1); render(); }
    function prev() { index = mod(index - 1); render(); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    render();
})();
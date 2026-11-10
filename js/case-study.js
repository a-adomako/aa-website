// Chart tooltips for case study pages. Every value is also printed beside its bar,
// so these only add context. A mark can set data-tip-value and data-tip-label;
// otherwise the tooltip reuses the mark's printed value and label.
(function chartTooltips() {
    const tip = document.getElementById('cs-tooltip');
    if (!tip) return;
    const value = tip.querySelector('strong');
    const label = tip.querySelector('span');

    function place(x, y) {
        const box = tip.getBoundingClientRect();
        const left = Math.min(Math.max(8, x + 12), window.innerWidth - box.width - 8);
        const top = y - box.height - 12 < 8 ? y + 16 : y - box.height - 12;
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
    }
    function show(mark, x, y) {
        value.textContent = mark.dataset.tipValue || mark.querySelector('.cs-mark-value').textContent;
        label.textContent = mark.dataset.tipLabel || mark.querySelector('span').textContent;
        tip.hidden = false;
        place(x, y);
    }
    function hide() { tip.hidden = true; }

    document.querySelectorAll('.cs-mark').forEach(function (mark) {
        mark.tabIndex = 0;
        mark.addEventListener('pointermove', function (e) { show(mark, e.clientX, e.clientY); });
        mark.addEventListener('pointerleave', hide);
        mark.addEventListener('focus', function () {
            const r = mark.getBoundingClientRect();
            show(mark, r.left, r.top);
        });
        mark.addEventListener('blur', hide);
    });
    window.addEventListener('scroll', hide, { passive: true });
})();

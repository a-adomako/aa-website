(function yearProgress() {
    const bar = document.getElementById('year-progress-bar');
    const yearLabel = document.getElementById('year-progress-year');
    const status = document.getElementById('year-progress-status');

    if (!bar || !yearLabel || !status) return;

    const DAY_MS = 24 * 60 * 60 * 1000;
    const monthDayFormatter = new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric'
    });

    let year;
    let defaultText = '';
    let midnightTimer;

    function dayOfYear(date) {
        return Math.floor(
            (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
                Date.UTC(date.getFullYear(), 0, 1)) / DAY_MS
        ) + 1;
    }

    function totalDaysInYear(y) {
        return Math.round((Date.UTC(y + 1, 0, 1) - Date.UTC(y, 0, 1)) / DAY_MS);
    }

    // One segment per month; each fills as its days pass, the current month in the accent colour.
    function render() {
        const now = new Date();
        year = now.getFullYear();
        const todayNumber = dayOfYear(now);
        const totalDays = totalDaysInYear(year);
        const percent = Math.round((todayNumber - 1) / totalDays * 100);
        const fragment = document.createDocumentFragment();

        for (let month = 0; month < 12; month += 1) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let fill = 0;
            if (month < now.getMonth()) fill = 1;
            else if (month === now.getMonth()) fill = now.getDate() / daysInMonth;

            const segment = document.createElement('span');
            segment.className = 'year-progress-month';
            segment.dataset.month = month;
            segment.dataset.state = month < now.getMonth() ? 'completed' : month === now.getMonth() ? 'current' : 'future';
            segment.style.setProperty('--fill', fill.toFixed(3));
            fragment.appendChild(segment);
        }

        yearLabel.textContent = year;
        bar.replaceChildren(fragment);
        bar.setAttribute('aria-label', `Day ${todayNumber} of ${totalDays}, ${percent}% of ${year} complete`);
        defaultText = `Day ${todayNumber} · ${percent}%`;
        status.textContent = defaultText;
        scheduleMidnightRefresh();
    }

    // Hovering the bar reads out the date under the pointer.
    bar.addEventListener('pointermove', event => {
        const segment = event.target.closest('.year-progress-month');
        if (!segment) return;
        const month = Number(segment.dataset.month);
        const rect = segment.getBoundingClientRect();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const ratio = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
        const date = new Date(year, month, Math.floor(ratio * daysInMonth) + 1, 12);
        status.textContent = `${monthDayFormatter.format(date)} · Day ${dayOfYear(date)}`;
    });
    bar.addEventListener('pointerleave', () => {
        status.textContent = defaultText;
    });

    function scheduleMidnightRefresh() {
        window.clearTimeout(midnightTimer);
        const now = new Date();
        const nextMidnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0, 100
        );
        midnightTimer = window.setTimeout(render, nextMidnight.getTime() - now.getTime());
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) render();
    });

    render();
})();

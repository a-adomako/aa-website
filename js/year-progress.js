(function yearProgress() {
    // A hairline along the top of the window, filled to how far through the year we are.
    const line = document.getElementById('year-line');
    if (!line) return;

    const DAY_MS = 24 * 60 * 60 * 1000;
    let midnightTimer;

    function dayOfYear(date) {
        return Math.floor(
            (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
                Date.UTC(date.getFullYear(), 0, 1)) / DAY_MS
        ) + 1;
    }

    function totalDaysInYear(year) {
        return Math.round((Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / DAY_MS);
    }

    function render() {
        const now = new Date();
        const year = now.getFullYear();
        const todayNumber = dayOfYear(now);
        const totalDays = totalDaysInYear(year);
        const fraction = (todayNumber - 1) / totalDays;

        line.style.setProperty('--progress', fraction.toFixed(4));
        line.title = `${year} · day ${todayNumber} of ${totalDays} · ${Math.round(fraction * 100)}% done`;
        scheduleMidnightRefresh();
    }

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

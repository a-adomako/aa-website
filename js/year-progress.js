(function yearProgress() {
    const grid = document.getElementById('year-progress-grid');
    const yearLabel = document.getElementById('year-progress-year');
    const selection = document.getElementById('year-progress-selection');
    const summary = document.getElementById('year-progress-summary');
    const counts = document.getElementById('year-progress-counts');

    if (!grid || !yearLabel || !selection || !summary || !counts) return;

    const DAY_MS = 24 * 60 * 60 * 1000;
    const monthDayFormatter = new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric'
    });
    const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
        month: 'long',
        day: 'numeric'
    });

    let selectedIndex = 0;
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

    function stateFor(dayNumber, todayNumber) {
        if (dayNumber < todayNumber) return 'completed';
        if (dayNumber === todayNumber) return 'today';
        return 'future';
    }

    function localIsoDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day}`;
    }

    function describeDay(button, includeToday) {
        const prefix = includeToday && button.dataset.state === 'today' ? 'Today · ' : '';
        selection.textContent = `${prefix}${button.dataset.shortDate} · Day ${button.dataset.dayNumber} of ${button.dataset.totalDays}`;
    }

    function selectDay(button, shouldFocus) {
        const buttons = Array.from(grid.querySelectorAll('.year-progress-day'));
        selectedIndex = Number(button.dataset.dayNumber) - 1;
        buttons.forEach((day, index) => {
            const selected = index === selectedIndex;
            day.tabIndex = selected ? 0 : -1;
            day.dataset.selected = selected ? 'true' : 'false';
        });
        describeDay(button, true);
        if (shouldFocus) button.focus();
    }

    function render() {
        const now = new Date();
        const year = now.getFullYear();
        const todayNumber = dayOfYear(now);
        const totalDays = totalDaysInYear(year);
        const completedDays = todayNumber - 1;
        const remainingDays = totalDays - completedDays;
        const completedPercent = (completedDays / totalDays * 100).toFixed(1);
        const remainingPercent = (remainingDays / totalDays * 100).toFixed(1);
        const fragment = document.createDocumentFragment();

        yearLabel.textContent = year;
        summary.textContent = `${completedPercent}% complete · ${remainingPercent}% remaining`;
        counts.textContent = `${completedDays} days completed · ${remainingDays} remaining`;
        grid.replaceChildren();
        grid.setAttribute('aria-label', `${year} calendar: ${totalDays} days`);

        for (let index = 0; index < totalDays; index += 1) {
            const dayNumber = index + 1;
            const date = new Date(year, 0, dayNumber, 12);
            const state = stateFor(dayNumber, todayNumber);
            const shortDate = monthDayFormatter.format(date);
            const fullDate = fullDateFormatter.format(date);
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'year-progress-day';
            button.dataset.dayNumber = dayNumber;
            button.dataset.totalDays = totalDays;
            button.dataset.shortDate = shortDate;
            button.dataset.date = localIsoDate(date);
            button.dataset.state = state;
            button.dataset.selected = state === 'today' ? 'true' : 'false';
            button.tabIndex = state === 'today' ? 0 : -1;
            button.setAttribute(
                'aria-label',
                `${state === 'today' ? 'Today, ' : ''}${fullDate}, day ${dayNumber} of ${totalDays}, ${state}`
            );

            button.addEventListener('mouseenter', () => describeDay(button, true));
            button.addEventListener('mouseleave', () => {
                const selected = grid.querySelector('[data-selected="true"]');
                if (selected) describeDay(selected, true);
            });
            button.addEventListener('focus', () => describeDay(button, true));
            button.addEventListener('click', () => {
                selectDay(button, false);
                if (typeof window.track === 'function') {
                    window.track('year_progress_day_click', {
                        day_number: dayNumber,
                        date: button.dataset.date,
                        state
                    });
                }
            });
            fragment.appendChild(button);
        }

        grid.appendChild(fragment);
        selectedIndex = todayNumber - 1;
        const todayButton = grid.children[selectedIndex];
        if (todayButton) describeDay(todayButton, true);
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

    grid.addEventListener('keydown', event => {
        const buttons = Array.from(grid.querySelectorAll('.year-progress-day'));
        if (!buttons.length) return;

        let nextIndex = selectedIndex;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex += 1;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex -= 1;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = buttons.length - 1;
        else return;

        event.preventDefault();
        nextIndex = Math.max(0, Math.min(buttons.length - 1, nextIndex));
        selectDay(buttons[nextIndex], true);
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) render();
    });

    render();
})();

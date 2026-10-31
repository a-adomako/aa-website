(function localTime() {
    const el = document.getElementById('local-time');
    const clock = el && el.querySelector('.local-time-clock');
    const status = el && el.querySelector('.local-time-status');
    if (!el || !clock) return;

    const timeZone = el.dataset.timezone || 'UTC';
    const city = el.textContent.split('·')[0].trim();
    const timeFormatter = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' });
    const hourFormatter = new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', hourCycle: 'h23' });

    // Green dot from 6am to 6pm in the city, grey at night; a note after midnight.
    function update() {
        const now = new Date();
        const hour = Number(hourFormatter.format(now));
        const daytime = hour >= 6 && hour < 18;
        clock.textContent = timeFormatter.format(now);
        if (status) status.textContent = hour < 7 ? ' · probably asleep' : ''; // nbsp: a leading plain space is trimmed in the flex row
        clock.dateTime = now.toISOString();
        el.dataset.daytime = daytime ? 'true' : 'false';
        el.title = `${daytime ? 'Daytime' : 'Night-time'} in ${city}`;
    }

    update();
    // Tick on the minute boundary, then every minute.
    window.setTimeout(() => {
        update();
        window.setInterval(update, 60 * 1000);
    }, 60 * 1000 - (Date.now() % (60 * 1000)) + 50);
})();

(function contactForm() {
    const form = document.getElementById('contact-form');
    const toggle = document.getElementById('contact-toggle');
    const status = document.getElementById('contact-status');
    if (!form || !toggle || !status) return;

    const send = form.querySelector('.contact-send');
    const track = (name, params) => { if (typeof window.track === 'function') window.track(name, params); };

    function setOpen(open) {
        form.hidden = !open;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
            form.querySelector('input').focus();
            track('contact_open');
        }
    }

    toggle.addEventListener('click', () => setOpen(form.hidden));
    form.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setOpen(false);
            toggle.focus();
        }
    });

    // Web3Forms forwards the message to the inbox tied to the access key.
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (data.botcheck) return;

        send.disabled = true;
        status.dataset.state = '';
        status.textContent = 'Sending…';
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: form.dataset.accessKey,
                    subject: `New message from ${data.name} via aarontabi.com`,
                    from_name: 'aarontabi.com',
                    name: data.name,
                    email: data.email,
                    message: data.message
                })
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok || !result.success) throw new Error(result.message || 'Send failed');

            form.reset();
            status.dataset.state = 'ok';
            status.textContent = "Thanks, it's in my inbox. I'll get back to you soon.";
            track('contact_sent');
        } catch (error) {
            status.dataset.state = 'error';
            status.textContent = "That didn't send. Please try again, or message me on LinkedIn.";
            track('contact_error');
        } finally {
            send.disabled = false;
        }
    });
})();

// Cookie consent + GA4 gating
(function() {
    var GA_ID = 'G-QR515CQLLQ';
    var CONSENT_KEY = 'ob_cookie_consent';

    function loadGA4() {
        if (document.querySelector('script[src*="googletagmanager"]')) return;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    function showBanner() {
        var banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('style',
            'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
            'background:#1a1f3d;border-top:1px solid rgba(255,255,255,0.1);' +
            'padding:12px 16px;display:flex;align-items:center;justify-content:center;' +
            'gap:12px;flex-wrap:wrap;font-family:system-ui,sans-serif;font-size:13px;color:#9ca3af;'
        );

        var text = document.createElement('span');
        text.textContent = 'We use cookies for analytics. ';
        var link = document.createElement('a');
        link.href = '/privacy-policy.html';
        link.textContent = 'Privacy Policy';
        link.setAttribute('style', 'color:#3acc98;text-decoration:underline;');
        text.appendChild(link);

        var acceptBtn = document.createElement('button');
        acceptBtn.textContent = 'Accept';
        acceptBtn.setAttribute('style',
            'padding:6px 16px;border-radius:6px;background:#0a8f65;color:white;' +
            'font-size:13px;font-weight:500;border:none;cursor:pointer;'
        );

        var declineBtn = document.createElement('button');
        declineBtn.textContent = 'Decline';
        declineBtn.setAttribute('style',
            'padding:6px 16px;border-radius:6px;background:transparent;color:#9ca3af;' +
            'font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,0.1);cursor:pointer;'
        );

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            banner.remove();
            loadGA4();
        });

        declineBtn.addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'declined');
            banner.remove();
        });

        banner.appendChild(text);
        banner.appendChild(acceptBtn);
        banner.appendChild(declineBtn);
        document.body.appendChild(banner);
    }

    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
        loadGA4();
    } else if (consent !== 'declined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }
    // Track booking button clicks
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href*="calendar.google.com/calendar/appointments"]');
        if (!link || typeof window.gtag !== 'function') return;
        window.gtag('event', 'book_demo_click', {
            button_text: link.textContent.trim(),
            page_location: window.location.pathname
        });
    });
})();

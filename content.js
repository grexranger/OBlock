(function () {
    'use strict';

    function normalize(str) {
        return str.trim().toLowerCase();
    }

    function hideBlockedContent(blocked) {
        // Skjul brugerens egne indlæg
        document.querySelectorAll('.b-userinfo__details a[href*="/member/"]').forEach(a => {
            const name = normalize(a.textContent);
            if (blocked.includes(name)) {
                const post = a.closest('li');
                if (post) post.style.display = 'none';
            }
        });

        // Skjul indlæg hvor brugeren er citeret
        document.querySelectorAll('.bbcode_quote').forEach(quote => {
            const postedBy = quote.querySelector('.bbcode_postedby');
            if (postedBy && blocked.some(b => normalize(postedBy.textContent).includes(b))) {
                const post = quote.closest('li');
                if (post) post.style.display = 'none';
            }
        });
    }

    function init() {
        chrome.storage.local.get(['blockedUsers'], function(result) {
            const blocked = result.blockedUsers || [];
            hideBlockedContent(blocked);

            const observer = new MutationObserver(() => hideBlockedContent(blocked));
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    init();
})();
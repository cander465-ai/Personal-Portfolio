$(document).ready(function () {

    /* ── Nav hamburger ── */
    $('#hamburgerBtn').on('click', function () {
        const isOpen = $('#navOverlay').toggleClass('open').hasClass('open');
        $(this).toggleClass('open', isOpen);
        $(this).attr('aria-expanded', isOpen);
        $('body').css('overflow', isOpen ? 'hidden' : '');
    });

    $('#navOverlay a').on('click', function () {
        $('#navOverlay').removeClass('open');
        $('#hamburgerBtn').removeClass('open').attr('aria-expanded', false);
        $('body').css('overflow', '');
    });

    /* ── Featured project: clicking a thumbnail updates the large preview ── */
    $('#projectbox img').on('click', function () {
        const $img   = $(this);
        const src    = $img.attr('src');
        const title  = $img.data('title');
        const desc   = $img.data('desc');

        // Fade out, swap content, fade back in
        $('#featured-img, #featured-title, #featured-desc').fadeOut(150, function () {
            $('#featured-img').attr('src', src).attr('alt', title);
            $('#featured-title').text(title);
            $('#featured-desc').text(desc);
            $('#featured-img, #featured-title, #featured-desc').fadeIn(200);
        });
    });

    // Make thumbnails look clickable
    $('#projectbox img').css('cursor', 'pointer');
    $('#contact-toggle').on('click', function () {
    const $email = $('#contact-email');
    if ($email.is(':visible')) {
        $email.fadeOut(150);
        $(this).text('Contact');
    } else {
        $email.fadeIn(200);
        $(this).text('Contact →');
    }
    });
});
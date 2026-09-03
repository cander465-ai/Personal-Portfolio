$(document).ready(function (){

    /* ── Nav hamburger ── */
    $('#hamburgerBtn').on('click', function () {
        const isOpen = $('#navOverlay').toggleClass('open').hasClass('open');
        $(this).toggleClass('open', isOpen);
        $(this).attr('aria-expanded', isOpen);
        // Lock page scroll while menu is open
        $('body').css('overflow', isOpen ? 'hidden' : '');
    });

    // Close the menu when any nav link is clicked
    $('#navOverlay a').on('click', function () {
        $('#navOverlay').removeClass('open');
        $('#hamburgerBtn').removeClass('open').attr('aria-expanded', false);
        $('body').css('overflow', '');
    });
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
})

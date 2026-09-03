$(document).ready(function () {

    /* ══════════════════════════════════════
       INTRO OVERLAY
       ══════════════════════════════════════ */
    $('body').addClass('intro-active');

    $('#intro-overlay').one('click', function () {
        // 1. Fade the overlay out
        $(this).addClass('exiting');

        // 2. After overlay animation finishes, remove it and fade the page in
        setTimeout(function () {
            $('#intro-overlay').remove();
            $('body').removeClass('intro-active');

            // Short pause so the transition feels like a breath, not a snap
            setTimeout(function () {
                $('#page-wrap').addClass('visible');
            }, 80);
        }, 700); // matches intro-exit duration
    });


    /* ══════════════════════════════════════
       NAV HAMBURGER
       ══════════════════════════════════════ */
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

    /* ══════════════════════════════════════
       CUSTOM CURSOR
       ══════════════════════════════════════ */
    const feather = document.getElementById('cursor-image');
    if (feather) {
        window.addEventListener('mousemove', function (e) {
            feather.style.left = e.clientX + 'px';
            feather.style.top  = e.clientY + 'px';
        });
    }

    /* ══════════════════════════════════════
       BURNING QUOTE
       ══════════════════════════════════════ */
    let burned = false;

    function spawnFires() {
        const wrap = $('#quoteWrap');
        const count = 7;

        for (let i = 0; i < count; i++) {
            const basePercent = (i / (count - 1)) * 90 + 5;
            const jitter      = (Math.random() - 0.5) * 8;
            const leftPercent = Math.min(95, Math.max(5, basePercent + jitter));
            const size        = 70 + Math.random() * 60;
            const delay       = i * 80 + Math.random() * 60;

            const $fire = $('<img>')
                .addClass('fire-sprite')
                .attr('src', './images/fire.png')
                .attr('alt', '')
                .css({ left: leftPercent + '%', width: size + 'px' });

            wrap.append($fire);

            setTimeout(function () { $fire.addClass('ignite'); }, delay);
        }
    }

    $('#quoteWrap').on('click', function () {
        if (burned) return;
        burned = true;
        spawnFires();
        $('#quoteWrap').addClass('burning');
        setTimeout(function () { $('#burnt').addClass('visible'); }, 2000);
    });


    /* ══════════════════════════════════════
       FAKE COMPILER
       ══════════════════════════════════════ */
    const sourceCode = [
        'import Phoenix from "./phoenix.js";',
        '',
        'function rebirth(mind) {',
        '    const walls = mind.findObstacles();',
        '    if (walls.length === 0) return mind;',
        '',
        '    walls.forEach(wall => {',
        '        wall.burn();',
        '    });',
        '',
        '    return Phoenix.rise(mind);',
        '}',
        '',
        'rebirth(new Mind({ fearless: true }));',
    ];

    const errors = [
        'SyntaxError: Unexpected token \')\'  at phoenix.js:8',
        'ReferenceError: Mind is not defined  at phoenix.js:14',
        'TypeError: wall.burn is not a function  at phoenix.js:9',
        'Error: Cannot read properties of undefined (reading \'rise\')',
        'RangeError: Maximum call stack size exceeded',
    ];

    function typeCode(lines, callback) {
        $('#code-lines').text('');
        const fullText = lines.join('\n');
        let i = 0;
        const interval = setInterval(function () {
            $('#code-lines').text($('#code-lines').text() + fullText[i]);
            i++;
            if (i >= fullText.length) { clearInterval(interval); callback(); }
        }, 18);
    }

    function resetCompiler() {
        $('#compiler-box').removeClass('error success');
        $('#phoenix-rise').removeClass('visible');
        $('#compiler-output').text('').css('color', '');
        $('#code-lines').text('');
    }

    $('#compile-btn').on('click', function () {
        resetCompiler();
        $('#compile-btn').prop('disabled', true);
        $('#compiler-output').text('Compiling...').css('color', '#888');

        typeCode(sourceCode, function () {
            const success = Math.random() < 0.4;

            setTimeout(function () {
                if (success) {
                    $('#compiler-box').addClass('success');
                    $('#compiler-output').text('✓ Build successful — phoenix.js compiled in 312ms');
                    setTimeout(function () {
                        $('#phoenix-rise').addClass('visible');
                        $('#compile-btn').prop('disabled', false).text('↺ Compile Again');
                    }, 600);
                } else {
                    $('#compiler-box').addClass('error');
                    const msg = errors[Math.floor(Math.random() * errors.length)];
                    $('#compiler-output').text('✗ ' + msg);
                    setTimeout(function () {
                        $('#compile-btn').prop('disabled', false).text('↺ Try Again');
                    }, 600);
                }
            }, 400);
        });
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

});
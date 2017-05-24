/**
 * @license
 * Copyright 2017 Moovel. All Rights Reserved.
 *      https://github.com/moovel/web-squad-recruitment-challenge
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 *  Nextbike, Moovel Challenge website.
 *      https://github.com/moovel/web-squad-recruitment-challenge
 *
 * @author Generoso Martello - https://github.com/genielabs
 *
 */


// jquery ref to the navbar element
var navBar = null;
// is it displaying the navbar ?
var navBarVisible = false;
// navbar scroll hide offset
var navBarHideOffset = 80;
// navbar first animation duration (then it will be set to 300ms)
var navBarAnimDuration = 1000;
var scrollHandler;
var mainBody = $('body');

// on scroll, let the interval function know the user has scrolled
$(window).scroll(function(event){
    if (scrollHandler == null)
        scrollHandler = setTimeout(scrollingCheck, 100);
});

$(document).ready(function () {
    navBar = $('.navbar').hide();
    setTimeout(function () {
        $('.navbar').show();
        scrollingCheck();
        navBarAnimDuration = 300;
    }, 1000);
});

function scrollingCheck() {
    // exit if navBar is not yet available
    if (navBar == null) return;
    // do measure and behave on scroll position
    var scrollOffset = $(window).scrollTop();
    var viewHeight = mainBody.height();
    var coverVisible = (scrollOffset < (viewHeight - navBarHideOffset));
    //console.log('scroll check', coverVisible, scrollOffset, viewHeight);
    if (coverVisible) {
        if ((scrollOffset > navBarHideOffset) && navBarVisible) {
            navBarVisible = false;
            navBar.animateCSS('fadeOutUp', {
                delay: 0,
                duration: navBarAnimDuration,
                complete: function () {
                    if (!navBarVisible)
                        navBar.hide();
                }
            });
        } else if (((scrollOffset < navBarHideOffset) && !navBarVisible) || navBar.hasClass('navbar-shadow')) {
            navBarVisible = true;
            navBar.removeClass('navbar-shadow');
            navBar.show().animateCSS('fadeInDown', {
                duration: navBarAnimDuration
            });
        }
    } else {
        if (!navBar.hasClass('navbar-shadow') || !navBar.is(":visible")) {
            //navBar.css('background-color', 'black');
            navBar.addClass('navbar-shadow');
            navBar.show().animateCSS('fadeInDown', { duration: navBarAnimDuration });
            navBarVisible = true;
        }
    }

    $('.reveal').each(function () {
        var el = $(this);
        var centerY = (el.offset().top - scrollOffset) + (el.height()/2);
        if (scrollOffset > ((el.offset().top+100/*+(el.height()/2)*/)-viewHeight)) {
            el.removeClass('reveal').animateCSS(el.data('animation'), {
                delay: 0,
                duration: 750
            });
        }
    });

    scrollHandler = null;
}

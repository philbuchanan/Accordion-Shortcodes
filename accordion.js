(function($) {
	'use strict';
	
	var i, index;
	
	
	
	/**
	 * Accordion Shortcodes plugin function
	 *
	 * @param object options Plugin settings to override the defaults
	 */
	$.fn.accordionShortcodes = function(options) {
	
		var allTitles  = this.children('.accordion-title'),
			allPanels  = this.children('.accordion-content').hide(),
			firstPanel = this.children('.accordion-content:first-of-type'),
			selectId   = $(window.location.hash),
			duration   = 250,
			settings   = $.extend({
				// Set default settings
				autoClose:    true,
				openFirst:    false,
				openAll:      false,
				clickToClose: false,
				scroll:       false
			}, options);
		
		// Set the scroll offset
		settings.scrollOffset = Math.floor(parseInt(settings.scroll)) | 0;
		
		console.log(settings);
		
		// Remove no-js class if JavaScript is enabled
		$('.accordion').removeClass('no-js');
		
		// Should any accordions be opened on load?
		if (selectId.length && selectId.hasClass('accordion-title')) {
			selectId.addClass('open');
			selectId.next().slideDown(duration);
		}
		else if (settings.openAll) {
			allPanels.show();
			allTitles.addClass('open');
		}
		else if (settings.openFirst) {
			firstPanel.prev().addClass('open');
			firstPanel.slideDown(duration);
		}
		
		// Add event listener
		allTitles.click(function() {
			// Only open the item if item isn't already open
			if (!$(this).hasClass('open')) {
				// Close all accordion items
				if (settings.autoClose) {
					allPanels.slideUp(duration);
					allTitles.removeClass('open');
				}
				
				// Open clicked item
				$(this).next().slideDown(duration, function() {
					// Scroll page to the title
					if (settings.scroll) {
						$('html, body').animate({
							scrollTop: $(this).prev().offset().top - settings.scrollOffset
						}, duration);
					}
				});
				$(this).addClass('open');
			}
			// If item is open, and click to close is set, close it
			else if (settings.clickToClose) {
				$(this).next().slideUp(duration);
				$(this).removeClass('open');
			}
			
			return false;
		});
		
		// Listen for hash changes (in page jump links for accordions)
		$(window).on('hashchange', function() {
			selectId = $(window.location.hash);
			if (selectId.length && selectId.hasClass('accordion-title')) {
				allPanels.slideUp(duration);
				allTitles.removeClass('open');
				selectId.addClass('open');
				selectId.next().slideDown(duration, function() {
					$('html, body').animate({
						scrollTop: $(this).prev().offset().top - settings.scrollOffset
					}, duration);
				});
			}
		});
		
		return this;
	
	};
	
	
	
	for (i = 0; i < accordionShortcodesSettings.length; i += 1) {
		index = i + 1;
		
		$('#accordion-1').accordionShortcodes(accordionShortcodesSettings[i]);
	}
}(jQuery));
(function($) {
	'use strict';
	
	var i, settings;
	
	
	
	/**
	 * Accordion Shortcodes plugin function
	 *
	 * @param object options Plugin settings to override the defaults
	 */
	$.fn.accordionShortcodes = function(options) {
	
		var allTitles  = this.children('.accordion-title'),
			allPanels  = this.children('.accordion-content').hide(),
			firstTitle = this.children('.accordion-title:first-of-type'),
			firstPanel = this.children('.accordion-content:first-of-type'),
			selected   = $(window.location.hash),
			duration   = 250,
			settings   = $.extend({
				// Set default settings
				autoClose:    true,
				openFirst:    false,
				openAll:      false,
				clickToClose: false,
				scroll:       false
			}, options);
		
		// Remove 'no-js' class since JavaScript is enabled
		$('.accordion').removeClass('no-js');
		
		// Set the scroll offset
		settings.scrollOffset = Math.floor(parseInt(settings.scroll)) | 0;
		
		// Should any accordions be opened on load?
		if (selected.length && selected.hasClass('accordion-title')) {
			selected.next().slideDown(duration);
			selected.addClass('open');
		}
		else if (settings.openAll) {
			allPanels.show();
			allTitles.addClass('open');
		}
		else if (settings.openFirst) {
			firstPanel.slideDown(duration);
			firstTitle.addClass('open');
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
			selected = $(window.location.hash);
			
			if (selected.length && selected.hasClass('accordion-title')) {
				allPanels.slideUp(duration);
				allTitles.removeClass('open');
				selected.addClass('open');
				
				selected.next().slideDown(duration, function() {
					$('html, body').animate({
						scrollTop: $(this).prev().offset().top - settings.scrollOffset
					}, duration);
				});
			}
		});
		
		return this;
	
	};
	
	
	
	// Loop through accordion settings objects
	for (var i = 0; i < accordionShortcodesSettings.length; i += 1) {
		settings = accordionShortcodesSettings[i];
		
		$('#' + settings.id).accordionShortcodes(settings);
	}
}(jQuery));
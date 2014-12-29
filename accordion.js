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
			firstTitle = allTitles.first(),
			firstPanel = allPanels.first(),
			selectedId = $(window.location.hash),
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
		if (selectedId.length && selectedId.hasClass('accordion-title')) {
			selectedId.addClass('open');
			selectedId.next().slideDown(duration);
		}
		else if (settings.openAll) {
			allPanels.show();
			allTitles.addClass('open');
		}
		else if (settings.openFirst) {
			firstTitle.addClass('open');
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
			selectedId = $(window.location.hash);
			
			if (selectedId.length && selectedId.hasClass('accordion-title')) {
				allPanels.slideUp(duration);
				allTitles.removeClass('open');
				selectedId.addClass('open');
				
				selectedId.next().slideDown(duration, function() {
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
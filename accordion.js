(function($) {
	'use strict';
	
	var allTitles  = $('.accordion-title'),
		allPanels  = $('.accordion-content').hide(),
		firstPanel = $('.accordion-content:first-of-type'),
		duration   = 250,
		settings   = {
			// Set defaults
			autoClose: true,
			openFirst: false,
			openAll: false,
			clickToClose: false
		};
	
	// Check for accordion settings variable passed from WordPress
	if (typeof accordionSettings !== 'undefined') {
		settings = accordionSettings;
	}
	
	// Open the first or all accordion items
	if (settings.openAll) {
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
			$(this).next().slideDown(duration);
			$(this).addClass('open');
		
		}
		// If item is open, and click to close is set, close it
		else if (settings.clickToClose) {
		
			$(this).next().slideUp(duration);
			$(this).removeClass('open');
		
		}
		return false;
	
	});

}(jQuery));
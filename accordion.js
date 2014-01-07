(function($) {
	'use strict';
	
	var allPanels  = $('.accordion > dd').hide(),
		firstPanel = $('.accordion > dd:first-of-type'),
		duration   = 250,
		settings   = {
			autoClose: true,
			openFirst: false,
			clickToClose: false
		};
	
	// Check for accordion settings variable passed from WordPress
	if (typeof accordionSettings !== 'undefined') {
		settings = accordionSettings;
	}
	
	// Open the first accordion item
	if (settings.openFirst) {
		firstPanel.prev().addClass('open');
		firstPanel.slideDown(duration);
	}
	
	// Add event listener
	$('.accordion > dt').click(function() {
	
		// Only open the item if item isn't already open
		if (!$(this).hasClass('open')) {
		
			// Close all accordion items
			if (settings.autoClose) {
				allPanels.slideUp(duration);
				$('.accordion > dt').removeClass('open');
			}
			
			// Open clicked item
			$(this).next().slideDown(duration);
			$(this).addClass('open');
		
		}
		// If item is open, close it
		else if (settings.clickToClose) {
		
			$(this).next().slideUp(duration);
			$(this).removeClass('open');
		
		}
		return false;
	
	});

}(jQuery));
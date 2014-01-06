(function($) {
	'use strict';
	
	var allPanels  = $('.accordion > dd').hide(),
		firstPanel = $('.accordion > dd:first-of-type'),
		duration   = 250,
		settings   = accordionSettings;
	
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
		return false;
	
	});

}(jQuery));
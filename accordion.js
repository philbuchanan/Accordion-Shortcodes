(function($) {
	'use strict';
	
	var allPanels = $('.accordion > dd').hide(),
		duration = 250,
		autoClose = true;
	
	$('.accordion > dt').click(function() {
		if (autoClose) {
			allPanels.slideUp(duration);
			$('.accordion > dt').removeClass('open');
		}
		$(this).next().slideDown(duration);
		$(this).addClass('open');
		return false;
	});

}(jQuery));
(function($) {
	'use strict';

	// Remove the 'no-js' class since JavaScript is enabled
	$('.c-accordion').removeClass('no-js');



	/**
	 * Accordion Shortcodes plugin function
	 *
	 * @param object options Plugin settings to override the defaults
	 */
	$.fn.accordionBlocks = function(options) {
		var allItems   = $(this).children('.c-accordion__item');
		var allTitles  = allItems.children('.c-accordion__title');
		var allPanels  = allItems.children('.c-accordion__content');
		var hashID     = window.location.hash.replace('#', '');
		var duration   = 250;
		var settings   = $.extend({
			// Set default settings
			autoClose:    true,
			openAll:      false,
			clickToClose: true,
			scroll:       false,
			scrollOffset: false,
		}, options);



		/**
		 * Initial setup
		 * Set the scroll offset, and figure out which items should be open by
		 * default.
		 */
		(function initialSetup() {
			settings.scrollOffset = Math.floor(parseInt(settings.scrollOffset)) | 0;

			// Set initial state of all accordion items
			if (settings.openAll) {
				// If open all is set, open them all
				allTitles.each(function() {
					openItem($(this));
				});
			}
			else {
				// if open all isn't set, figure out which items to open
				allItems.each(function() {
					// If this item has `initally-open prop` set to true
					if ($(this).data('initially-open')) {
						openItem($(this));
					}
					// If the hash matches this item, open it
					else if ($(this).attr('id') === hashID) {
						openItem($(this));
					}
					// Otherwise, close the item
					else {
						$(this).children('.c-accordion__content').hide();
						setCloseItemAttributes($(this));
					}
				});
			}
		})();



		/**
		 * Defualt click function
		 * Called when an accordion title is clicked.
		 */
		function clickHandler() {
			var item = $(this).parent('.c-accordion__item');

			// Only open the item if item isn't already open
			if (!item.hasClass('is-open')) {
				// Close all accordion items
				maybeCloseItems();

				// Open clicked item
				openItem(item);
			}
			// If item is open, and click to close is set, close it
			else if (settings.clickToClose) {
				closeItem(item);
			}

			return false;
		}



		/**
		 * Opens an accordion item
		 * Also handles accessibility attribute settings.
		 *
		 * @param object item The accordion item to open
		 */
		function openItem(item) {
			var content = item.children('.c-accordion__content');

			// Clear/stop any previous animations before revealing content
			content.clearQueue().stop().slideDown(duration, function() {
				// Scroll page to the title
				if (settings.scroll) {
					// Pause scrolling until other items have closed
					setTimeout(function() {
						$('html, body').animate({
							scrollTop: item.offset().top - settings.scrollOffset
						}, duration);
					}, duration);
				}
			});

			setOpenItemAttributes(item);
		}



		/**
		 * Set open item attributes
		 * Mark accordion item as open and read and set aria attributes.
		 *
		 * @param object item The accordion item
		 */
		function setOpenItemAttributes(item) {
			item.addClass('is-open is-read')
			.children('.c-accordion__title').attr({
				'aria-selected': 'true',
				'aria-expanded': 'true'
			})
			.next().attr({
				'aria-hidden': 'false'
			});
		}



		/**
		 * Closes an accordion item
		 * Also handles accessibility attribute settings.
		 *
		 * @param object item The accordion item to close
		 */
		function closeItem(item) {
			// Close the item
			item.children('.c-accordion__content').slideUp(duration);

			setCloseItemAttributes(item);
		}



		/**
		 * Set closed item attributes
		 * Mark accordion item as closed and set aria attributes.
		 *
		 * @param object item The accordion item
		 */
		function setCloseItemAttributes(item) {
			item.removeClass('is-open')
			.children('.c-accordion__title').attr({
				'aria-selected': 'false',
				'aria-expanded': 'false'
			})
			.next().attr({
				'aria-hidden': 'true'
			});
		}



		/**
		 * Close all items if auto close is enabled
		 */
		function maybeCloseItems() {
			if (settings.autoClose) {
				allItems.each(function() {
					closeItem($(this));
				});
			}
		}



		/**
		 * Add event listeners
		 */
		allTitles.click(clickHandler);

		allTitles.keydown(function(e) {
			var code = e.which;

			// 13 = Return, 32 = Space
			if ((code === 13) || (code === 32)) {
				// Simulate click on title
				$(this).click();
			}
		});

		// Listen for hash changes (in page jump links for accordions)
		$(window).on('hashchange', function() {
			hashID = window.location.hash.replace('#', '');

			var ele = $('#' + hashID);

			console.log(ele.length, ele.hasClass('c-accordion__item'));

			// If there is a hash and the hash is on an accordion item
			if (ele.length && ele.hasClass('c-accordion__item')) {
				// Close all accordion items
				maybeCloseItems();

				// Open clicked item
				openItem(ele);
			}
		});

		return this;
	};



	// Loop through accordion settings objects
	// Wait for the entire page to load before loading the accordion
	$(window).on('load', function() {
		$('.js-accordion-block').each(function() {
			$(this).accordionBlocks({
				// Set default settings
				autoClose:    $(this).data('auto-close'),
				openAll:      $(this).data('open-all'),
				clickToClose: $(this).data('click-to-close'),
				scroll:       $(this).data('scroll'),
				scrollOffset: $(this).data('scroll-offset'),
			});
		});
	});
}(jQuery));

(function() {
	'use strict';
	
	tinymce.create('tinymce.plugins.accordionShortcodesExtensions', {
		init: function(editor, url) {
			
			// Accordion group
			editor.addButton('AccordionShortcode', {
				title: accordionShortcodesTranslations.group_button_label,
				image: url + '/images/accordion.gif',
				onclick: function() {
					editor.windowManager.open({
						title: accordionShortcodesTranslations.group_window_title,
						body: [
							{
								type: 'checkbox',
								name: 'autoclose',
								label: accordionShortcodesTranslations.group_auto_close_label,
								checked: true
							},
							{
								type: 'checkbox',
								name: 'openfirst',
								label: accordionShortcodesTranslations.group_open_first_label
							},
							{
								type: 'checkbox',
								name: 'openall',
								label: accordionShortcodesTranslations.group_open_all_label
							},
							{
								type: 'checkbox',
								name: 'clicktoclose',
								label: accordionShortcodesTranslations.group_click_to_close_label
							},
							{
								type: 'checkbox',
								name: 'scroll',
								label: accordionShortcodesTranslations.group_scroll_label
							},
							{
								type: 'listbox',
								name: 'tag',
								label: accordionShortcodesTranslations.group_html_tag_label,
								minWidth: 75,
								values: [
									{text: '---', value: null},
									{text: 'h1',  value: 'h1'},
									{text: 'h2',  value: 'h2'},
									{text: 'h3',  value: 'h3'},
									{text: 'h4',  value: 'h4'},
									{text: 'h5',  value: 'h5'},
									{text: 'h6',  value: 'h6'},
									{text: 'p',   value: 'p'},
									{text: 'div', value: 'div'}
								]
							}
						],
						onsubmit: function(e) {
							var shortcode = '[' + accordionShortcodesPrefix + 'accordion';
							
							if (e.data.autoclose === false) {
								shortcode += ' autoclose=' + e.data.autoclose;
							}
							if (e.data.openfirst) {
								shortcode += ' openfirst=' + e.data.openfirst;
							}
							if (e.data.openall) {
								shortcode += ' openall=' + e.data.openall;
							}
							if (e.data.clicktoclose) {
								shortcode += ' clicktoclose=' + e.data.clicktoclose;
							}
							if (e.data.scroll) {
								shortcode += ' scroll=' + e.data.scroll;
							}
							if (e.data.tag) {
								shortcode += ' tag=' + e.data.tag;
							}
							
							shortcode += ']' + editor.selection.getContent() + '[/' + accordionShortcodesPrefix + 'accordion]';
							
							editor.insertContent(shortcode);
						}
					});
				}
			});
			
			// Accordion item
			editor.addButton('AccordionItemShortcode', {
				title: accordionShortcodesTranslations.item_button_label,
				image: url + '/images/accordion-item.gif',
				onclick: function() {
					editor.windowManager.open({
						title: accordionShortcodesTranslations.item_window_title,
						body: [
							{
								type: 'textbox',
								name: 'title',
								label: accordionShortcodesTranslations.item_title_label,
								minWidth: 300
							},
							{
								type: 'textbox',
								name: 'id',
								label: accordionShortcodesTranslations.item_id_label,
								minWidth: 300
							},
							{
								type: 'container',
								html: accordionShortcodesTranslations.item_notes
							}
						],
						onsubmit: function(e) {
							var shortcode = '[' + accordionShortcodesPrefix + 'accordion-item title="';
							
							if (e.data.title) {
								shortcode += e.data.title;
							}
							shortcode += '"';
							
							if (e.data.id) {
								shortcode += ' id=' + e.data.id.replace(/\s+/g, '-');
							}
							
							shortcode += ']' + editor.selection.getContent() + '[/' + accordionShortcodesPrefix + 'accordion-item]';
							
							editor.insertContent(shortcode);
						}
					})
				}
			});
		}
	});
	
	tinymce.PluginManager.add('accordionShortcodesExtensions', tinymce.plugins.accordionShortcodesExtensions);
}());
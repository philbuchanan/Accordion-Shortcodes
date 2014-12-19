(function() {
	'use strict';
	
	tinymce.create('tinymce.plugins.accordionShortcodesExtensions', {
		init: function(editor, url) {
			editor.addButton('AccordionShortcode', {
				title: 'Add an accordion group',
				cmd: 'accordionShortcode',
				image: url + '/images/accordion.gif'
			});
			
			editor.addCommand('accordionShortcode', function() {
				editor.windowManager.open({
					title: 'Insert Accordion Shortcode',
					body: [
						{
							type: 'checkbox',
							name: 'autoclose',
							label: 'Auto Close Accordions',
							checked: true
						},
						{
							type: 'checkbox',
							name: 'openfirst',
							label: 'Open First Accordion'
						},
						{
							type: 'checkbox',
							name: 'openall',
							label: 'Open All Accordions'
						},
						{
							type: 'checkbox',
							name: 'clicktoclose',
							label: 'Click to Close Accordions'
						},
						{
							type: 'checkbox',
							name: 'scroll',
							label: 'Scroll to Top of Accordion'
						},
						{
							type: 'listbox',
							name: 'tag',
							label: 'HTML Tag for Title',
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
						var shortcode = '[accordion';
						
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
						
						shortcode += ']' + editor.selection.getContent() + '[/accordion]';
						
						editor.execCommand('mceInsertContent', 0, shortcode);
					}
				});
			});
			
			// Accordion Item
			editor.addButton('AccordionItemShortcode', {
				title: 'Add an accordion item',
				cmd: 'accordionItemShortcode',
				image: url + '/images/accordion-item.gif'
			});
			
			editor.addCommand('accordionItemShortcode', function() {
				editor.windowManager.open({
					title: 'Insert Accordion Item Shortcode',
					body: [
						{
							type: 'textbox',
							name: 'title',
							label: 'Accordion Item Title',
							minWidth: 300
						},
						{
							type: 'textbox',
							name: 'id',
							label: 'ID (optional)',
							minWidth: 300
						},
						{
							type: 'container',
							html: 'Each ID on a single page must be unique and cannot contain spaces.'
						}
					],
					onsubmit: function(e) {
						var shortcode = '[accordion-item title="';
						
						if (e.data.title) {
							shortcode += e.data.title;
						}
						shortcode += '"';
						
						if (e.data.id) {
							shortcode += ' id=' + e.data.id;
						}
						
						shortcode += ']' + editor.selection.getContent() + '[/accordion-item]';
						
						editor.execCommand('mceInsertContent', 0, shortcode);
					}
				});
			});
		},
		
		getInfo: function() {
			return {
				longname:  'Accordion Buttons',
				author:    'Phil Buchanan',
				authorurl: 'http://philbuchanan.com/',
				version:   '2.1.1'
			};
		}
	});
	
	tinymce.PluginManager.add('accordionShortcodesExtensions', tinymce.plugins.accordionShortcodesExtensions);
}());
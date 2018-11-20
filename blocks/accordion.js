(function(blocks, editor, i18n, element, components, _) {
	var el = element.createElement;

	blocks.registerBlockType('pb/accordion', {
		title: i18n.__('Accordion'),
		icon: el('svg',
			{
				width: 24,
				height: 24
			},
			el('path', {
				d: 'M2,4v8H4v3H2v5H22V15H20V12h2V4ZM20,18H4V17H20Zm-2-3H6V12H18Zm2-5H4V9H20Zm0-3H4V6H20Z'
			})
		),
		category: 'formatting',
		supports: {
			anchor: true,
		},
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'c-accordion',
			},
			autoClose: {
				type: 'boolean',
				default: true
			},
			openFirst: {
				type: 'boolean',
				default: true
			},
			openAll: {
				type: 'boolean',
				default: false
			},
			clickToClose: {
				type: 'boolean',
				default: true
			},
			scroll: {
				type: 'boolean',
				default: false
			},
			scrollOffset: {
				type: 'number',
				default: ''
			}
		},
		edit: function(props) {
			var attributes = props.attributes;

			return [
				el(editor.InspectorControls,
					{},
					el(components.PanelBody,
						{
							title: i18n.__('Accordion Block Settings'),
							className: 'accordion-item-settings'
						},
						el(components.ToggleControl, {
							label: i18n.__('Auto Close'),
							checked: attributes.autoClose,
							onChange: function(value) {
								props.setAttributes({
									autoClose: value,
								});
							},
							help: function(checked) {
								return checked ? i18n.__('Accordion items will automatically close when opening a new item.') : i18n.__('Accordion items will remain open when opening a new item.');
							}
						}),
						el(components.ToggleControl, {
							label: i18n.__('Open All'),
							checked: attributes.openAll,
							onChange: function(value) {
								props.setAttributes({
									openAll: value,
								});
							},
							help: function(checked) {
								return checked ? i18n.__('All accordion items are open by default.') :  i18n.__('All accordion items are closed by default.');
							}
						}),
						el(components.ToggleControl, {
							label: i18n.__('Click to Close'),
							checked: attributes.clickToClose,
							onChange: function(value) {
								props.setAttributes({
									clickToClose: value,
								});
							},
							help: function(checked) {
								return checked ? i18n.__('Users can click an accordion item to close it.') : i18n.__('Once open, accordion items cannot be closed.');
							}
						}),
						el(components.ToggleControl, {
							label: i18n.__('Scroll to Accordion Item'),
							checked: attributes.scroll,
							onChange: function(value) {
								props.setAttributes({
									scroll: value,
								});
							},
							help: function(checked) {
								return checked ? i18n.__('The page will scroll to the accordion item title when it is opened.') : i18n.__('The page will not scroll when opening accordion items.');
							}
						}),
						el(components.RangeControl, {
							label: i18n.__('Scoll Pixel Offset'),
							value: attributes.scrollOffset,
							onChange: function(value) {
								props.setAttributes({
									scrollOffset: value,
								});
							},
							min: 0,
							max: 1000
						}),
					),
				),
				el('div',
					{
						className: 'c-accordion',
						value: attributes.content,
						onChange: function(value) {
							props.setAttributes({
								content: value
							});
						},
					},
					el(editor.InnerBlocks, {
						allowedBlocks: [
							'pb/accordion-item'
						]
					}),
				),
			];
		},
		save: function(props) {
			var attributes = props.attributes;

			return (
				el('div',
					{
						className:             'c-accordion no-js js-accordion-block',
						'data-auto-close':     attributes.autoClose,
						'data-open-all':       attributes.openAll,
						'data-click-to-close': attributes.clickToClose,
						'data-scroll':         attributes.scroll,
						'data-scroll-offset':  attributes.scrollOffset,
					},
					el(editor.InnerBlocks.Content, {})
				)
			);
		},
	});
})(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);

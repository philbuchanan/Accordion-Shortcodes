(function(blocks, editor, i18n, element, components, _) {
	var el = element.createElement;

	blocks.registerBlockType('pb/accordion', {
		title: i18n.__('Accordion Group'),
		icon: el('svg',
			{
				width: 24,
				height: 24
			},
			el('path', {
				d: 'M14.53,10.48a.54.54,0,0,1-.36-.14L12.06,8.22l-2.05,2a.48.48,0,0,1-.7,0,.5.5,0,0,1,0-.71l2.75-2.75,2.82,2.82a.5.5,0,0,1,0,.71A.52.52,0,0,1,14.53,10.48Z'
			}),
			el('path', {
				d: 'M12.09,17.19,9.27,14.37a.5.5,0,0,1,.71-.71l2.11,2.12,2.05-2a.5.5,0,0,1,.71,0,.51.51,0,0,1,0,.71Z'
			}),
			el('path', {
				d: 'M15,12.52H9a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5H15a.5.5,0,0,1,.5.5A.51.51,0,0,1,15,12.52Z'
			}),
			el('path', {
				d: 'M20,4V20H4V4H20m0-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2Z'
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
			},
			applyStyles: {
				type: 'boolean',
				default: true
			},
		},
		edit: function(props) {
			var attributes = props.attributes;

			return [
				el(editor.InspectorControls,
					{},
					el(components.PanelBody,
						{
							title: i18n.__('Accordion Group Settings'),
							className: 'accordion-group-settings'
						},
						el(components.ToggleControl, {
							label: i18n.__('Apply Default Styles'),
							checked: attributes.applyStyles,
							onChange: function(value) {
								props.setAttributes({
									applyStyles: value,
								});
							},
							help: function(checked) {
								return checked ? i18n.__('Accordions will use the plugins default styles.') : i18n.__('Accordions will not have any styles applied.');
							}
						}),
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

			var classes = [
				'c-accordion',
				'no-js',
				'js-accordion-block',
			];

			if (attributes.applyStyles) {
				classes.push('c-accordion--styled');
			}

			return (
				el('div',
					{
						className:             classes.join(' '),
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

(function(blocks, editor, i18n, element, components, _) {
	var el = element.createElement;

	blocks.registerBlockType('pb/accordion-item', {
		title: i18n.__('Accordion Item'),
		icon: el('svg',
			{
				width: 24,
				height: 24
			},
			el('path', {
				d: 'M16.93,8.93a1,1,0,0,1-.7-.29L12,4.41,7.9,8.51A1,1,0,0,1,6.49,7.1L12,1.59l5.64,5.64a1,1,0,0,1,0,1.41A1,1,0,0,1,16.93,8.93Z'
			}),
			el('path', {
				d: 'M12.07,22.35,6.42,16.71a1,1,0,0,1,1.42-1.42l4.23,4.23,4.09-4.1a1,1,0,0,1,1.42,1.42Z'
			}),
			el('path', {
				d: 'M17.93,13H5.82a1,1,0,0,1,0-2H17.93a1,1,0,0,1,0,2Z'
			}),
		),
		category: 'formatting',
		parent: [
			'pb/accordion'
		],
		supports: {
			anchor: true,
		},
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: '.c-accordion__title',
			},
			content: {
				type: 'array',
				source: 'children',
				selector: '.c-accordion__content',
			},
			initiallyOpen: {
				type: 'boolean',
				default: false
			},
			headingLevel: {
				type: 'number',
				default: 2,
			},
			uuid: {
				type: 'number'
			}
		},
		edit: function(props) {
			var attributes = props.attributes;

			return [
				el(editor.InspectorControls,
					{},
					el(components.PanelBody,
						{
							title: i18n.__('Accordion Item Settings'),
							className: 'accordion-item-settings'
						},
						el(components.ToggleControl, {
							label: i18n.__('Open By Default'),
							checked: attributes.initiallyOpen,
							onChange: function(value) {
								props.setAttributes({
									initiallyOpen: value,
								});
							}
						}),
						el(components.RangeControl, {
							label: i18n.__('Heading Level'),
							value: attributes.headingLevel,
							onChange: function(value) {
								props.setAttributes({
									headingLevel: value,
								});
							},
							min: 1,
							max: 6.
						}),
					),
				),
				el('div',
					{
						className: 'c-accordion__item',
					},
					el(editor.RichText, {
						className: 'c-accordion__title',
						tagName: 'h' + attributes.headingLevel,
						formattingControls: [
							'bold',
							'italic'
						],
						keepPlaceholderOnFocus: true,
						placeholder: i18n.__('Accordion item title...'),
						value: attributes.title,
						onChange: function(value) {
							props.setAttributes({
								title: value,
								uuid: attributes.uuid ? attributes.uuid : Math.floor(Math.random() * 100000) + 1
							});
						},
					}),
					el('div',
						{
							className: 'c-accordion__content',
							value: attributes.content,
							onChange: function(value) {
								props.setAttributes({
									content: value
								});
							},
						},
						el(editor.InnerBlocks, {}),
					),
				),
			];
		},
		save: function(props) {
			var attributes = props.attributes;

			var itemClasses = [
				'c-accordion__item',
				'js-accordion-item'
			];

			var contentClasses = [
				'c-accordion__content'
			];

			if (attributes.initiallyOpen) {
				contentClasses.push('is-open');
			}

			var contentStyles = {};

			if (!attributes.initiallyOpen) {
				contentStyles.display = 'none';
			}

			return (
				el('div',
					{
						className: itemClasses.join(' '),
						'data-initially-open': attributes.initiallyOpen
					},
					el(editor.RichText.Content, {
						id: 'at-' + attributes.uuid,
						className: 'c-accordion__title',
						tagName: 'h' + attributes.headingLevel,
						tabIndex: 0,
						role: 'tab',
						'aria-controls': attributes.uuid,
						value: attributes.title
					}),
					el('div',
						{
							id: 'ac-' + attributes.uuid,
							className: contentClasses.join(' '),
							style: contentStyles,
							role: 'tabpanel',
							'aria-labelledby': 'at-' + attributes.uuid,
						},
						el(editor.InnerBlocks.Content, {})
					),
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

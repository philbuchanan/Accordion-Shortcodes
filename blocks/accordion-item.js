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
				d: 'M2,4v6H4V20H20V10h2V4ZM18,18H6V10H18ZM20,8H4V6H20Z'
			})
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

			var contentClasses = [
				'c-accordion__content'
			];

			if (attributes.initiallyOpen) {
				contentClasses.push('is-open');
			}

			return (
				el('div',
					{
						className: 'c-accordion__item',
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

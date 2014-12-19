<?php

// Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcode_Tinymce_Extensions')) :

class Accordion_Shortcode_Tinymce_Extensions {

	function __construct() {
		add_action('admin_init', array($this, 'button_hooks'));
	}
	
	public function button_hooks() {
		 if ((current_user_can('edit_posts') || current_user_can('edit_pages')) && get_user_option('rich_editing')) {
			add_filter('mce_external_plugins', array($this, 'add_tinymce_plugin'));
			add_filter('mce_buttons', array($this, 'register_buttons'));
		}
	}
	
	public function register_buttons($buttons) {
		$newButtons = array(
			'AccordionShortcode',
			'AccordionItemShortcode'
		);
		array_splice($buttons, 12, 0, $newButtons);
		
		return $buttons;
	}
	
	public function add_tinymce_plugin($plugin_array) {
		$plugin_array['accordionShortcodesExtensions'] = plugins_url('accordion-shortcodes/tinymce/tinymce-plugin.js');
		
		return $plugin_array;
	}

}

endif;
<?php

// Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcode_Tinymce_Extensions')) :

class Accordion_Shortcode_Tinymce_Extensions {

	/**
	 * Class constructor
	 * Adds the button hooks when the admin panel initializes.
	 */
	function __construct() {
		add_action('admin_init', array($this, 'button_hooks'));
		
		foreach(array('post.php','post-new.php') as $hook) {
			add_action("admin_head-$hook", array($this, 'admin_head'));
		}
	}
	
	
	
	/**
	 * Load the plugin and register the buttons
	 */
	public function button_hooks() {
		if ((current_user_can('edit_posts') || current_user_can('edit_pages')) && get_user_option('rich_editing')) {
			add_filter('mce_external_plugins', array($this, 'add_tinymce_plugin'));
			add_filter('mce_buttons', array($this, 'register_buttons'));
		}
	}
	
	
	
	/**
	 * Register the accordion shortcodes buttons plugin
	 */
	public function add_tinymce_plugin($plugin_array) {
		$plugin_array['accordionShortcodesExtensions'] = plugins_url('accordion-shortcodes/tinymce/tinymce-plugin.js');
		
		return $plugin_array;
	}
	
	
	
	/**
	 * Register the accordion shortcode buttons
	 */
	public function register_buttons($buttons) {
		$newButtons = array(
			'AccordionShortcode',
			'AccordionItemShortcode'
		);
		
		// Place the buttons before the "insert more" button
		array_splice($buttons, 12, 0, $newButtons);
		
		return $buttons;
	}
	
	
	
	/**
	 * Localize MCE buttons and labels
	 */
	public function admin_head() {
		$translations_arr = array(
			'group_button_label'         => __('Add an accordion group', 'accordion_shortcodes'),
			'group_window_title'         => __('Insert Accordion Shortcode', 'accordion_shortcodes'),
			'group_auto_close_label'     => __('Auto Close Accordions', 'accordion_shortcodes'),
			'group_open_first_label'     => __('Open First Accordion', 'accordion_shortcodes'),
			'group_open_all_label'       => __('Open All Accordions', 'accordion_shortcodes'),
			'group_click_to_close_label' => __('Click to Close Accordions', 'accordion_shortcodes'),
			'group_scroll_label'         => __('Scroll to Top of Accordion', 'accordion_shortcodes'),
			'group_html_tag_label'       => __('HTML Tag for Title', 'accordion_shortcodes'),
			'item_button_label'          => __('Add an accordion item', 'accordion_shortcodes'),
			'item_window_title'          => __('Insert Accordion Item Shortcode', 'accordion_shortcodes'),
			'item_title_label'           => __('Accordion Item Title', 'accordion_shortcodes'),
			'item_id_label'              => __('ID (optional)', 'accordion_shortcodes'),
			'item_notes'                 => __('Each ID on a single page must be unique and cannot contain spaces.', 'accordion_shortcodes')
		);
		
		foreach($translations_arr as $key => $value) {
			$translations[] = "'$key': '$value'";
		}
		
		if (defined('AS_COMPATIBILITY') && AS_COMPATIBILITY) {
			$prefix = 'as-';
		}
		else {
        	$prefix = '';
		} ?>
		
		<script type="text/javascript">
			var accordionShortcodesTranslations = {
					<?php echo implode(',', $translations); ?>
				},
				accordionShortcodesPrefix = '<?php echo $prefix; ?>';
		</script>
	<?php }

}

endif;
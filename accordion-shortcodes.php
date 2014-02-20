<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Adds a few shortcodes to allow for accordion dropdowns.
 * Version: 1.2.1
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

# Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcodes')) :

class Accordion_Shortcodes {

	static $add_script;
	
	function __construct() {
	
		$basename = plugin_basename(__FILE__);
		
		# Load text domain
		load_plugin_textdomain('accordion_shortcodes', false, dirname($basename) . '/languages/');
		
		# Register JavaScript
		add_action('wp_enqueue_scripts', array(__CLASS__, 'register_script'));
		
		# Add shortcodes
		add_shortcode('accordion', array(__CLASS__, 'accordion_shortcode'));
		add_shortcode('accordion-item', array(__CLASS__, 'accordion_item_shortcode'));
		
		# Print script in wp_footer
		add_action('wp_footer', array(__CLASS__, 'print_script'));
		
		# Add link to documentation
		add_filter("plugin_action_links_$basename", array(__CLASS__, 'add_documentation_link'));
	
	}
	
	# Checks for boolean value
	static function parse_boolean($value) {
	
		return filter_var($value, FILTER_VALIDATE_BOOLEAN);
	
	}
	
	# Registers the minified accordion JavaScript file
	static function register_script() {
	
		wp_register_script('accordion-shortcodes-script', plugins_url('accordion.min.js', __FILE__), array('jquery'), '1.2.1', true);
	
	}
	
	# Prints the minified accordion JavaScript file in the footer
	static function print_script() {
	
		# Check to see if shortcodes are used on page
		if (!self::$add_script) return;
		
		wp_enqueue_script('accordion-shortcodes-script');
	
	}
	
	# Accordion wrapper shortcode
	static function accordion_shortcode($atts, $content = null) {
	
		# The shortcode is used on the page, so we'll need to load the JavaScript
		self::$add_script = true;
		
		extract(shortcode_atts(array(
			'autoclose'    => true,
			'openfirst'    => false,
			'openall'      => false,
			'clicktoclose' => false
		), $atts));
		
		# Set settings object (for use in JavaScript)
		$script_data = array(
			'autoClose'    => self::parse_boolean($autoclose),
			'openFirst'    => self::parse_boolean($openfirst),
			'openAll'      => self::parse_boolean($openall),
			'clickToClose' => self::parse_boolean($clicktoclose)
		);
		wp_localize_script('accordion-shortcodes-script', 'accordionSettings', $script_data);
		
		return '<div class="accordion">' . do_shortcode($content) . '</div>';
	
	}
	
	# Accordion item shortcode
	static function accordion_item_shortcode($atts, $content = null) {
	
		extract(shortcode_atts(array(
			'title' => '',
			'tag' => 'h3'
		), $atts));
		
		return sprintf('<%3$s class="accordion-title">%1$s</%3$s><div class="accordion-content">%2$s</div>',
			$title ? $title : '<span style="color:red;">' . __('Please enter a title attribute: [accordion-item title="Item title"]', 'accordion_shortcodes') . '</span>',
			do_shortcode($content),
			$tag
		);
	
	}
	
	# Add documentation link on plugin page
	static function add_documentation_link($links) {
	
		array_push($links, sprintf('<a href="%s">%s</a>',
			'http://wordpress.org/plugins/accordion-shortcodes/',
			__('Documentation', 'accordion_shortcodes')
		));
		
		return $links;
	
	}

}

$Accordion_Shortcodes = new Accordion_Shortcodes;

endif;
<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Adds a few shortcodes to allow for accordion dropdowns.
 * Version: 1.0.2
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

if (!class_exists('Accordion_Shortcodes')) :

class Accordion_Shortcodes {

	static $add_script;
	
	function __construct() {
	
		add_action('wp_enqueue_scripts', array(__CLASS__, 'register_script'));
		
		add_shortcode('accordion', array(__CLASS__, 'accordion_shortcode'));
		add_shortcode('accordion-item', array(__CLASS__, 'accordion_item_shortcode'));
		
		add_action('wp_footer', array(__CLASS__, 'print_script'));
	
	}
	
	static function parse_boolean($value) {
	
		return filter_var($value, FILTER_VALIDATE_BOOLEAN);
	
	}
	
	static function register_script() {
	
		wp_register_script('accordion-shortcodes-script', plugins_url('accordion.js', __FILE__), array('jquery'), '1.0.2', true);
	
	}
	
	static function print_script() {
	
		if (!self::$add_script) return;
		
		wp_enqueue_script('accordion-shortcodes-script');
	
	}
	
	static function accordion_shortcode($atts, $content = null) {
	
		self::$add_script = true;
		
		extract(shortcode_atts(array(
			'autoclose' => true,
		), $atts));
		
		$script_data = array(
			'autoClose' => self::parse_boolean($autoclose)
		);
		wp_localize_script('accordion-shortcodes-script', 'accordionSettings', $script_data);
		
		return '<dl class="accordion">' . do_shortcode($content) . '</dl>';
	
	}
	
	static function accordion_item_shortcode($atts, $content = null) {
	
		extract(shortcode_atts(array(
			'title' => '',
			'tag' => 'h3'
		), $atts));
		
		return sprintf('<dt><%3$s>%1$s</%3$s></dt><dd>%2$s</dd>',
			$title ? $title : '<span style="color:red;">Please enter a title attribute: [accordion-item title="Item title"]</span>',
			do_shortcode($content),
			$tag
		);
	
	}

}

$Accordion_Shortcodes = new Accordion_Shortcodes;

endif;

?>
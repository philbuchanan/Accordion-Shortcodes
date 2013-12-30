<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Adds a few shortcodes to allow for accordion dropdowns.
 * Version: 1.0
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

class Accordion_Shortcodes {

	static $add_script;
	
	function __construct() {
	
		add_shortcode('accordion', array(__CLASS__, 'accordion_shortcode'));
		add_shortcode('accordion-item', array(__CLASS__, 'accordion_item_shortcode'));
		
		add_action('wp_footer', array(__CLASS__, 'load_script'));
	
	}
	
	static function load_script() {
	
		if (!self::$add_script) return;
		
		wp_enqueue_script('accordion-shortcodes-scripts', plugins_url('accordion.js', __FILE__), array('jquery'), '1.0', true);
	
	}
	
	static function accordion_shortcode($atts, $content = null) {
	
		self::$add_script = true;
		
		return '<dl class="accordion">' . do_shortcode($content) . '</dl>';
	
	}
	
	static function accordion_item_shortcode($atts, $content = null) {
	
		extract(shortcode_atts(array(
			'title' => '',
			'tag' => 'h3'
		), $atts));
		
		return sprintf('<dt><%3$s>%1$s</%3$s></dt><dd>%2$s</dd>',
			$title,
			do_shortcode($content),
			$tag
		);
	
	}

}

$Accordion_Shortcodes = new Accordion_Shortcodes;

?>
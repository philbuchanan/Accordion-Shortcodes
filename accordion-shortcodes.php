<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Adds a few shortcodes to allow for accordion dropdowns.
 * Version: 1.3.1
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

# Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcodes')) :

class Accordion_Shortcodes {

	private $add_script = false;
	private $tag = 'h3';
	
	function __construct() {
	
		$basename = plugin_basename(__FILE__);
		
		# Load text domain
		load_plugin_textdomain('accordion_shortcodes', false, dirname($basename) . '/languages/');
		
		# Register JavaScript
		add_action('wp_enqueue_scripts', array($this, 'register_script'));
		
		# Add shortcodes
		add_shortcode('accordion', array($this, 'accordion_shortcode'));
		add_shortcode('accordion-item', array($this, 'accordion_item_shortcode'));
		
		# Print script in wp_footer
		add_action('wp_footer', array($this, 'print_script'));
		
		# Add link to documentation
		add_filter("plugin_action_links_$basename", array($this, 'add_documentation_link'));
	
	}
	
	# Checks for boolean value
	private function parse_boolean($value) {
	
		return filter_var($value, FILTER_VALIDATE_BOOLEAN);
	
	}
	
	# Registers the minified accordion JavaScript file
	public function register_script() {
	
		$min = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		wp_register_script('accordion-shortcodes-script', plugins_url('accordion' . $min . '.js', __FILE__), array('jquery'), '1.3.1', true);
	
	}
	
	# Prints the minified accordion JavaScript file in the footer
	public function print_script() {
	
		# Check to see if shortcodes are used on page
		if (!$this -> add_script) return;
		
		wp_enqueue_script('accordion-shortcodes-script');
	
	}
	
	# Check for valid HTML tag
	private function check_html_tag($tag) {
	
		$tag = preg_replace('/\s/', '', $tag);
		$tags = array('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div');
		
		if (in_array($tag, $tags)) return $tag;
		else return 'h3';
	
	}
	
	# Accordion wrapper shortcode
	public function accordion_shortcode($atts, $content = null) {
	
		# The shortcode is used on the page, so we'll need to load the JavaScript
		$this -> add_script = true;
		
		extract(shortcode_atts(array(
			'tag'          => '',
			'autoclose'    => true,
			'openfirst'    => false,
			'openall'      => false,
			'clicktoclose' => false,
			'scroll'       => false
		), $atts, 'accordion'));
		
		# Set global tag
		if ($tag) $this -> tag = $this -> check_html_tag($tag);
		
		# Set settings object (for use in JavaScript)
		$script_data = array(
			'autoClose'    => $this -> parse_boolean($autoclose),
			'openFirst'    => $this -> parse_boolean($openfirst),
			'openAll'      => $this -> parse_boolean($openall),
			'clickToClose' => $this -> parse_boolean($clicktoclose),
			'scroll'       => $this -> parse_boolean($scroll)
		);
		wp_localize_script('accordion-shortcodes-script', 'accordionSettings', $script_data);
		
		return '<div class="accordion">' . do_shortcode($content) . '</div>';
	
	}
	
	# Accordion item shortcode
	public function accordion_item_shortcode($atts, $content = null) {
	
		extract(shortcode_atts(array(
			'title' => '',
			'tag'   => ''
		), $atts, 'accordion-item'));
		
		return sprintf('<%3$s class="accordion-title">%1$s</%3$s><div class="accordion-content">%2$s</div>',
			$title ? $title : '<span style="color:red;">' . __('Please enter a title attribute: [accordion-item title="Item title"]', 'accordion_shortcodes') . '</span>',
			do_shortcode($content),
			$tag ? $this -> check_html_tag($tag) : $this -> tag
		);
	
	}
	
	# Add documentation link on plugin page
	public function add_documentation_link($links) {
	
		array_push($links, sprintf('<a href="%s">%s</a>',
			'http://wordpress.org/plugins/accordion-shortcodes/',
			__('Documentation', 'accordion_shortcodes')
		));
		
		return $links;
	
	}

}

$Accordion_Shortcodes = new Accordion_Shortcodes;

endif;
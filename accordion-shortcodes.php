<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Adds a few shortcodes to allow for accordion dropdowns.
 * Version: 2.0.1
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

require_once('tinymce/tinymce.php');

# Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcodes')) :

class Accordion_Shortcodes {

	private $plugin_version = '2.0.1';
	private $add_script = false;
	
	private $wrapper_tag = 'div';
	private $title_tag   = 'h3';
	private $content_tag = 'div';
	
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
		
		# Add buttons to editor
		if (is_admin()) {
			$Accordion_Shortcode_Tinymce_Extensions = new Accordion_Shortcode_Tinymce_Extensions;
		}
	}
	
	# Registers the minified accordion JavaScript file
	public function register_script() {
		$min = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		wp_register_script('accordion-shortcodes-script', plugins_url('accordion' . $min . '.js', __FILE__), array('jquery'), $this -> plugin_version, true);
	}
	
	# Prints the minified accordion JavaScript file in the footer
	public function print_script() {
		# Check to see if shortcodes are used on page
		if (!$this -> add_script) return;
		
		wp_enqueue_script('accordion-shortcodes-script');
	}
	
	# Checks for boolean value
	private function parse_boolean($value) {
		return filter_var($value, FILTER_VALIDATE_BOOLEAN);
	}
	
	# Check for valid HTML tag
	private function check_html_tag($tag) {
		$tag = preg_replace('/\s/', '', $tag);
		$tags = array('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div');
		
		if (in_array($tag, $tags)) return $tag;
		else return $this -> title_tag;
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
			'scroll'       => false,
			'semantics'    => '',
			'class'        => ''
		), $atts, 'accordion'));
		
		# Set global HTML tag names
		if ($semantics == 'dl') {
			$this -> wrapper_tag = 'dl';
			$this -> title_tag   = 'dt';
			$this -> content_tag = 'dd';
		}
		
		if ($tag) $this -> title_tag = $this -> check_html_tag($tag);
		
		# Set settings object (for use in JavaScript)
		$script_data = array(
			'autoClose'    => $this -> parse_boolean($autoclose),
			'openFirst'    => $this -> parse_boolean($openfirst),
			'openAll'      => $this -> parse_boolean($openall),
			'clickToClose' => $this -> parse_boolean($clicktoclose),
			'scroll'       => $scroll
		);
		wp_localize_script('accordion-shortcodes-script', 'accordionSettings', $script_data);
		
		return sprintf('<%2$s class="accordion no-js%3$s">%1$s</%2$s>',
			do_shortcode($content),
			$this -> wrapper_tag,
			$class ? " $class" : ''
		);
	}
	
	# Accordion item shortcode
	public function accordion_item_shortcode($atts, $content = null) {
		extract(shortcode_atts(array(
			'title' => '',
			'id'    => '',
			'tag'   => '',
			'class' => ''
		), $atts, 'accordion-item'));
		
		return sprintf('<%4$s class="accordion-title%6$s"%3$s>%1$s</%4$s><%5$s class="accordion-content">%2$s</%5$s>',
			$title ? $title : '<span style="color:red;">' . __('Please enter a title attribute', 'accordion_shortcodes') . '</span>',
			do_shortcode($content),
			$id ? ' id="' . $id . '"' : '',
			$tag ? $this -> check_html_tag($tag) : $this -> title_tag,
			$this -> content_tag,
			$class ? " $class" : ''
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
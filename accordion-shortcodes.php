<?php
/**
 * Plugin Name: Accordion Shortcodes
 * Description: Shortcodes for creating responsive accordion drop-downs.
 * Version: 2.2
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

require_once('tinymce/tinymce.php');

// Make sure to not redeclare the class
if (!class_exists('Accordion_Shortcodes')) :

class Accordion_Shortcodes {

	/**
	 * Current plugin version number
	 */
	private $plugin_version = '2.2';
	
	
	
	/**
	 * Should the accordion JavaScript file be loaded the on the current page
	 * False by default
	 */
	private $load_script = false;
	
	
	
	/**
	 * Holds all the accordion shortcodes group settings
	 */
	private $script_data = array();
	
	
	
	/**
	 * ID count for each accordion group on a page
	 */
	private $id = 0;
	
	
	
	/**
	 * Holds the accordion group container HTML tag
	 */
	private $wrapper_tag = 'div';
	
	
	
	/**
	 * Holds the accordion item title HTML tag
	 */
	private $title_tag = 'h3';
	
	
	
	/**
	 * Holds the accordion item content container HTML tag
	 */
	private $content_tag = 'div';
	
	
	
	/**
	 * Class constructor
	 * Sets up the plugin, including: textdomain, adding shortcodes, registering
	 * scripts and adding buttons, help and documentation links to admin.
	 */
	function __construct() {
		$basename = plugin_basename(__FILE__);
		
		// Load text domain
		load_plugin_textdomain('accordion_shortcodes', false, dirname($basename) . '/languages/');
		
		// Register JavaScript
		add_action('wp_enqueue_scripts', array($this, 'register_script'));
		
		// Add shortcodes
		add_shortcode('accordion', array($this, 'accordion_shortcode'));
		add_shortcode('accordion-item', array($this, 'accordion_item_shortcode'));
		
		// Print script in wp_footer
		add_action('wp_footer', array($this, 'print_script'));
		
		if (is_admin()) {
			// Add link to documentation on plugin page
			add_filter("plugin_action_links_$basename", array($this, 'add_documentation_link'));
			
			// Add admin help tab
			add_action("load-{$GLOBALS['pagenow']}", array($this, 'add_admin_help_tab'));
			
			// Add buttons to MCE editor
			$Accordion_Shortcode_Tinymce_Extensions = new Accordion_Shortcode_Tinymce_Extensions;
		}
	}
	
	
	
	/**
	 * Registers the JavaScript file
	 * If SCRIPT_DEBUG is set to true in the config file, the un-minified
	 * version of the JavaScript file will be used.
	 */
	public function register_script() {
		$min = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
		wp_register_script('accordion-shortcodes-script', plugins_url('accordion' . $min . '.js', __FILE__), array('jquery'), $this->plugin_version, true);
	}
	
	
	
	/**
	 * Prints the accordion JavaScript in the footer
	 * This inlcludes both the accordion jQuery plugin file registered by
	 * 'register_script()' and the accordion settings JavaScript variable.
	 */
	public function print_script() {
		// Check to see if shortcodes are used on page
		if (!$this->load_script) return;
		
		wp_enqueue_script('accordion-shortcodes-script');
		
		// Output accordions settings JavaScript variable
		wp_localize_script('accordion-shortcodes-script', 'accordionShortcodesSettings', $this->script_data);
	}
	
	
	
	/**
	 * Checks if a value is boolean
	 *
	 * @param string $value The value to test
	 * return bool
	 */
	private function is_boolean($value) {
		return filter_var($value, FILTER_VALIDATE_BOOLEAN);
	}
	
	
	
	/**
	 * Check for valid HTML tag
	 * Checks the supplied HTML tag against a list of approved tags.
	 *
	 * @param string $tag The HTML tag to test
	 * return string A valid HTML tag
	 */
	private function check_html_tag($tag) {
		$tag = preg_replace('/\s/', '', $tag);
		$tags = array('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div');
		
		if (in_array($tag, $tags)) return $tag;
		else return $this->title_tag;
	}
	
	
	
	/**
	 * Accordion group shortcode
	 */
	public function accordion_shortcode($atts, $content = null) {
		// The shortcode is used on the page, so load the JavaScript
		$this->load_script = true;
		
		// Increment accordion counter
		$this->id++;
		
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
		
		// Set global HTML tag names
		// Set title HTML tag
		if ($tag) $this->title_tag = $this->check_html_tag($tag);
		else $this->title_tag = 'h3';
		
		// Set wrapper HTML tags
		if ($semantics == 'dl') {
			$this->wrapper_tag = 'dl';
			$this->title_tag   = 'dt';
			$this->content_tag = 'dd';
		}
		else {
			$this->wrapper_tag = 'div';
			$this->content_tag = 'div';
		}
		
		// Set settings object (for use in JavaScript)
		$script_data = array(
			'id'           => "accordion-$this->id",
			'autoClose'    => $this->is_boolean($autoclose),
			'openFirst'    => $this->is_boolean($openfirst),
			'openAll'      => $this->is_boolean($openall),
			'clickToClose' => $this->is_boolean($clicktoclose),
			'scroll'       => $scroll
		);
		
		// Add this shortcodes settings instance to the global script data array
		$this->script_data[] = $script_data;
		
		return sprintf('<%2$s id="%3$s" class="accordion no-js%4$s">%1$s</%2$s>',
			do_shortcode($content),
			$this->wrapper_tag,
			"accordion-$this->id",
			$class ? " $class" : ''
		);
	}
	
	
	
	/**
	 * Accordion item shortcode
	 */
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
			$tag ? $this->check_html_tag($tag) : $this->title_tag,
			$this->content_tag,
			$class ? " $class" : ''
		);
	}
	
	
	
	/**
	 * Add documentation link on plugin page
	 */
	public function add_documentation_link($links) {
		array_push($links, sprintf('<a href="%s">%s</a>',
			'http://wordpress.org/plugins/accordion-shortcodes/',
			_x('Documentation', 'link to documentation on wordpress.org site', 'accordion_shortcodes')
		));
		
		return $links;
	}
	
	
	
	/**
	 * Add admin help tab to edit pages and edit posts pages
	 */
	public function add_admin_help_tab() {
		$screen = get_current_screen();
		
		// If is post editor page or page editor page in admin
		if ($screen->id == 'post' || $screen->id == 'page') {
			$content[] = '<p>' . __('It is recommended that you use the accordion group and accordion item shortcode buttons to insert pre-formatted shortcodes. Your [accordion-items] should be nested inside an [accordion]...[/accordion] block.', 'accordion_shortcodes') . '</p>';
			$content[] = '<p>' . __('You can set custom accordion settings on the opening [accordion] shortcode to change the behaviour of your accordion. Some of the settings you can add are: autoclose, openfirst, openall, clicktoclose, and scroll (set each equal to "true" or "false"). You can also change the default HTML tag for the accordion titles or add a custom CSS classname.', 'accordion_shortcodes') . '</p>';
			$content[] = '<p><a href="https://wordpress.org/plugins/accordion-shortcodes/other_notes/" target="_blank">' . __('View the full accordion shortcodes plugin documentation', 'accordion_shortcodes') . '</a></p>';
			
			$screen->add_help_tab(array(
				'id'      => 'accordion_shortcodes_help',
				'title'   => _x('Accordion Shortcodes', 'plugin title, displays in admin help tab', 'accordion_shortcodes'),
				'content' => implode('', $content)
			));
		}
	}

}

$Accordion_Shortcodes = new Accordion_Shortcodes;

endif;
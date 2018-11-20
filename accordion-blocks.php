<?php

/**
 * Plugin Name: Accordion Blocks
 * Description: Gutenberg blocks (and shortcodes) for creating responsive accordion drop-downs.
 * Version: 3.0.0
 * Author: Phil Buchanan
 * Author URI: http://philbuchanan.com
 */

// Make sure to not redeclare the class
if (!class_exists('PB_Accordion_Blocks')) :

class PB_Accordion_Blocks {

	/**
	 * Current plugin version number
	 * Set from parent plugin file
	 */
	public $plugin_version;



	/**
	 * Class constructor
	 * Sets up the plugin, including: textdomain and registering scripts.
	 */
	function __construct() {
		$basename = plugin_basename(__FILE__);

		$this->plugin_version = $this->get_plugin_version();

		// Load text domain
		load_plugin_textdomain('accordion_shortcodes', false, dirname($basename) . '/languages/');

		// Register blocks JavaScript
		add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));

		// Register frontend JavaScript
		add_action('wp_enqueue_scripts', array($this, 'register_script'));

		//add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));


		if (is_admin()) {
			// Add link to documentation on plugin page
			add_filter("plugin_action_links_$basename", array($this, 'add_documentation_link'));
		}
	}



	/**
	 * Current plugin version number
	 */
	private function get_plugin_version() {
		$plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);

		return (defined('WP_DEBUG') && WP_DEBUG) ? time() : $plugin_data['Version'];
	}



	/**
	 * Enqueue the block's assets for the wp-admin editor
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'pb-accordion-blocks-editor-script',
			plugins_url('blocks/accordion.js', __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore'),
			$this->plugin_version
		);

		wp_enqueue_script(
			'pb-accordion-blocks-item-editor-script',
			plugins_url('blocks/accordion-item.js', __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore'),
			$this->plugin_version
		);

		wp_enqueue_style(
			'pb-accordion-blocks-editor-styles',
			plugins_url('assets/css/editor.css', __FILE__),
			array('wp-edit-blocks'),
			$this->plugin_version
		);
	}



	/**
	 * Enqueue the block's assets for the frontend
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'pb-accordion-blocks-frontend-styles',
			plugins_url('assets/css/style.css', __FILE__),
			array('wp-blocks'),
			$this->plugin_version
		);
	}



	/**
	 * Registers the frontend JavaScript file
	 */
	public function register_script() {
		wp_enqueue_script(
			'pb-accordion-blocks-frontend-script',
			plugins_url('js/accordion-blocks.js', __FILE__),
			array('jquery'),
			$this->plugin_version,
			true
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

}

$PB_Accordion_Blocks = new PB_Accordion_Blocks;

require_once('legacy/accordion-shortcodes.php');

endif;

=== Accordion Shortcodes ===
Contributors: philbuchanan
Tags: accordion, shortcodes
Donate link: http://philbuchanan.com/
Requires at least: 3.0
Tested up to: 3.8
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a few shortcodes to allow for accordion dropdowns.

== Description ==
Adds a few shortcodes to allow for accordion dropdowns.

Features:

* Adds two shortcodes for adding an accordion to your site
* No settings
* No default CSS added
* Only adds JavaScript on pages that use the shortcodes
* Set the HTML tag for the title element of each item

The two shortcodes that are added are:

`[accordion]` and `[accordion-item title=\"\" tag=\"\"]`

Usage example:

    [accordion]
    [accordion-item title=\"Title of accordion item\"]Dropdown content goes here.[/accordion-item]
    [accordion-item title=\"Second accordion item\"]Dropdown content goes here.[/accordion-item]
    [/accordion]

== Sample CSS ==

Here is some sample CSS to get you started if you want to customize the look and feel of the accordion.

    /* Accordion Styles */
    .accordion {border-bottom: 1px solid #dbdbdb;}
    .accordion dt {
        border-top: 1px solid #dbdbdb;
        padding: 15px 0;
        cursor: pointer;
    }
    .accordion dt:first-child {border: none;}
    .accordion dt.open {}
    .accordion dd {padding-bottom: 15px;}

== Installation ==
1. Upload \"accordion-shortcodes\" folder to the \"/wp-content/plugins/\" directory.
2. Activate the plugin through the \"Plugins\" menu in WordPress.
3. Add the shortcodes to your content.

== Changelog ==
= 1.0 =
* Initial release.

== Upgrade Notice ==
= 1.0 =
* Initial release.
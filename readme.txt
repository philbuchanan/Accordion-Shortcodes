=== Accordion Shortcodes ===
Contributors: philbuchanan
Author URI: http://philbuchanan.com/
Donate Link: http://philbuchanan.com/
Tags: accordion, accordions, shortcodes
Requires at least: 3.3
Tested up to: 3.8
Stable tag: 1.2.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a few shortcodes to allow for accordion dropdowns.

== Description ==
Adds a few shortcodes to allow for accordion dropdowns.

**NOTE:** If you are not comfortable with WordPress shortcodes, this plugin may not be for you.

= Features =

* Adds two shortcodes for adding an accordion to your site
* No default CSS added
* Only adds JavaScript on pages that use the shortcodes
* Set the HTML tag for the title element of each item (optional)
* Open the first accordion item by default (optional)
* Open all accordion items by default (optional)
* Disable auto closing of accordion items (optinoal)
* Manually close items by clicking the title again (optional)

= The Shortcodes =

The two shortcodes that are added are:

`[accordion]`

and

`[accordion-item title=""]`

= Basic Usage Example =

    [accordion]
    [accordion-item title="Title of accordion item"]Dropdown content goes here.[/accordion-item]
    [accordion-item title="Second accordion item"]Dropdown content goes here.[/accordion-item]
    [/accordion]

This will output the following HTML:

    <div class="accordion">
        <h3 class="accordion-title">Title of accordion item</h3>
        <div class="accordion-content">
            Dropdown content goes here.
        </div>
        <h3 class="accordion-title">Second accordion item</h3>
        <div class="accordion-content">
            Dropdown content goes here.
        </div>
    </div>

= Advanced Settings =

There are a few [advances settings](http://wordpress.org/plugins/accordion-shortcodes/other_notes/) for the plugin.

== Installation ==
1. Upload the 'accordion-shortcodes' folder to the '/wp-content/plugins/' directory.
2. Activate the plugin through the Plugins menu in WordPress.
3. Add the shortcodes to your content.
4. Add some [CSS](http://wordpress.org/plugins/accordion-shortcodes/other_notes/#Other-Notes) to your themes stylesheet to make the accordion look the way you want.

== Frequently Asked Questions ==

= Why isn't the JavaScript file loading on my site? =

This is most likely caused by a poorly coded theme. The plugin makes use of the `wp_footer()` function to load the JavaScript file and it's dependancy (jQuery). Check your theme to ensure that the `wp_footer()` function is being called right before the closing `</body>` tag in your themes footer.php file.

= How can I change the look of the accordion? =

No CSS is added by default to the accordion.

Changing the look and feel of the plugin requires you to be comfortable with editing your themes stylesheet. If you are familier with that process, you can add some [CSS](http://wordpress.org/plugins/accordion-shortcodes/other_notes/#Other-Notes) to make the accordion look the way you want.

== Other Notes ==

= Sample CSS =

Here is some sample CSS to get you started if you want to customize the look and feel of the accordion.

    /* Accordion Styles */
    .accordion {
    	border-bottom: 1px solid #dbdbdb;
    	margin-bottom: 20px;
    }
    .accordion-title {
        border-top: 1px solid #dbdbdb;
        margin: 0;
        padding: 20px 0;
        cursor: pointer;
    }
    .accordion-title:hover {}
    .accordion-title:first-child {border: none;}
    .accordion-title.open {cursor: default;}
    .accordion-content {padding-bottom: 20px;}

= Advanced Settings =

There are a few advanced settings you can add to the opening accordion shortcode. The full shortcode, with all the default settings looks like this:

    [accordion autoclose="true" openfirst="false" openall="false" clicktoclose="false"]

**autoclose**: Sets whether accordion items close automatically when you open the next item. Set `autoclose="true/false"` on the opening accordion tag like this: `[accordion autoclose="false"]`. Default is `true`.

**openfirst**: Sets whether the first accordion item is open by default. This setting will be overridden if **openall** is set to true. Set `openfirst="true/false"` on the opening accordion tag like this: `[accordion openfirst="true"]`. Default is `false`.

**openall**: Sets whether all accordion items are open by default. It is recommened that this setting be used with **clicktoclose**. Set `openall="true/false"` on the opening accordion tag like this: `[accordion openall="true"]`. Default is `false`.

**clicktoclose**: Sets whether clicking an open title closes it. Set `clicktoclose="true/false"` on the opening accordion tag like this: `[accordion clicktoclose="true"]`. Default is `false`.

You can also set the HTML tag for the titles of each item by added `tag="tagname"` to each `[accordion-item]` shortcode. Make sure to **not** include the angle brackets around the tag name. Example: to use `<h2>` instead of the default `<h3>` tag: `[accordion-item title="Item title" tag="h2"]Item content[/accordion-item]`

= Issues/Suggestions =

For bug reports or feature requests or if you'd like to contribute to the plugin you can check everything out on [Github](https://github.com/philbuchanan/Accordion-Shortcodes/).

== Changelog ==
= 1.2.1 =
* Added option to open all items by default

= 1.2 =
* Fixed a potential error with headers already being sent
* Fixed an issue with the SVN repo
* Code cleanup

= 1.1.1 =
* Added link to documentation from plugins page
* Added FAQs to readme

= 1.1 =
* **WARNING**: This update makes HTML structure changes and will require changes to your CSS
* New HTML structure, based on class names
* HTML now validates properly
* Added localization support for error messages

= 1.0.4 =
* Added option to close an open item by clicking the title

= 1.0.3 =
* Added option to open the first item by default
* Fixed an issue where clicking an already open item will close and reopen it
* Added better inline documentation
* Added minified JavaScript file

= 1.0.2 =
* Added setting to disable auto closing of accordion items
* Better handling of accordion items with no title attribute set
* Updated minimum WordPress version requirement (should still work down to 2.8, but not supported)

= 1.0.1 =
* Checks if the class exists before trying to create it
* Updated readme

= 1.0 =
* Initial release

== Upgrade Notice ==
= 1.2.1 =
Added option to open all items by default.

= 1.2 =
General code cleanup and bug fixes.

= 1.1.1 =
Added a link to plugin documentation from the plugins page for easy access.

= 1.1 =
**WARNING**: This update makes HTML structure changes and will require changes to your CSS.

= 1.0.4 =
Added an option to close an item by clicking the title.

= 1.0.3 =
Added an option to open the first item by default. Fixed a bug that caused open items to close and reopen when clicking them.

= 1.0.2 =
Added an option to disable auto closing of accordion items.

= 1.0.1 =
Minor code updates.

= 1.0 =
Initial release.
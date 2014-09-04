=== Accordion Shortcodes ===
Contributors: philbuchanan
Author URI: http://philbuchanan.com/
Donate Link: http://philbuchanan.com/
Tags: accordion, accordions, shortcodes
Requires at least: 3.3
Tested up to: 4.0
Stable tag: 2.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a few shortcodes to allow for accordion drop-downs.

== Description ==
Adds a few shortcodes to allow for accordion drop-downs.

**IMPORTANT:** If you are not comfortable with WordPress shortcodes, this plugin may not be for you. Additionally, you may want to be able to edit your themes main stylesheet in order to [add some custom CSS](http://wordpress.org/plugins/accordion-shortcodes/other_notes/#Other-Notes).

= Features =

* Adds two shortcodes for adding an accordion to your site
* Two buttons in the TinyMCE editor make it easy to add and configure the accordion shortcodes
* No default CSS added
* Only adds JavaScript on pages that use the shortcodes
* Support for item IDs and direct links
* Set the HTML tag for the title element (optional)
* Open the first accordion item by default (optional)
* Open all accordion items by default (optional)
* Disable auto closing of accordion items (optional)
* Manually close items by clicking the title again (optional)
* Scroll page to title when it's clicked open (optional)
* Change the semantic structure of your accordions (optional, advanced)

= The Shortcodes =

The two shortcodes that are added are:

`[accordion]`

and

`[accordion-item title=""]`

= Basic Usage Example =

    [accordion]
    [accordion-item title="Title of accordion item"]Drop-down content goes here.[/accordion-item]
    [accordion-item title="Second accordion item"]Drop-down content goes here.[/accordion-item]
    [/accordion]

This will output the following HTML:

    <div class="accordion">
        <h3 class="accordion-title">Title of accordion item</h3>
        <div class="accordion-content">
            Drop-down content goes here.
        </div>
        <h3 class="accordion-title">Second accordion item</h3>
        <div class="accordion-content">
            Drop-down content goes here.
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

This is most likely caused by a poorly coded theme. This plugin makes use of the `wp_footer()` function to load the JavaScript file and it's dependancy (jQuery). Check your theme to ensure that the `wp_footer()` function is being called right before the closing `</body>` tag in your themes footer.php file.

= How can I change the look of the accordion? =

No CSS is added by default to the accordion. The accordion should look fine with every theme.

That said, you can change the looking of the accordion as long as you are comfortable with editing your theme's stylesheet. If you are familiar with that process, you can add some [CSS](http://wordpress.org/plugins/accordion-shortcodes/other_notes/#Other-Notes) to make the accordion look the way you want.

= Can I use other shortcodes inside each accordion item? =

Absolutely! You can use any of the WordPress format settings and headings as well.

You cannot, however nest an accordion within another accordion. This is a limitation of how WordPress processes shortcodes.

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

= Opening an Accordion Via ID =

You can optionally add a unique ID to each of your accordion items and then use that ID in the URL to open that item by default. For example, say you have the following accordions:

    [accordion]
    [accordion-item id="item-1" title="Title of accordion item"]Drop-down content goes here.[/accordion-item]
    [accordion-item id="item-2" title="Second accordion item"]Drop-down content goes here.[/accordion-item]
    [accordion-item id="item-3" title="A Third accordion"]Drop-down content goes here.[/accordion-item]
    [/accordion]

You could use this URL to open the third item by default:

    http://yourdomain.com/your/path/#item-3

All you need to do is ensure that the part after the `#` in the URL matches the ID set on the accordion item.

= Advanced Settings =

There are a few advanced settings you can add to the opening accordion shortcode. The full shortcode, with all the default settings looks like this:

    [accordion autoclose="true" openfirst="false" openall="false" clicktoclose="false"]

**autoclose**: Sets whether accordion items close automatically when you open the next item. Set `autoclose="true/false"` on the opening accordion tag like this: `[accordion autoclose="false"]`. Default is `true`.

**openfirst**: Sets whether the first accordion item is open by default. This setting will be overridden if **openall** is set to true. Set `openfirst="true/false"` on the opening accordion tag like this: `[accordion openfirst="true"]`. Default is `false`.

**openall**: Sets whether all accordion items are open by default. It is recommended that this setting be used with **clicktoclose**. Set `openall="true/false"` on the opening accordion tag like this: `[accordion openall="true"]`. Default is `false`.

**clicktoclose**: Sets whether clicking an open title closes it. Set `clicktoclose="true/false"` on the opening accordion tag like this: `[accordion clicktoclose="true"]`. Default is `false`.

**scroll**: Sets whether to scroll to the title when it's clicked open. This is useful if you have a lot of content within your accordion items. Set `scroll="true/false"` on the opening accordion tag like this: `[accordion scroll="true"]`. Default is `false`. You may also specify an integer for a pixel offset if you'd like the page to scroll further (useful when the site uses a fixed position header navigation). NOTE: Only use pixel offset integers of > 0. If you do not want a scroll offset, but still want scrolling, simply use `scroll="true"`.

**class**: Sets a custom CSS class for the accordion group or individual accordion items. Set `class="your-class-name"` on the opening accordion or accordion-item shortcode like this: `[accordion class="your-class-name"]` or `[accordion-item class="your-class-name"]`. Added a class to the accordion-item will add the class to the title HTML tag.

**tag**: Set the global HTML tag to use for all accordion titles. Set `tag="h2"` on the opening accordion tag like this: `[accordion tag="h2"]`. Default is `h3`.

You can also set the HTML tag for the titles of each accordion item individually by adding `tag="tagname"` to each `[accordion-item]` shortcode. Make sure to **not** include the angle brackets around the tag name. Example: to use `<h2>` instead of the default `<h3>` tag: `[accordion-item title="Item title" tag="h2"]Item content[/accordion-item]`. Using a tag attribute on an individual accordion item will override the global setting. The list of valid tags is: h1, h2, h3, h4, h5, h6, p, div.

**semantics**: You can change the entire semantic structure of the accordions to use a definition list (dl, dt, dd) by setting `semantics="dl"` on the opening accordion tag like this: `[accordion semantics="dl"]`. By default the accordion will use `div` tags for the wrapper and content containers. If you set this option to `dl`, it is recommended that you do not also use the `tag` option. This feature is not selectable from the accordion button dialog box and must be added manually.

= Filtering Shortcodes =

You can filter the settings and content of the shortcodes by adding some simply code to the functions.php file of your theme.

For example, you could set the `openfirst` option for all accordions across the entire site using:

    add_filter('shortcode_atts_accordion', 'set_accordion_shortcode_defaults', 10, 3);
    function set_accordion_shortcode_defaults($atts) {
        // Override the openfirst setting here
        $atts['openfirst'] = true;
        return $atts;
    }

= Issues/Suggestions =

For bug reports or feature requests or if you'd like to contribute to the plugin you can check everything out on [Github](https://github.com/philbuchanan/Accordion-Shortcodes/).

= Additional Thanks =

Thank you to [dgrevink](https://github.com/dgrevink) for his support in developing the item IDs and direct linking feature.

== Screenshots ==

1. The Accordion Group and Accordion Item shortcode buttons in the editor
2. The Accordion Group shortcode insertion dialog box
3. The Accordion Item shortcode insertion dialog box

== Changelog ==
= 2.0.1 =
* NEW: Add a custom CSS classname to your accordion item group or accordion item shortcode
* NEW: Set an integer for scroll property to offset the scrolling by that many pixels 
* Now compatible up to WordPress 4.0

= 2.0 =
* NEW: Buttons in the editor to easily add shortcodes with various settings
* NEW: Support for item IDs on accordion items and direct linking to a specific item
* NEW: Change the entire semantic structure of your accordions by using definition lists
* ENHANCED: Class added if JavaScript is disabled (so you can style your accordions differently if necessary)
* ENHANCED: Each accordion now has its own unique ID (accordion-1, accordion-2...) so you can target each one on a page
* FIXED: A few incredibly small bugs/annoyances

== Upgrade Notice ==
= 2.0.1 =
WordPress 4.0 compatibility.

= 2.0 =
Big changes for version 2.0! See the [changelog](http://wordpress.org/plugins/accordion-shortcodes/changelog/) for details.
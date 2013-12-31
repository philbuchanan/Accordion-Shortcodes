=== Accordion Shortcodes ===
Contributors: philbuchanan
Tags: accordion, shortcodes
Donate link: http://philbuchanan.com/
Requires at least: 3.3
Tested up to: 3.8
Stable tag: 1.0.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a few shortcodes to allow for accordion dropdowns.

== Description ==
Adds a few shortcodes to allow for accordion dropdowns.

= Features =

* Adds two shortcodes for adding an accordion to your site
* No default CSS added
* Only adds JavaScript on pages that use the shortcodes
* Set the HTML tag for the title element of each item (optional)
* Disable auto closing of accordion items (optinoal)

= The Shortcodes =

The two shortcodes that are added are:

`[accordion]`

and

`[accordion-item title="" tag=""]`

= Usage Example =

    [accordion]
    [accordion-item title="Title of accordion item"]Dropdown content goes here.[/accordion-item]
    [accordion-item title="Second accordion item"]Dropdown content goes here.[/accordion-item]
    [/accordion]

This will output the following HTML:

    <dl class="accordion">
        <dt>
            <h3>Title of accordion item</h3>
        </dt>
        <dd>
            Dropdown content goes here.
        </dd>
        <dt>
            <h3>Second accordion item</h3>
        </dt>
        <dd>
            Dropdown content goes here.
        </dd>
    </dt>

= Auto Closing Accordion Items =

If you'd like to **not** have the accordion items close automatically when you open the next item simply set `autoclose="false"` on the opening accordion tag like this: `[accordion autoclose="false"]`

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
1. Upload the 'accordion-shortcodes' folder to the '/wp-content/plugins/' directory.
2. Activate the plugin through the Plugins menu in WordPress.
3. Add the shortcodes to your content.

== Changelog ==
= 1.0.2 =
* Added setting to disable auto closing of accordion items
* Better handling of accordion items with no title attribute set

= 1.0.1 =
* Minor code tweaks
* Updated readme

= 1.0 =
* Initial release.

== Upgrade Notice ==
= 1.0.2 =
* Added setting to disable auto closing of accordion items
* Better handling of accordion items with no title attribute set

= 1.0.1 =
* Minor code tweaks
* Updated readme

= 1.0 =
* Initial release
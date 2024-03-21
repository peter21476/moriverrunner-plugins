<?php
/**
 * Plugin Name:       MO Runner Media Content
 * Description:       MO Runner Media Content Block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Petros Charitopoulos
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mor-media-content
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function mor_media_content_mor_media_content_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'mor_media_content_mor_media_content_block_init' );

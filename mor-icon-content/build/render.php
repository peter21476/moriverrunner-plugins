<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="mor-icon-content">
	<div class="mor-icon-content__icon" style="background: <?php echo $attributes['background_color'] ?>">
		<img src="<?php echo ( $attributes['icon'] ); ?>" />
	</div>
	<div class="mor-icon-content__content">
		<h3><?php echo ( $attributes['title'] ); ?></h3>
		<p><?php echo ( $attributes['content'] ); ?></p>
	</div>
</div>

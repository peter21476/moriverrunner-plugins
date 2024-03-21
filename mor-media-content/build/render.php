<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<?php
	if (empty ($attributes['media_image'])) {

		$full_content = ' full-content';

	}
?>

<div class="mor-media-content <?php echo $attributes['media_content_width'] ?> <?php if($attributes['media_content_overlay']) {echo 'overlay-top';} ?> <?php if($attributes['media_content_overlay_bottom']) {echo 'overlay-bottom';} ?>">
	<div class="mor-media-content__inner" style="background: <?php echo $attributes['media_content_background_color'] ?>">
	<?php if ( ! empty ($attributes['media_image'])) : ?>
		<div class="mor-media-content__image <?php echo $attributes['media_image_position'] ?>">
			<img src="<?php echo $attributes['media_image']; ?>">
		</div>
	<?php endif; ?>
		<div class="mor-media-content__content<?php echo $full_content ?> pt-<?php echo $attributes['padding_top']; ?> pb-<?php echo $attributes['padding_bottom']; ?>">
			<div class="mor-media-content__content-inner " style="max-width: <?php echo $attributes['media_content_text_width'] ?>">
			<?php echo $content; ?>
			</div>
		</div>
	</div>
</div>

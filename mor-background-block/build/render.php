<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<?php

if($attributes['parallax_image']) {

	$parallax_image = ' parallax-image';
}

else {

	$parallax_image = '';

}

if($attributes['content_width'] === 'full' || $attributes['content_width'] === 'custom') {

	$content_width = 'container-fluid';

} else {

	$content_width = 'container';

}

if($attributes['content_width'] === 'custom') {

	$custom_width = 'max-width: ' . $attributes['custom_width'] . "px; margin: 0 auto;";

}

?>

<div class="mor-background pt-<?php echo $attributes['padding_top']; ?> pb-<?php echo $attributes['padding_bottom']; ?><?php echo $parallax_image; ?>">
	<?php if($attributes['background_color']) : ?>
		<div class="mor-background__color" style="background-color: <?php echo $attributes['background_color'] ?>; opacity: <?php echo $attributes['background_color_opacity']/100 ?>; z-index: <?php echo $attributes['background_color_order'] ?>"></div>
	<?php endif; ?>
	<?php if($attributes['background_image'] && !$attributes['parallax_image']) : ?>
		<div class="mor-background__image">
			<img src="<?php echo $attributes['background_image'] ?>" />
		</div>
		<?php elseif($attributes['background_image'] && $attributes['parallax_image']) : ?>
		<div class="mor-background__parallax" style="background-image: url(<?php echo $attributes['background_image'] ?>);"></div>
	<?php endif; ?>
	<div class="mor-background__content">
		<div class="<?php echo $content_width ?>" style="<?php echo $custom_width ?>">
			<div class="row">
				<div class="col-md-12">
					<?php echo $content; ?>
				</div>
			</div>
		</div>
	</div>
</div>

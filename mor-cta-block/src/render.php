<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>



<div class="mor-cta__wrapper <?php echo $attributes['align'] ?>">

<?php
	if ( $attributes['parallax_image'] ) : ?>
		<div class="mor-cta__parallax" style="background-image: url(<?php echo $attributes['backgroundImage']; ?>);"></div>
	<?php else : ?>
	<div class="mor-cta__image <?php echo $className ?>">
		<img src="<?php echo $attributes['backgroundImage']; ?>" />
	</div>
	<?php endif; ?>
	<div class="mor-cta__overlay" style="background: <?php echo $attributes['backgroundColor']; ?>; opacity: <?php echo $attributes['backgroundOpacity']; ?>"></div>

	<div class="mor-cta__content">
		<?php echo $content; ?>
	</div>

</div>

<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
	<div class="mor-slider__wrapper" style="background: <?php echo $attributes['backgroundColor'] ?>" >
		<h2><?php echo $attributes['blockTitle'] ?></h2>
		<div class="swiffy <?php echo $attributes['slider_type'] ?>-type" data-aos="<?php echo $attributes['animation'] ?>">
		<div class="swiffy-slider">
			<ul class="slider-container">
					<?php echo $content; ?>
				</ul>

				<button type="button" class="slider-nav"></button>
    			<button type="button" class="slider-nav slider-nav-next"></button>
			</div>
		</div>
	</div>

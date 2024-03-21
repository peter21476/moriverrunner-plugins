<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="mo-runner-hero <?php echo $attributes['header_style']; ?> <?php echo $attributes['header_alignment']; ?>" style="height: <?php echo $attributes['header_height'] ?>px">
	<div class="container h-100">
		<div class="row h-100">
			<div class="col-12 h-100">
				<div class="mo-runner-hero__content">
					<div class="mo-runner-hero__content__inner">
						<h1 class="mo-runner-hero__title"><?php echo $attributes['header_title']; ?></h1>
						<p class="mo-runner-hero__subtitle"><?php echo $attributes['header_subtitle']; ?></p>
						<?php echo $content; ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mo-runner-hero__background">
		<img src="<?php echo $attributes['header_background_image'] ?>" alt="Placeholder image">
	</div>
	<div class="mo-runner-hero__overlay" style="background: <?php

		if ($attributes['header_background_overlay_gradient']) {
			echo $attributes['header_background_overlay_gradient'];
		} else {
			echo $attributes['header_background_overlay_full'] . '; opacity: ' . $attributes['header_background_overlay_opacity']/100;

		}

		?>">
	</div>
</div>

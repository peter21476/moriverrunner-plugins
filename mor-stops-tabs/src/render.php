<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="mor-stops-tabs pt-<?php echo $attributes['padding_top']; ?> pb-<?php echo $attributes['padding_bottom']; ?>" style="background: <?php echo $attributes['background_color'] ?>">
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-2">
			<h2><?php echo $attributes['block_title'] ?></h2>
			<?php
				$posts = get_posts(
					[
						"numberposts" => $attributes['number_of_stops'],
						'post_type'=> 'stop',
					]
				);
			?>

			<ul class="mor-stops-tabs__tabs">
				<?php foreach ($posts as $post) : ?>
					<li data-id="<?php echo $post->ID; ?>">
						<?php echo $post->post_title; ?>
					</li>
				<?php endforeach; ?>
			</ul>

			</div>
			<div class="col-md-12 col-lg-10">
				<div class="mor-stops-tabs__stops">
					<?php foreach ($posts as $post) : ?>
						<div class="mor-stops-tabs__stop" data-id="<?php echo $post->ID; ?>">
							<div class="mor-stops-tabs__stop--content" data-id="<?php echo $post->ID; ?>">
								<h3><?php echo $post->post_title; ?></h3>
								<p><?php echo substr(get_the_excerpt($post), 0, 600); ?></p>
								<div class="mor-stops__cta">
									<a href="<?php echo get_the_permalink($post) ?>" class="mor-simple-btn">Learn More</a>
								</div>
							</div>
							<div class="mor-stops-tabs__image">
								<img src="<?php echo get_the_post_thumbnail_url($post->ID, 'full'); ?>" />
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</div>

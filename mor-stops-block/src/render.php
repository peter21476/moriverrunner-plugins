<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div class="mor-stops style-<?php echo $attributes['block_style'] ?>" style="background: <?php echo $attributes['background_color'] ?>">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h2 style="color: <?php echo $attributes['block_title_color'] ?>"><?php echo $attributes['block_title'] ?></h2>
			</div>
		</div>
		<div class="row mor-stops__row">
 <?php

 $posts = get_posts(
	[
		"numberposts" => $attributes['number_of_stops'],
		'post_type'=> 'stop',
	]
);

foreach($posts as $post) :
	setup_postdata($post);
	$the_title = get_the_title($post);
	$the_permalink = get_the_permalink($post);
	$featured_img_url = get_the_post_thumbnail_url($post->ID, 'full');
	$the_excerpt = get_the_excerpt($post);
echo <<<HTML
<div class="col-md-4 d-flex mb-4">
		<div class="mor-stops__stop flex-fill">
			<div class="mor-stops__image">
			<img src="$featured_img_url" />
			</div>
			<div class="mor-stops__content">
				<div class="mor-stops__name">
					<h3><a class="h3" href="$the_permalink">$the_title</a></h3>
					<p>$the_excerpt</p>
				</div>
				<div class="mor-stops__cta">
					<a href="$the_permalink" class="mor-simple-btn">Learn More</a>
				</div>
			</div>
		</div>
</div>
HTML;
endforeach;

wp_reset_postdata();

 ?>
 </div>
 </div>
</div>

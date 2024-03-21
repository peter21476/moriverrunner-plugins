<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<?php

$main_classes = '';

if ( $attributes['position_bottom'] === true ) {
	$main_classes .= 'mor-fairfinder--bottom';
}

?>
<div class="mor-fairfinder <?php echo $attributes['margin_top'] ?> <?php echo $main_classes ?>">
	<div class="container g-0">
		<div class="row g-0">
			<div class="col-12 g-0">
				<div id="farefinder"></div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="https://content.amtrak.com/content/statefarefinder/cdsamtrak/cds.js?id=101&v=1.1&c=farefinder"></script>

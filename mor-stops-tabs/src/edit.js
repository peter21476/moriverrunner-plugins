/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';

import {
	TextControl,
	Panel,
	PanelBody,
	SelectControl,
	__experimentalNumberControl as NumberControl
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	if (attributes.stops.length === 0) {

		getPosts();

	}

	function onChangeNumberOfStops(newNumberOfStops) {
		setAttributes({ number_of_stops: newNumberOfStops });
	}

	function updateBackgroundColor(backgroundColor) {
		setAttributes({ background_color: backgroundColor });
	}

	function onChangeTopPadding( newTopPadding ) {
		setAttributes( { padding_top: newTopPadding } );
	}

	function onChangeBottomPadding( newBottomPadding ) {
		setAttributes( { padding_bottom: newBottomPadding } );
	}

	function updateBlockTitle( newBlockTitle ) {
		setAttributes( { block_title: newBlockTitle } );
	}

	function getPosts() {
		let postsList = [];
		fetch(window.location.origin + `/wp-json/wp/v2/stop?page=${attributes.number_of_stops}&_embed`)
			.then((response) => response.json())
			.then((data) => {
				data.map((post) => {
					return postsList.push(post);
				});
				setAttributes({ stops: postsList });
			});
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={__("Block Title", "my-blocks")}>
						<TextControl
							label={__("Block Title", "my-blocks")}
							value={attributes.block_title}
							onChange={updateBlockTitle}
						/>
					</PanelBody>
					<PanelBody title={__("Number of Stops", "my-blocks")}>
						<NumberControl
							label={__("Number of Stops", "my-blocks")}
							value={attributes.number_of_stops}
							onChange={onChangeNumberOfStops}
						/>
					</PanelBody>
					<PanelBody title={__("Background Color", "my-blocks")}>
						<ColorPalette
							value={attributes.background_color}
							onChange={updateBackgroundColor}
							colors={[
								{ name: 'Black', color: '#000000' },
								{ name: 'White', color: '#ffffff' },
								{ name: 'Cream', color: '#F9F9F4' },
								{ name: 'Blue Light', color: '#1B95D2' },
								{ name: 'Blue Dark', color: '#00476B' },
							]}
						/>
					</PanelBody>
					<PanelBody title={ __( 'Padding' ) }>
					<SelectControl
							label="Top Padding"
							value={attributes.padding_top }
							options={ [
								{ label: 'Small', value: 'small' },
								{ label: 'Medium', value: 'medium'  },
								{ label: 'Large', value: 'large'  },
								{ label: 'Extra Large', value: "x-large"  },
							] }
							onChange={onChangeTopPadding}
							__nextHasNoMarginBottom
						/>
						<SelectControl
							label="Bottom Padding"
							value={attributes.padding_bottom }
							options={ [
								{ label: 'Small', value: 'small' },
								{ label: 'Medium', value: 'medium'  },
								{ label: 'Large', value: 'large'  },
								{ label: 'Extra Large', value: "x-large"  },
							] }
							onChange={onChangeBottomPadding}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className={`wp-block-my-blocks-stops pt-${attributes.padding_top} pb-${attributes.padding_bottom}`}>
				<div className="wp-block-my-blocks-stops__inner" style={{ backgroundColor: attributes.background_color }}>
					<h2>{attributes.block_title}</h2>
					{attributes.stops.map((stop) => {
						return (
							<div className="wp-block-my-blocks-stops__stop">
								<h2>{stop.title.rendered}</h2>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

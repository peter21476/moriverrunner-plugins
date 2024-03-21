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
	SelectControl,
	TextControl,
	Panel,
	PanelBody,
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

	function updateBlockTitle(newTitle) {
		setAttributes({ block_title: newTitle });
	}

	function updateBlockTitleColor(newColor) {
		setAttributes({ block_title_color: newColor });
	}

	function updateBlockStyle(newStyle) {
		setAttributes({ block_style: newStyle });
	}

	function getPosts() {
		let postsList = [];
		console.log(window.location.origin + `/wp-json/wp/v2/stop?page=${attributes.number_of_stops}&_embed`);
		fetch(window.location.origin + `/wp-json/wp/v2/stop?${attributes.number_of_stops}&_embed`)
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
				<PanelBody title={ __( 'Block Style' ) }>
					<SelectControl
						label="Block Style"
						value={ attributes.block_style }
						onChange={ updateBlockStyle }
						options={[
							{ label: 'Default', value: 'default' },
							{ label: 'Sidebar', value: 'sidebar' },
						]}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Block Settings' ) }>
					<TextControl
					label="Block Title"
					value={ attributes.block_title }
					onChange={ updateBlockTitle }
					/>
					<ColorPalette
						label={__("Title Color")}
						value={ attributes.block_title_color }
						onChange={ updateBlockTitleColor }
						colors={[
							{ name: 'Black', color: '#000000' },
							{ name: 'White', color: '#ffffff' },
							{ name: 'Cream', color: '#F9F9F4' },
							{ name: 'Blue Light', color: '#1B95D2' },
							{ name: 'Blue Dark', color: '#00476B' },
						]}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Number of Stops' ) }>
					<NumberControl
						label="Number of Stops"
						value={ attributes.number_of_stops }
						onChange={ onChangeNumberOfStops }
						min={ 1 }
						max={ 20 }
					/>
				</PanelBody>
				<PanelBody title={__("Background Settings")}>
					<ColorPalette
							label={__("Background Color")}
							value={ attributes.background_color }
							onChange={ updateBackgroundColor }
							colors={[
								{ name: 'Black', color: '#000000' },
								{ name: 'White', color: '#ffffff' },
								{ name: 'Cream', color: '#F9F9F4' },
								{ name: 'Blue Light', color: '#1B95D2' },
								{ name: 'Blue Dark', color: '#00476B' },
							]}
						/>
				</PanelBody>
			</InspectorControls>
			<div className={`mor-stops style-${attributes.block_style}`} style={{backgroundColor: attributes.background_color}}>
				{attributes.stops.map((item) => (
						<div className="mor-stops__stop">
							<h2 style={{color: attributes.block_title_color}}>{attributes.block_title}</h2>
							<div
								className="mor-stops__image"
								style={{ background: `url(${item.fimg_url})` }}
							></div>
							<div className="mor-stops__title">
								<h3>{item.title.rendered}</h3>
							</div>
							<div className="mor-stops__excerpt">
								{item.excerpt.rendered}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

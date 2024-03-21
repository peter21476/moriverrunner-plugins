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
import { useBlockProps, InspectorControls, ColorPalette, useInnerBlocksProps, InnerBlocks, MediaUpload } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	SelectControl,
	Button,
	CheckboxControl
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

	function updateBackgroundColor(backgroundColor) {
		setAttributes({ backgroundColor: backgroundColor });
	}

	function updateBackgroundImage(backgroundImage) {
		setAttributes({ backgroundImage: backgroundImage.sizes.full.url });
	}

	function updateBackgroundOpacity(backgroundOpacity) {
		setAttributes({ backgroundOpacity: backgroundOpacity });
	}

	function updateBackgroundOverlay(backgroundOverlay) {
		setAttributes({ backgroundOverlay: backgroundOverlay });
	}

	function updateParallaxImage(parallaxImage) {
		setAttributes({ parallax_image: parallaxImage });

	}

	function resetImage() {
		setAttributes({ backgroundImage: null });
	}

	const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/list', 'core/button',  'core/buttons', 'create-block/mor-fairfinder'];

	const innerBlocksProps = useInnerBlocksProps(
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: [['core/heading', 'core/paragraph', 'core/list', 'core/button', 'core/buttons' , 'create-block/mor-fairfinder']],
		},
	);


	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={__("Background Settings")}>
						<ColorPalette
								label={__("Background Color")}
								value={ attributes.backgroundColor }
								onChange={ updateBackgroundColor }
								colors={[
									{ name: 'Black', color: '#000000' },
									{ name: 'White', color: '#ffffff' },
									{ name: 'Cream', color: '#F9F9F4' },
									{ name: 'Blue Light', color: '#1B95D2' },
									{ name: 'Blue Dark', color: '#00476B' },
								]}
							/>
						<MediaUpload
							onSelect={updateBackgroundImage}
							type="image"
							value={attributes.backgroundImage}
							render={({ open }) => (
								<Button onClick={open} isDefault isLarge>
									{__("Select Background Image")}
								</Button>
							)}
						/>
						<CheckboxControl
							label={__("Parallax Effect")}
							onChange={updateParallaxImage}
							checked={attributes.parallax_image}
						/>
						<div>
							<img src={attributes.backgroundImage} alt="Selected Media" />
							<Button onClick={resetImage}>Reset Image</Button>
						</div>
						<CheckboxControl
							label={__("Enable Background Overlay")}
							onChange={updateBackgroundOverlay}
							checked={attributes.backgroundOverlay}
						/>
						{attributes.backgroundOverlay && (
							<SelectControl
								label={__("Background Opacity")}
								value={attributes.backgroundOpacity}
								onChange={updateBackgroundOpacity}
								options={[
									{ label: __("10%", "mytheme-blocks"), value: "0.1" },
									{ label: __("20%", "mytheme-blocks"), value: "0.2" },
									{ label: __("30%", "mytheme-blocks"), value: "0.3" },
									{ label: __("40%", "mytheme-blocks"), value: "0.4" },
									{ label: __("50%", "mytheme-blocks"), value: "0.5" },
									{ label: __("60%", "mytheme-blocks"), value: "0.6" },
									{ label: __("70%", "mytheme-blocks"), value: "0.7" },
									{ label: __("80%", "mytheme-blocks"), value: "0.8" },
									{ label: __("90%", "mytheme-blocks"), value: "0.9" },
								]}
							/>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className={`mor-cta__wrapper ${attributes.align}`}>
				{attributes.backgroundImage && (
					<div
						className="mor-cta__image">
							<img src={attributes.backgroundImage} alt="Selected Media" />
						</div>
				)}
				{attributes.backgroundOverlay && (
					<div
						className="mor-cta__overlay"
						style={{
							backgroundColor: attributes.backgroundColor,
							opacity: attributes.backgroundOpacity,
						}}
					></div>
				)}
				<div className="mor-cta__content">
					<InnerBlocks {...innerBlocksProps} />
				</div>
			</div>
		</div>
	);
}

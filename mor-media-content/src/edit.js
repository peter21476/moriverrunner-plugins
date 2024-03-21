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
import { useBlockProps, InspectorControls, useInnerBlocksProps, InnerBlocks, MediaUpload, ColorPalette } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	__experimentalNumberControl as NumberControl,
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

	function updateMediaImage(image) {
		setAttributes({ media_image: image.sizes.full.url });
	}

	function updateMediaContentWidth(width) {
		setAttributes({ media_content_width: width });
	}

	function updateMediaBackgroundColor(color) {
		setAttributes({ media_content_background_color: color });
	}

	function updateMediaContentOverlay(checked) {
		setAttributes({ media_content_overlay: checked });
	}

	function updateMediaContentOverlayBottom(checked) {
		setAttributes({ media_content_overlay_bottom: checked });
	}

	function updateMediaPosition(position) {
		setAttributes({ media_image_position: position });
	}

	function updateMediaContentTextWidth(width) {
		setAttributes({ media_content_text_width: width });

	}

	function onChangeTopPadding( newTopPadding ) {
		setAttributes( { padding_top: newTopPadding } );
	}

	function onChangeBottomPadding( newBottomPadding ) {
		setAttributes( { padding_bottom: newBottomPadding } );
	}

	function resetImage() {
		setAttributes({ media_image: null });
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title="Media Image">
						<MediaUpload
							onSelect={updateMediaImage}
							allowedTypes={["image"]}
							value={attributes.media_image}
							render={({ open }) => (
								<Button onClick={open} 										className="editor-media-placeholder__button is-button is-default is-large">Select Image</Button>
							)}
						/>
						<div>
							<img src={attributes.media_image} alt="Selected Media" />
							<Button onClick={resetImage}>Reset Image</Button>
						</div>
						<SelectControl
								label="Image Position"
								value={attributes.media_image_position }
								options={ [
									{ label: 'Left', value: 'left' },
									{ label: 'Right', value: 'right' },
								] }
								onChange={updateMediaPosition}
								__nextHasNoMarginBottom
							/>
					</PanelBody>
					<PanelBody title="Media Content">
							<SelectControl
								label="Content Width"
								value={attributes.media_content_width }
								options={ [
									{ label: 'Full', value: 'full' },
									{ label: 'Wide', value: 'container' },
								] }
								onChange={updateMediaContentWidth}
								__nextHasNoMarginBottom
							/>
							<SelectControl
								label="Text Width"
								value={attributes.media_content_text_width }
								options={ [
									{ label: '25%', value: '25%' },
									{ label: '50%', value: '50%' },
									{ label: '75%', value: '75%' },
									{ label: '100%', value: '100%' },
								] }
								onChange={updateMediaContentTextWidth}
								__nextHasNoMarginBottom
							/>
						<ColorPalette
							label="Background Color"
							value={attributes.media_content_background_color}
							onChange={updateMediaBackgroundColor}
							colors={[
								{ name: 'Black', color: '#000000' },
								{ name: 'White', color: '#ffffff' },
								{ name: 'Cream', color: '#F9F9F4' },
								{ name: 'Blue Light', color: '#1B95D2' },
								{ name: 'Blue Dark', color: '#00476B' },
							]}
						/>
						<CheckboxControl
							label="Content Overlay at Top"
							checked={attributes.media_content_overlay}
							onChange={updateMediaContentOverlay}
						/>
						<CheckboxControl
							label="Content Overlay at Bottom"
							checked={attributes.media_content_overlay_bottom}
							onChange={updateMediaContentOverlayBottom}
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
			<div className={`mor-media-content ${attributes.media_content_width}`} style={{background: attributes.media_content_background_color}}>
				<div className="mor-media-content__inner">
					<div className={`mor-media-content__image ${attributes.media_image_position}`}>
						<img src={attributes.media_image} alt="Selected Media" />
					</div>
					<div className={`mor-media-content__content pt-${attributes.padding_top} pb-${attributes.padding_bottom}`}>
						<div className="mor-media-content__content-inner" style={{maxWidth: attributes.media_content_text_width}}>
							<InnerBlocks />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

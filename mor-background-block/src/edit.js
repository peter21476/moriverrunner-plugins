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

	function onChangeTopPadding( newTopPadding ) {
		setAttributes( { padding_top: newTopPadding } );
	}

	function onChangeBottomPadding( newBottomPadding ) {
		setAttributes( { padding_bottom: newBottomPadding } );
	}

	function updateBkgColor(value) {
		setAttributes({ background_color: value });
	}

	function updateBkgImage(value) {
		setAttributes({ background_image: value.sizes.full.url });
	}

	function resetImage() {
		setAttributes({ background_image: null });
	}

	function updateParallaxImage(value) {

		setAttributes({ parallax_image: value });

	}

	function updateContentWidth(value) {
		setAttributes({ content_width: value });

	}

	function updateOverlay(value) {
		setAttributes({ background_color_opacity: parseInt(value) });
	}

	function updateCustomWidth(value) {
		setAttributes({ custom_width: value });
	}

	function updateBackgroundColorOrder(value) {
		setAttributes({ background_color_order: parseInt(value) });

	}

	const innerBlocksProps = useInnerBlocksProps();

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Content Width' ) }>
						<SelectControl
							label="Content Width"
							value={attributes.content_width}
							options={ [
								{ label: 'Wide', value: 'wide' },
								{ label: 'Full', value: 'full'  },
								{ label: 'Custom', value: 'custom'  },
							] }
							onChange={updateContentWidth}
							__nextHasNoMarginBottom
						/>
						{attributes.content_width === 'custom' && (
							<SelectControl
								label="Custom Width"
								value={attributes.custom_width}
								options={ [
									{ label: 'Small', value: '330' },
									{ label: 'Medium', value: '500'  },
									{ label: 'Large', value: '800'  },
									{ label: 'X-Large', value: '1200'  },
								] }
								onChange={updateCustomWidth}
								__nextHasNoMarginBottom
							/>
						)}
					</PanelBody>
					<PanelBody title={ __( 'Background Color' ) }>
						<ColorPalette
							value={ attributes.background_color }
							colors={[
								{ name: 'Black', color: '#000000' },
								{ name: 'White', color: '#ffffff' },
								{ name: 'Cream', color: '#F9F9F4' },
								{ name: 'Blue Light', color: '#1B95D2' },
								{ name: 'Blue Dark', color: '#00476B' },
							]}
							onChange={ updateBkgColor }
						/>
						<NumberControl
							isShiftStepEnabled={true}
							className="blocks-base-control__input"
							onChange={updateOverlay}
							shiftStep={10}
							max={100}
							value={attributes.background_color_opacity}
							label={"Color Opacity"}
						/>
						<NumberControl
							isShiftStepEnabled={true}
							className="blocks-base-control__input"
							onChange={updateBackgroundColorOrder}
							shiftStep={1}
							max={10}
							value={attributes.background_color_order}
							label={"Background Color Order"}
						/>
					</PanelBody>
					<PanelBody title={ __( 'Background Image' ) }>
						<MediaUpload
							onSelect={ updateBkgImage }
							type="image"
							value={ attributes.background_image }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									Open Media Library
								</Button>
							) }
						/>
						<Button onClick={ resetImage }>
							Reset Image
						</Button>
					</PanelBody>
					<PanelBody title={ __( 'Parallax Image' ) }>
						<CheckboxControl
                            label="Make Parallax"
                            help="Parallax is a scrolling effect that makes the image appear to move slower than the content around it."
                            checked={ attributes.parallax_image }
                            onChange={ updateParallaxImage }
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
			<div className={`mor-background content-width-${attributes.content_width} pt-${attributes.padding_top} pb-${attributes.padding_bottom}`}>
				<div className="mor-background__color" style={{background: attributes.background_color, opacity: attributes.background_color_opacity / 100, zIndex: attributes.background_color_order}}></div>
				<div className="mor-background__image">
					<img src={attributes.background_image} alt="" />
				</div>
				<div className="mor-background__content" style={{width: attributes.content_width + '%'}}>
					<InnerBlocks { ...innerBlocksProps } />
				</div>
			</div>
		</div>
	);
}

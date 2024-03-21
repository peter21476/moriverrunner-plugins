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
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	InnerBlocks,
	MediaUpload,
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	__experimentalNumberControl as NumberControl,
	GradientPicker
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

	function updateTitle(newTitle) {
		setAttributes({ header_title: newTitle })
	}

	function updateSubtitle(newSubtitle) {
		setAttributes({ header_subtitle: newSubtitle })
	}

	function updateImage(newImage) {
		setAttributes({ header_background_image: newImage.sizes.full.url })
	}

	function updateOverlayColorGradient(newColor) {
		setAttributes({ header_background_overlay_gradient: newColor })
	}

	function updateOverlayColorFull(newColor) {
		setAttributes({ header_background_overlay_full: newColor })
	}

	function updateHeaderAlignment(newAlignment) {
		setAttributes({ header_alignment: newAlignment })
	}

	function updateHeaderHeightStyle(newStyle) {
		setAttributes({ header_style: newStyle })
	}

	function updateHeaderHeight (newHeight) {
		setAttributes({ header_height: newHeight })
	}

	function updateOverlayOpacity (newOpacity) {
		setAttributes({ header_background_overlay_opacity: newOpacity })
	}

	function resetImage() {
		setAttributes({ header_background_image: null });
	}

	const ALLOWED_BLOCKS = ['core/buttons', 'create-block/mor-fairfinder'];

	const innerBlocksProps = useInnerBlocksProps(
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: [['core/buttons', 'create-block/mor-fairfinder']],
		},
	);

	const overlayStyle = {
		background: attributes.header_background_overlay_gradient ?  attributes.header_background_overlay_gradient : attributes.header_background_overlay_full,
		opacity: attributes.header_background_overlay_full ? attributes.header_background_overlay_opacity / 100 : ''
	  };

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title="Header Title / Subtitle">
						<TextControl
							className="blocks-base-control__input"
							label={"Title"}
							value={attributes.header_title}
							onChange={updateTitle}
						/>
						<TextControl
							className="blocks-base-control__input"
							label={"Subtitle"}
							value={attributes.header_subtitle}
							onChange={updateSubtitle}
						/>
					</PanelBody>
					<PanelBody title="Background Image">
						<MediaUpload
								onSelect={updateImage}
								type="image"
								value={attributes.header_background_image}
								render={({ open }) => (
									<Button
										onClick={open}
										icon="upload"
										className="editor-media-placeholder__button is-button is-default is-large"
									>
										Background Image
									</Button>
								)}
							/>
							<div>
								<img src={attributes.header_background_image} alt="Selected Media" />
								<Button onClick={resetImage}>Reset Image</Button>
							</div>
							<SelectControl
								label="Height Style"
								value={attributes.header_style }
								options={ [
									{ label: 'Full Height', value: 'full-height' },
									{ label: 'Custom Height', value: 'custom-height' },
								] }
								onChange={updateHeaderHeightStyle}
								__nextHasNoMarginBottom
							/>
							{attributes.header_style === 'custom-height' && (
								<NumberControl
								isShiftStepEnabled={true}
								className="blocks-base-control__input"
								onChange={updateHeaderHeight}
								shiftStep={100}
								max={1000}
								value={attributes.header_height}
								label={"Header Height"}
								/>
							)}
							<SelectControl
								label="Header Alignment"
								value={attributes.header_alignment }
								options={ [
									{ label: 'Left', value: 'left' },
									{ label: 'Center', value: 'center' },
								] }
								onChange={updateHeaderAlignment}
								__nextHasNoMarginBottom
							/>
					</PanelBody>
					<PanelBody title="Overlay Color">
						<ColorGradientControl
							colorValue={ attributes.header_background_overlay_full }
							gradientValue={ attributes.header_background_overlay_gradient }
							onColorChange={ updateOverlayColorFull }
							onGradientChange={ updateOverlayColorGradient }
							colors={ [
								{ name: 'Blue Dark', color: '#00476B' },
								{ name: 'Blue Light', color: '#1B95D2' },
								{ name: 'Cream', color: '#F9F9F4' },
								{ name: 'White', color: '#fff' },
								{ name: 'Black Light', color: '#302b2c' },
								{ name: 'Black', color: '#000' },
							] }
							gradients={ [
								{
									name: 'Dark Blue To Transparent',
									gradient:
										'linear-gradient(270deg,#00476B 50%, rgba(0,0,0, 0) 0%)',
									slug: 'blue-dark-transparent',
								},
								{
									name: 'Light Blue To Transparent',
									gradient:
										'linear-gradient(270deg,#1B95D2 50%, rgba(0,0,0, 0) 0%)',
									slug: 'blue-light-transparent',
								},
								{
									name: 'Cream To Transparent',
									gradient:
										'linear-gradient(270deg,#F9F9F4 50%, rgba(0,0,0, 0) 0%)',
									slug: 'cream-transparent',
								},
							] }
						/>
						{attributes.header_background_overlay_gradient === null || attributes.header_background_overlay_gradient === undefined && (
							<NumberControl
							isShiftStepEnabled={true}
							className="blocks-base-control__input"
							onChange={updateOverlayOpacity}
							shiftStep={10}
							max={100}
							value={attributes.header_background_overlay_opacity}
							label={"Overlay Opacity"}
							/>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className={`mo-runner-hero ${attributes.header_style} ${attributes.header_alignment}`} style={{height: attributes.header_height}}>
				<div className='mo-runner-hero__content'>
					<div className='mo-runner-hero__content__inner'>
						<h1 className='mo-runner-hero__title'>{attributes.header_title}</h1>
						<h2 className='mo-runner-hero__subtitle'>{attributes.header_subtitle}</h2>
						<InnerBlocks {...innerBlocksProps} />
					</div>
				</div>
				<div className='mo-runner-hero__background' >
					<img src={attributes.header_background_image} alt="Selected Media" />
				</div>
				<div className='mo-runner-hero__overlay' style={overlayStyle}></div>
			</div>
		</div>
	);
}

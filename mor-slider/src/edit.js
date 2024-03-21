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
import { useBlockProps, InspectorControls, ColorPalette, useInnerBlocksProps, } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	TextControl,
	SelectControl,
} from "@wordpress/components";

import Splide from '@splidejs/splide';

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
		setAttributes({ blockTitle: newTitle });
	}

	function updatebackgroundColor(newColor) {
		setAttributes({ backgroundColor: newColor });
	}

	function updateSliderType(newSliderType) {
        setAttributes({ slider_type: newSliderType });
    }

	const ALLOWED_BLOCKS = ['create-block/mor-slide'];

	const innerBlocksProps = useInnerBlocksProps(
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: [['create-block/mor-slide']],
		},
	);


	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody title="Slide Settings">
						<TextControl
							label="Title"
							value={attributes.blockTitle}
							onChange={updateTitle}
						/>
						<ColorPalette
							label="Background Color"
							value={attributes.backgroundColor}
							onChange={updatebackgroundColor}
							colors={[
								{ name: 'Blue', color: '#113070' },
								{ name: 'Blue Light', color: '#4b69a6' },
								{ name: 'Blue Dark', color: '#041c4e' },
								{ name: 'Gold', color: '#dfb14f' },
								{ name: 'Gold Light', color: '#f3dcaa' },
								{ name: 'Black', color: '#1a1a1a' },
								{ name: 'Gray', color: '#757575' },
							]}
						/>
					</PanelBody>
					<PanelBody title="Slider Type">
						<SelectControl
							label="Type"
							value={ attributes.slider_type }
							options={ [
								{ label: 'Testimonials', value: 'testimonials' },
								{ label: 'Clients', value: 'clients' },
								{ label: 'Generic 01', value: 'generic01' },
							] }
							onChange={ updateSliderType }
							__nextHasNoMarginBottom
						/>
                    </PanelBody>
				</Panel>
			</InspectorControls>
			<div className="mor-slider__wrapper" style={{backgroundColor: attributes.backgroundColor}}>
				<div class="swiffy-slider">
				<ul class="slider-container" {...innerBlocksProps}></ul>
				</div>
			</div>
		</div>
	);
}

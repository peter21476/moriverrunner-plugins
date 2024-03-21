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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	SelectControl,
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

	function updateMarginTop( value ) {
		setAttributes( { margin_top: value } );
	}

	function updateMarginBottom( value ) {
		setAttributes( { margin_bottom: value } );
	}

	function updatePositionBottom( value ) {
		setAttributes( { position_bottom: value } );
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Margin Top', 'gutenberg-examples' ) }>
						<SelectControl
							label={ __( 'Margin Top', 'gutenberg-examples' ) }
							value={ attributes.margin_top }
							options={ [
								{ label: __( 'None', 'gutenberg-examples' ), value: 'none' },
								{ label: __( 'Small', 'gutenberg-examples' ), value: 'small' },
								{ label: __( 'Medium', 'gutenberg-examples' ), value: 'medium' },
								{ label: __( 'Large', 'gutenberg-examples' ), value: 'large' },
							] }
							onChange={ updateMarginTop }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Margin Bottom', 'gutenberg-examples' ) }>
						<SelectControl
							label={ __( 'Margin Bottom', 'gutenberg-examples' ) }
							value={ attributes.margin_bottom }
							options={ [
								{ label: __( 'None', 'gutenberg-examples' ), value: 'none' },
								{ label: __( 'Small', 'gutenberg-examples' ), value: 'small' },
								{ label: __( 'Medium', 'gutenberg-examples' ), value: 'medium' },
								{ label: __( 'Large', 'gutenberg-examples' ), value: 'large' },
							] }
							onChange={ updateMarginBottom }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Position Bottom', 'gutenberg-examples' ) }>
						<CheckboxControl
							label={ __( 'Position Bottom', 'gutenberg-examples' ) }
							checked={ attributes.position_bottom }
							onChange={ updatePositionBottom }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className={ `margin-top-${ attributes.margin_top } margin-bottom-${ attributes.margin_bottom }` }>
				<p>{ __( 'This is the Fairfinder Block. To preview the block visit the front end.', 'gutenberg-examples' ) }</p>
			</div>
		</div>
	);
}

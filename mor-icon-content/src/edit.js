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
import { useBlockProps, InspectorControls, ColorPalette, InnerBlocks, MediaUpload } from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	TextControl,
	TextareaControl
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

	function updateBackgroundColor( color ) {
		setAttributes( { background_color: color } );

	}

	function UpdateIcon( icon ) {
		setAttributes( { icon: icon.sizes.full.url } );

	}

	function UpdateContent( content ) {
		setAttributes( { content: content } );

	}

	function updateTitle( title ) {
		setAttributes( { title: title } );

	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Background Color' ) }>
						<ColorPalette
							value={ attributes.background_color }
							onChange={ updateBackgroundColor }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Icon' ) }>
						<MediaUpload
							onSelect={ UpdateIcon }
							type="image"
							value={ attributes.icon }
							render={ ( { open } ) => (
								<button onClick={ open }>
									Open Media Library
								</button>
							) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Title' ) }>
						<TextControl value={ attributes.title } onChange={ updateTitle } />
					</PanelBody>
					<PanelBody title={ __( 'Content' ) }>
						<TextareaControl value={ attributes.content } onChange={ UpdateContent } />
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="mor-icon-content">
				<div className="mor-icon-content__icon" style={{ backgroundColor: attributes.background_color }}>
					<img src={ attributes.icon } />
				</div>
				<div className="mor-icon-content__content">
					<h3>{ attributes.title }</h3>
					<p>{ attributes.content }</p>
				</div>
			</div>
		</div>
	);
}

/**
 * External dependencies
 */
require( 'dotenv' ).config();
const { USER_KEY, USER_SECRET, API_PATH } = process.env;

/**
 * Internal dependencies
 */
 const {
	HTTPClientFactory,
} = require( '@woocommerce/api' );

const httpClient = HTTPClientFactory
	.build( API_PATH )
	.withBasicAuth( USER_KEY, USER_SECRET )
	.withIndexPermalinks()
	.create();

const createProducts = ( products ) => httpClient.post( '/wc/v3/products/batch', { create: products } );
const createProductCategory = ( data ) => httpClient.post( '/wc/v3/products/categories', data );
const createProductAttribute = ( name ) => httpClient.post( '/wc/v3/products/attributes', { name } );
const createProductAttributeTerms = ( parentId, termNames ) => httpClient.post(
	`/wc/v3/products/attributes/${ parentId }/terms/batch`,
	{
		create: termNames.map( name => ( { name } ) )
	}
);

const createSampleCategories = async () => {
	const { data: clothing } = await createProductCategory( { name: 'Clothing' } );
	const { data: accessories } = await createProductCategory( { name: 'Accessories', parent: clothing.id } );
	const { data: hoodies } = await createProductCategory( { name: 'Hoodies', parent: clothing.id } );
	const { data: tshirts } = await createProductCategory( { name: 'Tshirts', parent: clothing.id } );
	const { data: decor } = await createProductCategory( { name: 'Decor' } );
	const { data: music } = await createProductCategory( { name: 'Music' } );

	return {
		clothing,
		accessories,
		hoodies,
		tshirts,
		decor,
		music,
	}
};

const createSampleAttributes = async () => {
	const { data: color } = await createProductAttribute( 'Color' );
	const { data: size } = await createProductAttribute( 'Size' );
	await createProductAttributeTerms( color.id, [ 'Blue', 'Gray', 'Green', 'Red', 'Yellow' ] );
	await createProductAttributeTerms( size.id, [ 'Large', 'Medium', 'Small' ] );

	return {
		color,
		size,
	}
};

const createSampleSimpleProducts = async ( categories, attributes ) => {
	const description = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. '
		+ 'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. '
		+ 'Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\n';

	await createProducts( [ 
		{ 
			name: 'Beanie with Logo', 
			date_created_gmt: '2021-09-28T15:50:20', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'Woo-beanie-logo', 
			price: '18', 
			regular_price: '20', 
			sale_price: '18', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.2', 
			dimensions: { length: '6', width: '4', height: '1' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.accessories.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Red' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 62, 63, 61, 60 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'T-Shirt with Logo', 
			date_created_gmt: '2021-09-28T15:50:20', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'Woo-tshirt-logo', 
			price: '18', 
			regular_price: '18', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.5', 
			dimensions: { length: '10', width: '12', height: '0.5' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.tshirts.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Gray' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 59, 67, 66, 56 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Single', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple, virtual product.</p>\n', 
			sku: 'woo-single', 
			price: '2', 
			regular_price: '3', 
			sale_price: '2', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: true, 
			downloadable: true, 
			downloads: [ 
				{ 
					id: '2579cf07-8b08-4c25-888a-b6258dd1f035', 
					name: 'Single', 
					file: 'https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/single.jpg' 
				} 
			], 
			download_limit: 1, 
			download_expiry: 1, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '', 
			dimensions: { length: '', width: '', height: '' }, 
			shipping_required: false, 
			shipping_taxable: false, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.music.id } ], 
			tags: [], 
			attributes: [], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 68 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Album', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple, virtual product.</p>\n', 
			sku: 'woo-album', 
			price: '15', 
			regular_price: '15', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: true, 
			downloadable: true, 
			downloads: [ 
				{ 
					id: 'cc10249f-1de2-44d4-93d3-9f88ae629f76', 
					name: 'Single 1', 
					file: 'https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/single.jpg' 
				}, 
				{ 
					id: 'aea8ef69-ccdc-4d83-8e21-3c395ebb9411', 
					name: 'Single 2', 
					file: 'https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/album.jpg' 
				} 
			], 
			download_limit: 1, 
			download_expiry: 1, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '', 
			dimensions: { length: '', width: '', height: '' }, 
			shipping_required: false, 
			shipping_taxable: false, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.music.id } ], 
			tags: [], 
			attributes: [], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 69 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Polo', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-polo', 
			price: '20', 
			regular_price: '20', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.8', 
			dimensions: { length: '6', width: '5', height: '1' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.tshirts.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Blue' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 59, 56, 66, 76 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Long Sleeve Tee', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-long-sleeve-tee', 
			price: '25', 
			regular_price: '25', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '1', 
			dimensions: { length: '7', width: '5', height: '1' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.tshirts.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Green' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 59, 56, 76, 67 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Hoodie with Zipper', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: true, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-hoodie-with-zipper', 
			price: '45', 
			regular_price: '45', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '2', 
			dimensions: { length: '8', width: '6', height: '2' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.hoodies.id } ], 
			tags: [], 
			attributes: [], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 57, 58 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Hoodie with Pocket', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: true, 
			catalog_visibility: 'hidden', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-hoodie-with-pocket', 
			price: '35', 
			regular_price: '45', 
			sale_price: '35', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '3', 
			dimensions: { length: '10', width: '8', height: '2' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.hoodies.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Gray' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 65, 57, 58 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Sunglasses', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: true, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-sunglasses', 
			price: '90', 
			regular_price: '90', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.2', 
			dimensions: { length: '4', width: '1.4', height: '1' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.accessories.id } ], 
			tags: [], 
			attributes: [], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 60, 62, 77, 61 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Cap', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: true, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-cap', 
			price: '16', 
			regular_price: '18', 
			sale_price: '16', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.6', 
			dimensions: { length: '8', width: '6.5', height: '4' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.accessories.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Yellow' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 60, 77, 61, 63 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Belt', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-belt', 
			price: '55', 
			regular_price: '65', 
			sale_price: '55', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '1.2', 
			dimensions: { length: '12', width: '2', height: '1.5' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.accessories.id } ], 
			tags: [], 
			attributes: [], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 63, 77, 62, 60 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Beanie', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-beanie', 
			price: '18', 
			regular_price: '20', 
			sale_price: '18', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: true, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.2', 
			dimensions: { length: '4', width: '5', height: '0.5' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.accessories.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Red' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 63, 62, 61, 77 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'T-Shirt', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-tshirt', 
			price: '18', 
			regular_price: '18', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '0.8', 
			dimensions: { length: '8', width: '6', height: '1' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.tshirts.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Gray' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 67, 76, 56, 66 ], 
			stock_status: 'instock' 
		}, 
		{ 
			name: 'Hoodie with Logo', 
			date_created_gmt: '2021-09-28T15:50:19', 
			type: 'simple', 
			status: 'publish', 
			featured: false, 
			catalog_visibility: 'visible', 
			description,
			short_description: '<p>This is a simple product.</p>\n', 
			sku: 'woo-hoodie-with-logo', 
			price: '45', 
			regular_price: '45', 
			sale_price: '', 
			date_on_sale_from_gmt: null, 
			date_on_sale_to_gmt: null, 
			on_sale: false, 
			purchasable: true, 
			total_sales: 0, 
			virtual: false, 
			downloadable: false, 
			downloads: [], 
			download_limit: 0, 
			download_expiry: 0, 
			external_url: '', 
			button_text: '', 
			tax_status: 'taxable', 
			tax_class: '', 
			manage_stock: false, 
			stock_quantity: null, 
			backorders: 'no', 
			backorders_allowed: false, 
			backordered: false, 
			low_stock_amount: null, 
			sold_individually: false, 
			weight: '2', 
			dimensions: { length: '10', width: '6', height: '3' }, 
			shipping_required: true, 
			shipping_taxable: true, 
			shipping_class: '', 
			shipping_class_id: 0, 
			reviews_allowed: true, 
			average_rating: '0.00', 
			rating_count: 0, 
			upsell_ids: [], 
			cross_sell_ids: [], 
			parent_id: 0, 
			purchase_note: '', 
			categories: [ { id: categories.hoodies.id } ], 
			tags: [], 
			attributes: [ 
				{ 
					id: attributes.color.id,
					position: 0, 
					visible: true, 
					variation: false, 
					options: [ 'Blue' ] 
				} 
			], 
			default_attributes: [], 
			variations: [], 
			grouped_products: [], 
			menu_order: 0, 
			related_ids: [ 57, 65 ], 
			stock_status: 'instock' 
		} 
	] );
};

const createSampleExternalProducts = async ( categories ) => {
	await createProducts( [
		{
			name: 'WordPress Pennant',
			date_created_gmt: '2021-09-28T15:50:20',
			type: 'external',
			status: 'publish',
			featured: false,
			catalog_visibility: 'visible',
			description:
				'<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. '
				+ 'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. '
				+ 'Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\n',
			short_description: '<p>This is an external product.</p>\n',
			sku: 'wp-pennant',
			price: '11.05',
			regular_price: '11.05',
			sale_price: '',
			date_on_sale_from_gmt: null,
			date_on_sale_to_gmt: null,
			on_sale: false,
			purchasable: false,
			total_sales: 0,
			virtual: false,
			downloadable: false,
			downloads: [],
			download_limit: 0,
			download_expiry: 0,
			external_url: 'https://mercantile.wordpress.org/product/wordpress-pennant/',
			button_text: 'Buy on the WordPress swag store!',
			tax_status: 'taxable',
			tax_class: '',
			manage_stock: false,
			stock_quantity: null,
			backorders: 'no',
			backorders_allowed: false,
			backordered: false,
			low_stock_amount: null,
			sold_individually: false,
			weight: '',
			dimensions: { length: '', width: '', height: '' },
			shipping_required: true,
			shipping_taxable: true,
			shipping_class: '',
			shipping_class_id: 0,
			reviews_allowed: true,
			average_rating: '0.00',
			rating_count: 0,
			upsell_ids: [],
			cross_sell_ids: [],
			parent_id: 0,
			purchase_note: '',
			categories: [ { id: categories.decor.id } ],
			tags: [],
			attributes: [],
			default_attributes: [],
			variations: [],
			grouped_products: [],
			menu_order: 0,
			related_ids: [],
			stock_status: 'instock'
		}
	] );
};

const createSampleData = async () => {
	const categories = await createSampleCategories();
	const attributes = await createSampleAttributes();

	await createSampleSimpleProducts( categories, attributes );
	await createSampleExternalProducts( categories );
};
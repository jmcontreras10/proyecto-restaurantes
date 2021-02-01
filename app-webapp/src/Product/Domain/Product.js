/**
 * This method returns the Product Object
 * @param {Integer} id 
 * @param {String} productName 
 * @param {Integer} productType 
 * @param {String} productImage 
 */
const Product = (id, productName, productType, productImage) => {
  return {
    id: id,
    productName: productName,
    productImage: productImage,
    productType: productType,
  };
};

export default Product;

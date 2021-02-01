const Product = (
  id,
  productName,
  productType,
  productCategory,
  productImage
) => {
  return {
    id: id,
    productName: productName,
    productType: productType,
    productCategory: productCategory,
    productImage: productImage,
  };
};

module.exports = Product;

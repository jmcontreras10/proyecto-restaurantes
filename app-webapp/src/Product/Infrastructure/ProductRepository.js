import { requestSome } from "../../helpers/requests";
import Product from "../Domain/VOProduct";

const getAllProducts = async () => {
  const data = await requestSome("products", 0, 0, null);
  const products = [];
  data.products.forEach((element) => {
    products.push(
      new Product(
        element.id,
        element.productName,
        element.productType,
        element.productImage
      )
    );
  });
  return products;
};

export { getAllProducts };

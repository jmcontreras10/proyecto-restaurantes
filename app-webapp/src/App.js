//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getAllProducts } from "./Product/Infrastructure/ProductRepository";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="flex h-screen m-auto px-20 py-10">
      {loading ? (
        <button type="button" className="bg-rose-600 m-auto" disabled>
          <div
            className="animate-spin h-10 w-10 mr-3 bg-gray-800 m-auto"
            viewBox="0 0 24 24"
          ></div>
          <strong>Cargando...</strong>
        </button>
      ) : (
        <div>
          <p className="text-3xl">Productos</p>
          <div className="grid grid-flow-row grid-cols-4 grid-rows-3 gap-4">
            {products.length === 0 ? (
              <p>Lo sentimos, no hay productos disponibles :(</p>
            ) : (
              products.map((product, index) => (
                <div className="relative rounded-lg shadow-md" key={index}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="object-cover h-48 w-full"
                  ></img>
                  <br />
                  <div className="px-5 py-2">
                    <strong>
                      Nombre:
                      <br />
                    </strong>
                    {product.productName}
                    <br />
                    <strong>
                      Tipo:
                      <br />
                    </strong>
                    {product.productType}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

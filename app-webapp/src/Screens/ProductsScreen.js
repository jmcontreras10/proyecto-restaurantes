import { useState, useEffect } from "react";
import { getAllProducts } from "../Product/Infrastructure/ProductRepository";
import SectionGrid from "../UI/Components/SectionGrid";
import CartScreen from "./CartScreen";
import "../App.css";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((prods) => {
        setProducts(prods);
        setSelected(prods.map((prod) => 0));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  const onSomeSelected = () => {
    for (const sel of selected) {
      if (sel) {
        return (
          <div
            className={
              "bg-red-200 topShawow w-screen fixed bottom-0 left-0 px-20 py-10 flex justify-end"
            }
          >
            <button
              className={"bg-red-800 px-10 py-5 text-white rounded-lg"}
              onClick={() => setInCart(true)}
            >
              Añadir al carrito
            </button>
          </div>
        );
      }
    }
  };

  const getSelected = () => {
    const selectedOnes = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] !== 0)
        selectedOnes.push({ product: products[i], quantity: selected[i] });
    }
    return selectedOnes;
  };

  const changeProduct = (index, type) => {
    let sel = [...selected];
    if (type === 0) sel[index] = sel[index] + 1;
    else sel[index] = sel[index] - 1;
    setSelected(sel);
  };

  const onLoading = (callback) => {
    if (loading) {
      return (
        <button type="button" className="bg-rose-600 m-auto" disabled>
          <div
            className="animate-spin h-10 w-10 mr-3 bg-gray-800 m-auto"
            viewBox="0 0 24 24"
          ></div>
          <strong>Cargando...</strong>
        </button>
      );
    } else {
      if (error) {
        return <p>{error}</p>;
      } else {
        return callback();
      }
    }
  };

  const getGrid = (noError) => {
    return (
      <div>
        <p className="text-3xl mt-5 mb-10">Productos</p>
        <div className="flex flex-wrap">
          <SectionGrid
            products={products}
            selected={selected}
            changeProduct={changeProduct}
          />
        </div>
      </div>
    );
  };

  return inCart ? (
    <CartScreen
      selectedOnes={getSelected()}
      goBackHandler={() => setInCart(false)}
    />
  ) : (
    <div className="flex m-auto px-20 py-10 mb-32">
      {onLoading(getGrid)}
      {onSomeSelected()}
    </div>
  );
};

export default ProductScreen;

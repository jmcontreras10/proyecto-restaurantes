import "../App.css";
import NormalGrid from "../UI/Components/NormalGrid";

const CartScreen = (props) => {
  return (
    <div>
      <header
        className={
          "bg-red-200 shadow-xl w-screen fixed top-0 left-0 px-20 py-5 flex justify-start z-40 align-baseline"
        }
      >
        <button
          className={"bg-red-500 px-10 py-3 rounded-lg"}
          onClick={props.goBackHandler}
        >
          Volver
        </button>
        <p className="text-3xl px-5">
          Has seleccionado los siguientes productos
        </p>
      </header>
      <div className="flex flex-col px-20 mt-40 mb-60">
        <div className="flex m-auto flex-wrap">
          <NormalGrid products={props.selectedOnes} />
        </div>
      </div>
      <footer
        className={
          "bg-red-200 topShawow w-screen fixed bottom-0 left-0 px-20 py-10 flex justify-end"
        }
      >
        <button className={"bg-red-800 px-10 py-5 text-white rounded-lg"}>
          Ordenar
        </button>
      </footer>
    </div>
  );
};

export default CartScreen;

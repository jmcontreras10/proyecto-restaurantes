const SectionElement = (props) => {
  const product = props.product;
  const selected = props.selected;
  const index = props.index;

  const isSelectedColor = () => {
    return selected > 0 ? "bg-red-300" : "bg-yellow-50";
  };

  return (
    <div
      className={`relative rounded-lg shadow-md w-60 mx-5 mb-10 ${isSelectedColor()}`}
    >
      <div className="px-5 py-2">
        <img
          src={product.productImage}
          alt={product.name}
          className="object-cover h-48 w-full rounded-lg"
        ></img>
        <div className="py-4">
          <div className="flex flex-row h-12">
            <strong className="pr-2">Nombre: </strong>
            {product.productName}
          </div>
          {/*<div className="flex flex-row">
            <strong className="pr-2">Type: </strong>
            {product.type}
  </div>*/}
        </div>

        <div
          className={"flex flex-row justify-center content-center items-center"}
        >
          <button
            className={`bg-red-500 rounded-lg shadow-md px-5 py-2`}
            disabled={selected <= 0 ? true : false}
            onClick={() => props.changeProduct(index, 1)}
          >
            -
          </button>
          <strong>
            <p className={"bg-red-200 px-5 flex items-center py-1"}>
              {selected}
            </p>
          </strong>
          <button
            className={`bg-red-500 rounded-lg shadow-md px-5 py-2`}
            onClick={() => {
              props.changeProduct(index, 0);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionElement;

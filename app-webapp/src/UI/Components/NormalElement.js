const NormalElement = (props) => {
  const element = props.element;

  return (
    <div className="relative rounded-lg shadow-md w-60 mx-5 mb-10 bg-red-50">
      <div className="px-5 py-2 flex flex-col">
        <img
          src={element.product.productImage}
          alt={element.product.name}
          className="object-cover h-48 w-full rounded-lg"
        ></img>
        <div className="py-4">
          <div className="flex flex-row h-12">
            <strong className="pr-2">Nombre: </strong>
            {element.product.productName}
          </div>
          <div className="flex flex-row">
            <strong className="pr-2">Cantidad: </strong>
            {element.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalElement;

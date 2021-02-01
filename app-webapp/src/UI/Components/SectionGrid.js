import SectionElement from "./SectionElement";

const SectionGrid = (props) => {
  if (props.products.length === 0) {
    return <p>Lo sentimos, no hay productos disponibles :(</p>;
  }
  return props.products.map((product, index) => (
    <div key={index}>
      <SectionElement
        index={index}
        product={product}
        selected={props.selected[index]}
        changeProduct={props.changeProduct}
      />
    </div>
  ));
};

export default SectionGrid;

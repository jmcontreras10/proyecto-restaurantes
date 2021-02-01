import NormalElement from "./NormalElement";

const NormalGrid = (props) => {
  return props.products.map((element, index) => (
    <div key={index}>
      <NormalElement element={element} />
    </div>
  ));
};

export default NormalGrid;

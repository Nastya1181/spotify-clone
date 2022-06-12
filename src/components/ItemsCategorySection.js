export default function ItemsCategorySection(props) {
  return (
    <section className="items-category">
      <div className="items-category__wrapper">
        <h2 className="items-category__title title">{props.title}</h2>
        {props.children}
      </div>
    </section>
  );
}

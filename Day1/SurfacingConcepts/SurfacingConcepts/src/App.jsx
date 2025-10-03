const products = [
  {title : 'Orange', isFruit : true, id : 1},
  {title : 'apple', isFruit : true, id : 2},
  {title : 'banana', isFruit : false, id : 3},
];

//in js if u have {} you must return with any brackets or () it is fine to not to return it returns anywayss
export default function ShoppingList(){
  const listItems = products.map((product) => (
      <li 
      key={product.id}
      style={{color : product.isFruit? 'red' : 'green'}}
      >
        {product.title}
      </li>
    )
  );

   

  return(
    <>
      <ul>{listItems}</ul>
    </>
  )
}
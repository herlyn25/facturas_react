import React, {useState, useEffect} from "react";

export default function ProductTable() {
const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/invoice/show")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((data) => {
        const mappedProducts = data.items.map((item,index)=>({
            id:index+1,
            name:item.product.name,
            quantity: item.quantity,
            price: item.product.price,

        }))
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
 
  const totalGeneral = products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Lista de productos</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Nombre del Producto
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Cantidad
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Valor Total
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, quantity, price }) => (
            <tr key={id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {name}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {quantity}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                ${(quantity * price).toLocaleString()}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={2}
              style={{
                fontWeight: "bold",
                padding: "8px",
                borderTop: "2px solid #000",
              }}
            >
              Total
            </td>
            <td
              style={{
                fontWeight: "bold",
                padding: "8px",
                borderTop: "2px solid #000",
              }}
            >
              ${totalGeneral.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

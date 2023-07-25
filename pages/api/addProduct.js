import products from "./products.json";
import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("body is ", req.body);
      const { name, price, image_url, description, qty, filename, hash } =
        req.body;

      // Criar um novo ID do produto com base no último ID do produto
      const maxID = products.reduce(
        (max, product) => Math.max(max, product.id),
        0
      );
      products.push({
        id: maxID + 1,
        name,
        price,
        image_url,
        description,
        qty,
        filename,
        hash,
      });
      fs.writeFileSync(
        "./pages/api/products.json",
        JSON.stringify(products, null, 2)
      );
      res.status(200).send({ status: "ok" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "erro ao adicionar produto" });
      return;
    }
  } else {
    res.status(405).send(`Método ${req.method} não permitido`);
  }
}

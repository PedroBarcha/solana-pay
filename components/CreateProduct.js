import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../styles/CreateProduct.module.css";

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    qty: "",
  });
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);

  // Não adiciona ao IPFS, mas guarda o hash de um arquivo que já está lá
  async function onChange(e) {
    setUploading(true);
    try {
      setFile({ filename: e.target.value, hash: e.target.value });
    } catch (error) {
      console.log("Erro ao fazer upload do arquivo: ", error);
    }
    setUploading(false);
  }

  const createProduct = async () => {
    try {
      // Combine dados do produto e file.name
      const product = { ...newProduct, ...file };
      console.log("Enviando produto para api", product);
      const response = await fetch("../api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Produto adicionado!");
      } else {
        alert("Não foi possível adicionar o produto: ", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h1>Criar Produto</h1>
          </header>

          <div className={styles.form_container}>
            <div className={styles.flex_row}>
              <input
                type="url"
                className={styles.input}
                placeholder="Content (IPFS hash)"
                onChange={onChange}
              />
            </div>
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="url"
                placeholder="Thumbnail (IPFS hash)"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    image_url:
                      "https://cloudflare-ipfs.com/ipfs/" + e.target.value,
                  });
                }}
              />
            </div>
            {file.name != null && <p className="file-name">{file.filename}</p>}
            <input
              className={styles.input}
              type="url"
              placeholder="Product Name"
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="text"
                placeholder="0.01"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Quantidade de arquivos"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    qty: e.target.value,
                  });
                }}
              />
            </div>

            <textarea
              className={styles.text_area}
              placeholder="Descrição aqui..."
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                createProduct();
              }}
              disabled={uploading}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

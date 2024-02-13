import React, { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducerTypes";
import { useNewProductMutation } from "../../../redux/api/productsApi";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("autoglo");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]); 

  const [newProduct] = useNewProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
  
    const newPreviews: string[] = [];
    const newPhotos: { file: File; preview: string }[] = [];
  
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          newPreviews.push(reader.result);
          setPhotoPreviews(newPreviews);
        }
      };
  
      newPhotos.push({ file, preview: URL.createObjectURL(file) });
    }
  
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };
  

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !stock || !photos.length || !category || !brand) return;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    formData.append('category', category);
    formData.append('brand', brand);
    photos.forEach((photo, index) => {
      formData.append('photos', photo);
    });
  
    const res = await newProduct({ id: user?._id!, formData });
    responseToast(res, navigate, "/admin/product");
  };
  
  
  

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="autoglo">Autoglo</option>
                <option value="prolite">Prolite</option>
              </select>
            </div>

            <div>
              <label>Photos</label>
              <input
                type="file"
                required
                onChange={changeImageHandler}
                multiple // Allow multiple files
              />
            </div>

            {photoPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Image ${index}`} />
            ))}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;

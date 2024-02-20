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
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>(""); 
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [productModel, setProductModel] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [brand, setBrand] = useState<string>("autoglo");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [displayPhoto, setDisplayPhoto] = useState<File[]>([]);

  const [newProduct] = useNewProductMutation();
  const changeDisplayPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDisplayPhoto(file);
    }
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newPreviews: string[] = [];
    const newPhotos: File[] = [];

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

      newPhotos.push(file);
    }

    setPhotos(newPhotos); // Directly assign newPhotos to photos state
  };

  // const handleAddTag = () => {
  //   if (newTag.trim() !== "") {
  //     setTags([...tags, newTag.trim()]);
  //     setNewTag(""); 
  //   }
  // };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name ||!price ||!stock ||!photos.length ||!category ||!brand ||!tags.length || !displayPhoto) console.log('enter');
    ;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("productModel", productModel);
    formData.append("dimensions", dimensions);
    formData.append("displayPhoto", displayPhoto);
    tags.forEach((tag, index) => {
      formData.append("tags", tag);
    });
    photos.forEach((photo, index) => {
      formData.append("photos", photo);
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
              {/* ,dimensions,productModel */}
              <label>Model</label>
              <input
                required
                type="text"
                placeholder="Product Model"
                value={productModel}
                onChange={(e) => setProductModel(e.target.value)}
              />
            </div>
            <div>
              <label>Measurement</label>
              <input
                required
                type="text"
                placeholder="Dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
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
              <label>Tags</label>
             
                {/* {tags.map((tag, index) => (
                  <div key={index}>{tag}</div>
                ))} */}
                <input
                  type="text"
                  placeholder="Add Tag"
                  value={tags.join(",")}
                  onChange={(e) => setTags(e.target.value.split(","))}
                />
                <p>(Please add 2 tags minimum. separated by ' , ')</p>
                {/* <button type="button" onClick={handleAddTag}>
                  +
                </button> */}
              
            </div>

            <div>
              <label>Display Photo</label>
              <input
                type="file"
                required
                onChange={changeDisplayPhotoHandler}
              />
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

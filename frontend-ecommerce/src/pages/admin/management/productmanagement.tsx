import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { UserReducerInitialState } from "../../../types/reducerTypes";
import { useSelector } from "react-redux";
import { useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading } = useProductDetailsQuery(params.id!);

  const {
    photos,
    category,
    stock,
    price,
    name,
    brand,
    dimensions,
    description,
    productModel,
    tags,
  } = data?.product || {
    photos: [],
    name: "",
    category: "",
    stock: 0,
    tags: [],
    price: 0,
    brand: "",
    dimensions: "",
    description: "",
    productModel: "",
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [brandUpdate, setBrandUpdate] = useState<string>(brand);
  const [dimensionsUpdate, setDimensionsUpdate] = useState<string>(dimensions);
  const [tagsUpdate, setTagsUpdate] = useState<string[]>(tags);
  const [productModelUpdate, setProductModelUpdate] = useState<string>(productModel);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File[]>([]);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile([file]);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", nameUpdate);
    formData.set("price", priceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    formData.set("category", categoryUpdate);
    formData.set("brand", brandUpdate);
    formData.set("dimensions", dimensionsUpdate);
    formData.set("productModel", productModelUpdate);
    formData.set("description", description);

    if (tagsUpdate.length > 0) {
      tagsUpdate.forEach((tag, index) => {
      formData.append("tags", tag);})
    }
    if (photoFile.length > 0) {
      photoFile.forEach((photo, index) => {
      formData.append("photos", photo);})
    }

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setStockUpdate(data.product.stock);
      setPriceUpdate(data.product.price);
      setCategoryUpdate(data.product.category);
      setBrandUpdate(data.product.brand);
      setDimensionsUpdate(data.product.dimensions);
      setProductModelUpdate(data.product.productModel);
      setTagsUpdate(data.product.tags);
      setPhotoUpdate(data.product.photos[0]);
    }
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <section>
              <strong>ID -{data?.product?._id}</strong>
              <img src={`${server}/${photos[0]}`} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Brand</label>
                  <select
                value={brandUpdate}
                onChange={(e) => setBrandUpdate(e.target.value)}
              >
                <option value="autoglo">Autoglo</option>
                <option value="prolite">Prolite</option>
              </select>
                  
                </div>
                <div>
                  <label>Dimensions</label>
                  <input
                    type="text"
                    placeholder="Dimensions"
                    value={dimensionsUpdate}
                    onChange={(e) => setDimensionsUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Product Model</label>
                  <input
                    type="text"
                    placeholder="Product Model"
                    value={productModelUpdate}
                    onChange={(e) => setProductModelUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Tags</label>
                  
                  <input
                    type="text"
                    placeholder="Tags"
                    value={tagsUpdate.join(",")}
                    onChange={(e) => setTagsUpdate(e.target.value.split(","))}
                  />
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;

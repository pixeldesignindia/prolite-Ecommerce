import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducerTypes";
import { useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading } = useProductDetailsQuery(params.id!);

  const [priceUpdate, setPriceUpdate] = useState<number>(0);
  const [stockUpdate, setStockUpdate] = useState<number>(0);
  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [dimensionsUpdate, setDimensionsUpdate] = useState<string>("");
  const [tagsUpdate, setTagsUpdate] = useState<string[]>([]);
  const [productModelUpdate, setProductModelUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>("");
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const[brand,setBrand] = useState<string>('');
  const[description,setDescription] = useState<string>('');
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

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

    setPhotos(newPhotos);
  };
  

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", nameUpdate);
    formData.set("price", priceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    formData.set("category", categoryUpdate);
    formData.set("dimensions", dimensionsUpdate);
    formData.set("brand",brand);
    formData.set("productModel", productModelUpdate);
    formData.set("description", description);

    if (tagsUpdate.length > 0) {
      tagsUpdate.forEach((tag) => {
        formData.append("tags", tag);
      });
    }
    if(photos){
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });}

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
      setDimensionsUpdate(data.product.dimensions);
      setProductModelUpdate(data.product.productModel);
      setTagsUpdate(data.product.tags);
      setBrand(data.product.brand);
      setDescription(data.product.description);
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
              <img src={`${server}/${data?.product?.displayPhoto[0]}`} alt="Product" />
              <p>{data?.product?.name}</p>
              {data?.product?.stock ?? 0 > 0 ? (
                <span className="green">{data?.product?.stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{data?.product?.price}</h3>
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
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                <p>(Please add 2 tags minimum. separated by ' , ')</p>

                <div>
                  <label>Photos</label>
                  <input
                    type="file"
                    onChange={changeImageHandler}
                    multiple 
                  />
                </div>

                {photoPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Image ${index}`} />
            ))}
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

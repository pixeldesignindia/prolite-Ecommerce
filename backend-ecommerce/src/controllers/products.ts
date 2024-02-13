import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js"
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
import { unlink } from 'fs/promises'

export const getlatestProducts= TryCatch(async (req, res, next) => {
  let products;

  if (myCache.has("latest-products"))
    products = JSON.parse(myCache.get("latest-products") as string);
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

interface LatestProductsByBrand {
  [brand: string]: NewProductRequestBody[]; // Assuming NewProductRequestBody is the type of product
}

export const getlatestProductsByBrand = TryCatch(async (req, res, next) => {
  let latestProductsByBrand: LatestProductsByBrand = {};

  if (myCache.has("latest-products")) {
    latestProductsByBrand = JSON.parse(myCache.get("latest-products") as string);
  } else {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });

    allProducts.forEach(product => {
      const { brand } = product;
      if (!latestProductsByBrand[brand]) {
        latestProductsByBrand[brand] = [product];
      } else if (latestProductsByBrand[brand].length < 5) {
        latestProductsByBrand[brand].push(product);
      }
    });

    myCache.set("latest-products", JSON.stringify(latestProductsByBrand));
  }

  return res.status(200).json({
    success: true,
    latestProductsByBrand,
  });
});


// Revalidate on New,Update,Delete Product & on New Order
export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;

  if (myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories") as string);
  else {
    categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getAllCategoriesByBrand = TryCatch(async (req, res, next) => {
  let categoriesByBrand;

  if (myCache.has("categoriesByBrand")) {
    categoriesByBrand = JSON.parse(myCache.get("categoriesByBrand") as string);
  } else {
    // Aggregate categories based on brands
    categoriesByBrand = await Product.aggregate([
      { $group: { _id: "$brand", categories: { $addToSet: "$category" } } }
    ]);

    myCache.set("categoriesByBrand", JSON.stringify(categoriesByBrand));
  }

  return res.status(200).json({
    success: true,
    categoriesByBrand,
  });
});
export const getAllproductByCategory = TryCatch(async (req, res, next) => {
   const { category }: { category?: string } = req.query;
 if (!category){ return next(new ErrorHandler(" category name is required in query", 400))
}
let products;
  if (myCache.has(`products-category-${category.toLowerCase()}`)) {
      products = JSON.parse(myCache.get(`products-category-${category.toLowerCase()}`) as string);
    } else {
      products = await Product.find({
        category:category.toLowerCase()
      });

      if (products.length === 0) {
     return next(new ErrorHandler("product not found in this category", 404))
      }

      myCache.set(`products-category-${category.toLowerCase()}`, JSON.stringify(products));
    }

    return res.status(200).json({
      success: true,
      products,
    });
});
export const getAllBrand = TryCatch(async (req, res, next) => {
  let brands;

  if (myCache.has("brands"))
    brands = JSON.parse(myCache.get("brands") as string);
  else {
    brands = await Product.distinct("brand");
    myCache.set("brands", JSON.stringify(brands));
  }

  return res.status(200).json({
    success: true,
    brands,
  });
});

// Revalidate on New,Update,Delete Product & on New Order
export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products") as string);
  else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;
  if (myCache.has(`product-${id}`))
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  else {
    product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category,description,brand,dimensions,productModel} = req.body;
    console.log(req.body);
    
        const photos = req.files as Express.Multer.File[]; 

    if (!photos) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category || !description || !brand ||!dimensions ||!productModel) {
     for (const photo of photos) {
        await unlink(photo.path);
      }

      return next(new ErrorHandler('Please enter all fields', 400));
    }

    const photoPaths = photos.map((photo) => photo.path);

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      description,
      photos: photoPaths,
      brand:brand.toUpperCase(),
      productModel:productModel.toLowerCase(),
      dimensions: dimensions
    });

     invalidateCache({ product: true, 
      admin: true,
      category: category.toLowerCase()
     });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category ,description,dimensions,productModel} = req.body;
  const photos = req.files as  Express.Multer.File[];
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photos) {
     for (const photo of photos) {
        await unlink(photo.path);
      }
      const photoPaths = photos.map((photo) => photo.path);
      product.photos = photoPaths
    }
  

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (description) product.description = description;
  if(dimensions) product.dimensions = dimensions;
  if(productModel) product.productModel = productModel;

  await product.save();

  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
    
  });

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

 const photos = product.photos;
  for (const photo of photos) {
    await unlink(photo);
  }
  await product.deleteOne();

  invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);
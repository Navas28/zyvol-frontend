import { getProductByCategory, getSingleProduct } from "@/Request/requests";
import ProductDetailsClient from "../../ProductDetailsClient";
import { Product } from "@/typing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductDetails = async (props: any) => {
  const { params } = props;
  const id = params.id;
  let singleProduct: Product | null = null;
  let relatedProduct: Product[] = [];

  try {
    singleProduct = await getSingleProduct(id);
    if (singleProduct) {
      relatedProduct = await getProductByCategory(singleProduct.category);
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-20">
      <ProductDetailsClient
        product={singleProduct}
        relatedProduct={relatedProduct}
      />
    </div>
  );
};

export default ProductDetails;

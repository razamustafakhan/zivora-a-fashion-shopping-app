import { notFound } from "next/navigation";
import { products } from "@/data/product";
import ProductDetails from "@/components/common/ProductDetails";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

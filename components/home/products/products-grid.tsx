import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import ProductCard from "@/components/home/products/product-card";
import { products } from "@/constants/products";

export default function ProductsGrid() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

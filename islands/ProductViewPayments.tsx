import type { ProductViewPaymentsProps } from "../components/product/ProductViewPayments.tsx";
import Component from "../components/product/ProductViewPayments.tsx";

function Island(ProductViewPaymentsProps: ProductViewPaymentsProps) {
  return <Component {...ProductViewPaymentsProps} />;
}

export default Island;

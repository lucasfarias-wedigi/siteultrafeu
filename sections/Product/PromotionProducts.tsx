import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import CustomDivider from "../../components/CustomDivider.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
}

function PromotionProducts({ products, title = "PROMOÇÃO" }: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <CustomDivider>
        <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl whitespace-nowrap">
          {title}
        </h2>
      </CustomDivider>

      {products && products.map((product) => <span>{product.name}</span>)}

      <div id={id}>
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...useOffer(product.offers),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default PromotionProducts;

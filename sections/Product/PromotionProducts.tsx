import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import CustomDivider from "../../components/CustomDivider.tsx";
import PromotionProductCard from "../../components/product/PromotionProductCard.tsx";
import PromotionProductCardInHighLight from "./PromotionProductCardInHighLight.tsx";

export interface Props {
  products: Product[] | null;
  productInHighlight: string;
  title?: string;
}

function PromotionProducts({ products, title = "PROMOÇÃO" }: Props) {
  const id = useId();
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div class="w-full max-w-7xl py-8 mx-auto mb-8">
      <CustomDivider>
        <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl whitespace-nowrap">
          {title}
        </h2>
      </CustomDivider>

      <div class="w-full flex justify-between">
        <div class="flex w-full">
          <PromotionProductCardInHighLight
            product={products[0]}
            itemListName={title}
            // platform={platform}
            index={0}
          />
        </div>
        <div class="flex flex-wrap justify-end gap-4 items-center w-full h-full">
          {products &&
            products.map((product, index) => (
              <PromotionProductCard
                product={product}
                itemListName={title}
                // platform={platform}
                index={index}
              />
            ))}
        </div>
      </div>

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

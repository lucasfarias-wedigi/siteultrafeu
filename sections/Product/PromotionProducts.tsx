import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import CustomDivider from "../../components/CustomDivider.tsx";
import PromotionProductCard from "../../components/product/PromotionProductCard.tsx";
import PromotionProductCardInHighLight from "./PromotionProductCardInHighLight.tsx";
import { AppContext } from "../../apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  products: Product[] | null;
  productInHighlight: string;
  title?: string;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

function PromotionProducts({
  device,
  products,
  title,
}: SectionProps<typeof loader>) {
  const id = useId();
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div id={id} class="w-full max-w-7xl px-4 lg:px-0 mx-auto mb-8">
      {device === "desktop"
        ? (
          <>
            {title && <CustomDivider>
              <h2 class="text-start md:text-center text-blackPrimary text-base lg:text-2xl font-semibold whitespace-nowrap">
                {title}
              </h2>
            </CustomDivider>}
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
          </>
        )
        : (
          <>
            <div class="relative flex items-center w-full">
              <CustomDivider>
                <h2 class="text-start md:text-center text-blackPrimary font-semibold text-base lg:text-2xl whitespace-nowrap">
                  {title}
                </h2>
              </CustomDivider>
              <div class="bg-white absolute z-10 right-0 flex items-center justify-end gap-2.5 mb-8 pl-8">
                <Slider.PrevButton class="w-11 h-11 rounded-full bg-grayTertiary flex justify-center items-center">
                  <Icon
                    size={18}
                    id="ChevronRight"
                    strokeWidth={3}
                    class="text-purplePrimary rotate-180 w-full"
                  />
                </Slider.PrevButton>
                <Slider.NextButton class="w-11 h-11 rounded-full bg-grayTertiary flex justify-center items-center">
                  <Icon
                    size={18}
                    id="ChevronRight"
                    strokeWidth={3}
                    class="text-purplePrimary"
                  />
                </Slider.NextButton>
              </div>
            </div>
            <Slider class="w-full carousel carousel-center">
              {products?.map((product, index) => (
                <Slider.Item index={index} class={"carousel-item w-full"}>
                  <PromotionProductCardInHighLight
                    product={product}
                    itemListName={title}
                    // platform={platform}
                    index={0}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.JS rootId={id} />
          </>
        )}

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
  );
}

export default PromotionProducts;

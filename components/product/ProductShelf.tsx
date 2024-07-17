import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import CustomDivider from "../CustomDivider.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

function ProductShelf({ products, title, layout }: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div
      id={id}
      class="w-full max-w-7xl mx-auto mb-8 px-4 lg:px-0"
    >
      {
        /* <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      /> */
      }
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
      <div
        // class={clx(
        //   "grid",
        //   layout?.showArrows && "grid-cols-[48px_1fr_48px]",
        //   "px-0 md:px-5 container"
        // )}
      >
        <Slider class="w-full carousel sm:carousel-end gap-4 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <ProductCard
                product={product}
                itemListName={title}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.JS rootId={id} />
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

export default ProductShelf;

import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
// import Avatar from "../../components/ui/Avatar.tsx";
// import {
//   default as WishlistButtonVtex,
//   default as WishlistButtonWake,
// } from "../../islands/WishlistButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
// import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

// const WIDTH = 200;
// const HEIGHT = 279;

function PromotionProductCard({
  product,
  preload,
  itemListName,
  // platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  // const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  // const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <aside
      id={id}
      data-deco="view-product"
      class={`border border-[#E2E2E2] w-full h-full p-4`}
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class={`flex w-full gap-4 h-full`}>
        <figure class="w-full h-full" // style={{ aspectRatio }}
        >
          {/* Wishlist button */}
          <div class={clx()}>
            {
              /* <div class="lg:group-hover:block">
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div> */
            }
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              // "absolute top-0 left-0",
              // "grid grid-cols-1 grid-rows-1",
              "flex relative m-auto w-full",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={295}
              height={329}
              // style={{ aspectRatio }}
              class={clx("bg-base-100", "object-cover", "rounded")}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={295}
              height={329}
              // style={{ aspectRatio }}
              class={clx(
                "absolute opacity-0 z-10 hover:opacity-100 transition-opacity",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          </a>
        </figure>

        {/* SKU Selector */}
        {
          /* <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={
                      link === relativeUrl
                        ? "active"
                        : link
                        ? "default"
                        : "disabled"
                    }
                  />
                </a>
              </li>
            ))}
        </ul> */
        }

        {/* Name/Description */}
        <div class="flex flex-col justify-between w-full">
          <div class="flex flex-col">
            <h2
              class="truncate text-base font-semibold text-blackPrimary"
              dangerouslySetInnerHTML={{ __html: name ?? "" }}
            />

            {
              /* <div
              class="truncate text-sm text-blackPrimary first:hidden"
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            /> */
            }
          </div>

          {/* Price from/to */}
          <div class="flex gap-2 flex-col">
            <span class="line-through text-sm text-grayPrimary">
              {formatPrice(listPrice, offers?.priceCurrency)}
              {/* Discount % */}
              <span class="font-bold bg-[#E2E2E2] px-4 py-0.5 text-greenPrimary text-xs rounded-card">
                {listPrice && price
                  ? `-${
                    Math.round(((listPrice - price) / listPrice) * 100)
                  }% ↓ `
                  : ""}
              </span>
            </span>
            <span class="text-purplePrimary font-bold text-xl">
              {formatPrice(price, offers?.priceCurrency)}{" "}
              <span class="font-normal text-xs">à vista</span>
            </span>
          </div>

          {/* Installments */}
          <span class="flex text-blackPrimary gap-2 text-xs truncate">
            ou até {installments}
          </span>

          <a
            href={relativeUrl}
            aria-label="view product"
            class={`${
              index && index > 0 ? "hidden" : "flex"
            } items-center justify-center w-full h-11 border border-purplePrimary rounded-card text-purplePrimary font-bold text-base`}
          >
            Detalhes
          </a>
        </div>
      </div>
    </aside>
  );
}

export default PromotionProductCard;

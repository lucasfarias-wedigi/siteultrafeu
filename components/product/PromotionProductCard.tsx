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
  const { url, productID, isVariantOf, image: images, offers } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  // const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  // const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  if (index === 0) return null;

  return (
    <div
      id={id}
      data-deco="view-product"
      class={`w-[280px] border border-[#E2E2E2] p-2 h-[115px]`}
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

      <div class={`flex gap-2 items-center`}>
        <figure class="" // style={{ aspectRatio }}
        >
          {/* Wishlist button */}
          <div class={clx()}>
            {/* Discount % */}
            {
              /* <div class="text-sm px-3">
              <span class="font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div> */
            }
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
              "flex relative m-auto w-fit",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={96}
              height={96}
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
              width={96}
              height={96}
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
        <div class="flex flex-col">
          <div class="flex flex-col">
            <h2
              class="truncate text-sm text-blackPrimary max-w-[128px]"
              dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
            />

            {
              /* <div
            class="truncate text-xs"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          /> */
            }
          </div>

          {/* Price from/to */}
          <div class="flex gap-2 items-center justify-end">
            <span class="line-through text-[10px] text-grayPrimary">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span class="text-purplePrimary text-sm font-bold">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          {/* Installments */}
          {
            /* <span class="flex justify-end gap-2 font-light text-sm truncate">
            ou {installments}
          </span> */
          }
        </div>
      </div>
    </div>
  );
}

export default PromotionProductCard;

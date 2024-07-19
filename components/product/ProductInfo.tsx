import { SendEventOnView } from "../../components/Analytics.tsx";
import AddToCartButtonLinx from "../../islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "../../islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "../../islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "../../islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "../../islands/ProductVariantSelector.tsx";
import Icon from "../../components/ui/Icon.tsx";
import ShareProductButton from "../../islands/ShareProductButton.tsx";
import ProductViewPayments from "../../islands/ProductViewPayments.tsx";
import { Data } from "../../sections/Product/ProductDetails.tsx";

interface Props {
  page: ProductDetailsPage | null;
  // layout?: {
  //   /**
  //    * @title Product Name
  //    * @description How product title will be displayed. Concat to concatenate product and sku names.
  //    * @default productGroup
  //    */
  //   name?: "concat" | "productGroup" | "product";
  // };
  mdColors: Data[];
}

function ProductInfo({ page, mdColors }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const {
    productID,
    offers,
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const brandName = product?.brand?.name;
  const technicalDescription = isVariantOf?.additionalProperty.find((item) =>
    item.name === "Descrição Técnica"
  )?.value;
  const lines = technicalDescription?.split("\n").filter((line) =>
    line.trim() !== ""
  );
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });
  const discountPercentage =
    ((Number(listPrice) - Number(price)) / Number(listPrice)) * 100;
  const pixFactor = 0.10; // 10%
  const pixListPrice = Number(listPrice) * (1 - pixFactor);
  const pixPrice = price * (1 - pixFactor);
  const pixSavingsPrice = price * pixFactor;

  function getTechnicalInfoValue(
    lines: string[] | undefined,
    key: string,
  ): string | null {
    if (!lines) return null;

    const line = lines.find((line) => line.startsWith(key));
    if (!line) return null;

    const parts = line.split(":");
    if (parts.length > 1) {
      return parts.slice(1).join(":").trim();
    }

    return null;
  }

  return (
    <div class="flex flex-col px-4" id={id}>
      {/* Code, brand name, name and wishlist*/}
      <div class="mt-4 sm:mt-0">
        <div class="flex justify-between items-center">
          <h1>
            <span class="font-semibold text-xl capitalize">
              {isVariantOf?.name}
            </span>
          </h1>
          <div class="flex flex-col items-center">
            <WishlistButtonVtex
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            />
            <ShareProductButton productName="share" />
          </div>
        </div>
        <div class="flex items-center justify-between max-w-[291px]">
          {gtin && (
            <span class="text-xs text-grayPrimary">
              Código: <strong class="text-black">{gtin}</strong>
            </span>
          )}
          {brandName && (
            <span class="text-xs text-grayPrimary">
              Marca: <strong class="text-black">{brandName}</strong>
            </span>
          )}
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector mdColors={mdColors} product={product} />
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center border-t-[1px] border-solid border-grayTertiary pt-4">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-[#B7B7B7] text-sm">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium text-xl text-black">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {(listPrice ?? 0) > price && (
            <span class="bg-grayQuaternary rounded-[5px] text-greenPrimary text-xs font-bold py-[2px] px-2 flex items-center gap-1">
              -{Math.round(discountPercentage)}%{" "}
              <Icon
                id={"MiniDownArrow"}
                width={8}
                height={9}
                fill="currentColor"
              />
            </span>
          )}
        </div>
        {installments && (
          <span class="text-xs text-[#2D2D2D]">Ou até {installments}</span>
        )}
      </div>
      {/* Payment Methods */}
      <ProductViewPayments price={price} />
      {/* Pix Prices */}
      <div class="flex flex-col">
        {(listPrice ?? 0) > price && (
          <div class="flex items-center gap-[6px]">
            <span class="line-through text-[#B7B7B7] text-sm">
              {formatPrice(pixListPrice, offers?.priceCurrency)}
            </span>
            <span class="bg-grayQuaternary rounded-[5px] text-greenPrimary text-xs font-bold py-[2px] px-2 flex items-center gap-1">
              -{Math.round(discountPercentage)}%<Icon
                id={"MiniDownArrow"}
                width={8}
                height={9}
                fill="currentColor"
              />
            </span>
          </div>
        )}
        <span class="text-[20px] text-purplePrimary">
          <strong class="text-[32px]">
            {formatPrice(pixPrice, offers?.priceCurrency)}
          </strong>{" "}
          à vista no PIX
        </span>
        <span class="w-fit uppercase text-xs text-white bg-greenPrimary rounded-[5px] py-[6px] px-1">
          Economia de {formatPrice(pixSavingsPrice, offers?.priceCurrency)}
        </span>
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  {
                    /* <WishlistButtonVtex
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  /> */
                  }
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <div>
              <span class="text-black font-semibold text-base">Descrição:</span>
              <div
                class="mt-2 text-sm"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </span>
      </div>
      {/* Technical Description */}
      <div class="mt-4 sm:mt-6 border-t-[1px] border-grayTertiary pt-4">
        <span class="text-sm">
          {technicalDescription && (
            <div class="">
              <span class="text-black font-semibold text-base">
                Informações técnicas
              </span>
              <ul class="flex flex-wrap gap-4 mt-4 justify-between">
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"PesoLiquido1"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Peso líquido:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Peso líquido")}
                    </strong>
                  </div>
                </li>
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"Consumo"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Consumo:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Consumo")}
                    </strong>
                  </div>
                </li>
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"Tensao"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Tensão:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Tensão")}
                    </strong>
                  </div>
                </li>
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"Altura"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Altura:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Altura")}
                    </strong>
                  </div>
                </li>
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"Frente"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Frente:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Frente")}
                    </strong>
                  </div>
                </li>
                <li class="flex items-center min-w-[142px]">
                  <Icon
                    id={"Profundidade"}
                    width={34}
                    height={34}
                    strokeWidth={1}
                  />
                  <div class="flex flex-col text-grayPrimary font-normal text-[10px] leading-3">
                    Profundidade:{" "}
                    <strong class="text-black text-sm">
                      {getTechnicalInfoValue(lines, "Profundidade")}
                    </strong>
                  </div>
                </li>
              </ul>
              <ul class="mt-4 text-sm">
                {lines?.map((line, index) => {
                  const parts = line.split(":");
                  return (
                    <li
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-grayTertiary"
                      } p-2`}
                    >
                      {parts.length > 1
                        ? (
                          <>
                            {parts[0]}:{" "}
                            <strong>{parts.slice(1).join(":")}</strong>
                          </>
                        )
                        : line}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </span>
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;

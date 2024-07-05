import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { useEffect } from "preact/hooks";
import { Data } from "../../sections/Product/ProductDetails.tsx";
export interface Props {
  product: Product;
  mdColors: Data[];
}

function VariantSelector({ product, mdColors }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  useEffect(() => {
    console.log(mdColors, "mdColors");
  }, []);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-base font-medium">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              const matchingColor = mdColors.find((color) =>
                color.colorName === value
              );
              const variant = relativeLink === relativeUrl
                ? "active"
                : relativeLink
                ? "default"
                : "disabled";
              return (
                <li>
                  <button
                    class={`${
                      variant === "disabled"
                        ? "bg-transparent border-grayTertiary"
                        : "bg-white"
                    } flex flex-col items-center shadow-lg rounded-card border-[1px] ${
                      matchingColor
                        ? "border-[#32026A] p-1"
                        : "border-black p-3"
                    }`}
                    f-partial={relativeLink}
                    f-client-nav
                  >
                    {matchingColor &&
                      (
                        <img
                          class="mb-1"
                          src={matchingColor.colorimg}
                          alt={value}
                        />
                      )}
                    <Avatar
                      content={value}
                      variant={variant}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;

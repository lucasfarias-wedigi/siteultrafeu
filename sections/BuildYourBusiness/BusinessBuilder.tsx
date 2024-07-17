import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import BusinessProductCard from "./BusinessProductCard.tsx";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  tabIndex?: number;
}

const BusinessBuilder = ({ tabs, tabIndex }: Props) => {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { products } = tabs[ti];

  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div class="max-w-7xl mx-auto w-full flex gap-6 justify-between my-8">
      <div class="max-w-[280px] w-full">
        <p class="text-sm mb-4">
          Escolha o equipamento que neste momento faz sentido para o seu
          negócio*:
        </p>
        <nav class="mb-4 w-full divide-y divide-grayTertiary">
          {tabs.map((tab, index) => (
            <button
              class={`text-start w-full h-11 px-2 border-x border-grayTertiary ${
                index === ti ? "bg-grayTertiary" : ""
              } ${index === 0 ? "border-t" : ""} ${
                index === tabs.length - 1 ? "!border-b" : ""
              }`}
              {...usePartialSection({ props: { tabIndex: index } })}
            >
              {tab.title}
            </button>
          ))}
        </nav>
        <p class="text-sm font-bold">
          *Nenhum destes equipamentos é obrigatório para finalização ou adição
          ao carrinho.
        </p>
      </div>
      <div class="max-w-[592px] w-full">
        <p class="text-sm  mb-4">Escolha o modelo:</p>
        <div id={id} class="w-full h-[637px] overflow-y-scroll px-2">
          {products?.map((product, index) => (
            <BusinessProductCard
              product={product}
              platform={platform}
              index={index}
            />
          ))}

          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: "Monte seu negócio",
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
      <div class="max-w-[298px] w-full">
        <p class="text-sm mb-4">Resumo do pedido:</p>
      </div>
    </div>
  );
};

export default BusinessBuilder;

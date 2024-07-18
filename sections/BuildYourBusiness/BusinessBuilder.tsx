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
        <div class="w-full h-[407px] mb-4 border-b border-b-#D4D4D4 overflow-y-scroll">
          <div class="w-full h-full m-auto text-center">
            <svg
              class="m-auto"
              width="88"
              height="88"
              viewBox="0 0 88 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.3333 58.6673H55.9651C72.4196 58.6673 74.9221 48.3303 77.957 33.2539C78.8326 28.9054 79.2704 26.7311 78.2177 25.2826C77.165 23.834 75.1472 23.834 71.1117 23.834H69.6667M22 23.834H29.3333"
                stroke="#B8B8B8"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M40.3333 31.1667C42.1354 33.0209 46.9325 40.3333 49.4999 40.3333M49.4999 40.3333C52.0673 40.3333 56.8644 33.0209 58.6666 31.1667M49.4999 40.3333V11"
                stroke="#B8B8B8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M29.3334 58.6673L19.7221 12.8887C18.906 9.62415 15.9727 7.33398 12.6077 7.33398H9.16675"
                stroke="#B8B8B8"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M32.56 58.666H31.0514C26.0525 58.666 22 62.8874 22 68.0945C22 68.9624 22.6754 69.666 23.5086 69.666H64.1667"
                stroke="#B8B8B8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M38.5 80.666C41.5376 80.666 44 78.2036 44 75.166C44 72.1284 41.5376 69.666 38.5 69.666C35.4624 69.666 33 72.1284 33 75.166C33 78.2036 35.4624 80.666 38.5 80.666Z"
                stroke="#B8B8B8"
                stroke-width="1.5"
              />
              <path
                d="M64.1667 80.666C67.2043 80.666 69.6667 78.2036 69.6667 75.166C69.6667 72.1284 67.2043 69.666 64.1667 69.666C61.1292 69.666 58.6667 72.1284 58.6667 75.166C58.6667 78.2036 61.1292 80.666 64.1667 80.666Z"
                stroke="#B8B8B8"
                stroke-width="1.5"
              />
            </svg>
            <p class="text-sm text-[#7A7A7A] mt-5">
              Seu resumo do pedido está vazio, faça a escolha do maquinário ao
              lado.
            </p>
          </div>
        </div>
        <div class="w-full h-[211px] border border-#D4D4D4 bg-whitePrimary p-2">
          <h4 class="font-bold text-xl mb-2">Meu Negócio - Açougue</h4>
          <p class="font-bold text-base mb-2">Total:</p>
          <p class="font-bold text-xl mb-1 text-purplePrimary">R$ 0,00</p>
          <button class="bg-greenPrimary w-full mb-2 h-11 flex items-center justify-center gap-2.5 text-white font-bold">
            Adicionar todos ao carrinho
          </button>
          <button class="border border-black w-full h-11 text-sm font-bold flex items-center justify-center gap-2.5">
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_691_4172)">
                <path
                  d="M15.6289 3.79297C13.9922 2.15234 11.8125 1.25 9.49609 1.25C4.71484 1.25 0.824219 5.14062 0.824219 9.92188C0.824219 11.4492 1.22266 12.9414 1.98047 14.2578L0.75 18.75L5.34766 17.543C6.61328 18.2344 8.03906 18.5977 9.49219 18.5977H9.49609C14.2734 18.5977 18.25 14.707 18.25 9.92578C18.25 7.60938 17.2656 5.43359 15.6289 3.79297ZM9.49609 17.1367C8.19922 17.1367 6.92969 16.7891 5.82422 16.1328L5.5625 15.9766L2.83594 16.6914L3.5625 14.0312L3.39062 13.7578C2.66797 12.6094 2.28906 11.2852 2.28906 9.92188C2.28906 5.94922 5.52344 2.71484 9.5 2.71484C11.4258 2.71484 13.2344 3.46484 14.5938 4.82812C15.9531 6.19141 16.7891 8 16.7852 9.92578C16.7852 13.9023 13.4688 17.1367 9.49609 17.1367ZM13.4492 11.7383C13.2344 11.6289 12.168 11.1055 11.9688 11.0352C11.7695 10.9609 11.625 10.9258 11.4805 11.1445C11.3359 11.3633 10.9219 11.8477 10.793 11.9961C10.668 12.1406 10.5391 12.1602 10.3242 12.0508C9.05078 11.4141 8.21484 10.9141 7.375 9.47266C7.15234 9.08984 7.59766 9.11719 8.01172 8.28906C8.08203 8.14453 8.04687 8.01953 7.99219 7.91016C7.9375 7.80078 7.50391 6.73438 7.32422 6.30078C7.14844 5.87891 6.96875 5.9375 6.83594 5.92969C6.71094 5.92188 6.56641 5.92188 6.42188 5.92188C6.27734 5.92188 6.04297 5.97656 5.84375 6.19141C5.64453 6.41016 5.08594 6.93359 5.08594 8C5.08594 9.06641 5.86328 10.0977 5.96875 10.2422C6.07812 10.3867 7.49609 12.5742 9.67188 13.5156C11.0469 14.1094 11.5859 14.1602 12.2734 14.0586C12.6914 13.9961 13.5547 13.5352 13.7344 13.0273C13.9141 12.5195 13.9141 12.0859 13.8594 11.9961C13.8086 11.8984 13.6641 11.8438 13.4492 11.7383Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_691_4172">
                  <rect
                    width="17.5"
                    height="20"
                    fill="white"
                    transform="translate(0.75)"
                  />
                </clipPath>
              </defs>
            </svg>
            fale com um especialista
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessBuilder;

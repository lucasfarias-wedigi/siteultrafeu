import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item, i }: { item: SiteNavigationElement; i: number }) {
  return (
    <div class={`collapse px-4`}>
      <input type="checkbox" />
      <h4 class={`collapse-title p-0 text-sm font-bold`}>
        {item.name}
      </h4>
      <div class="collapse-content p-0">
        <ul>
          {
            /* <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li> */
          }
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} i={i} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full min-w-[310px]">
      <ul class="flex-grow flex flex-col divide-y-4 divide-grayTertiary">
        {items.map((item, i) => (
          <li>
            <MenuItem item={item} i={i} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200">
        <li>
          <a class="flex items-center gap-4 px-4 py-2" href="/wishlist">
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" size={24} strokeWidth={2} />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

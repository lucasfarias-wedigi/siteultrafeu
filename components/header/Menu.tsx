import { useState } from "preact/hooks";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

// function MenuItem({ item, i }: { item: SiteNavigationElement; i: number }) {
//   return (
//     <div class={`collapse collapse-open`}>
//       <h4 class={`collapse-title p-0 text-sm font-bold`}>
//         {item.name}
//       </h4>
//       <div class="collapse-content p-0">
//         <ul class="">
//           {
//             /* <li>
//             <a class="underline text-sm" href={item.url}>Ver todos</a>
//           </li> */
//           }
//           {item.children?.map((node) => (
//             <li>
//               <MenuItem item={node} i={i} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

function Menu({ items }: Props) {
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const handleButtonClick = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col h-full min-w-[310px]">
      <ul className="flex-grow flex flex-col divide-y-4 divide-grayTertiary">
        {items?.map((node, index) => (
          <li className="flex flex-col px-4 bg-white" key={node.name}>
            <a href={node.url || "#"}>
              <h4 className="py-2 text-sm font-bold text-purplePrimary">
                {node.name}
              </h4>
            </a>
            <ul
              className={`flex flex-col ${
                expandedItems[index] ||
                  (node.children && node.children.length < 4)
                  ? "h-auto"
                  : "h-[108px] overflow-hidden"
              }`}
            >
              {node?.children?.map((child) => (
                <a href={child.url || "#"} className={``} key={child.name}>
                  <li className="text-black py-2 text-sm">{child.name}</li>
                </a>
              ))}
            </ul>
            {node.children && node.children.length > 3 && (
              <button
                className="py-2 text-sm font-bold text-black flex items-center gap-2.5"
                onClick={() => handleButtonClick(index)}
              >
                {expandedItems[index] ? "Ver menos" : "Ver tudo"}
                <Icon id="ChevronDown" size={24} strokeWidth={1} />
              </button>
            )}
          </li>
        ))}
      </ul>

      {
        /* <ul className="flex flex-col py-2 bg-base-200">
        <li>
          <a className="flex items-center gap-4 px-4 py-2" href="/wishlist">
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span className="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span className="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" size={24} strokeWidth={2} />
            <span className="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span className="text-sm">Minha conta</span>
          </a>
        </li>
      </ul> */
      }
    </div>
  );
}

export default Menu;

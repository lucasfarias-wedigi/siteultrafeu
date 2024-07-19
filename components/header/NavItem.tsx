import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import { MenuItens } from "./Header.tsx";

function NavItem({ item }: { item: MenuItens }) {
  const { url, name, children, icon } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="flex items-center gap-2 py-6">
        {icon && <Image src={icon} height={27} width={27} alt={name} />}
        <span class="group-hover:underline text-xs font-medium text-blackPrimary">
          {name}
        </span>
      </a>
      {children && children.length > 0 && (
        <div
          class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 gap-6 border-t border-b-2 border-base-200 w-[179px] lg:max-h-[500px] overflow-y-auto"
          style={{ top: "0px", marginTop: headerHeight }}
        >
          {image?.url && (
            <Image
              class="p-6"
              src={image.url}
              alt={image.alternateName}
              width={300}
              height={332}
              loading="lazy"
            />
          )}
          <ul class="flex flex-col">
            {children.map((node) => (
              <li class="px-4 py-2 text-sm">
                <a class="hover:underline" href={node.url}>
                  <span>{node.name}</span>
                </a>

                <ul class="flex flex-col gap-1 mt-4">
                  {node.children?.map((leaf) => (
                    <li>
                      <a class="hover:underline" href={leaf.url}>
                        <span class="text-xs">{leaf.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;

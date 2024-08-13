import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

export interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class={`checkbox rounded-card [--chkbg:theme(colors.purplePrimary)] [--chkfg:white]`}
      />
      <span class="text-sm w-[260px]">
        {label} {quantity > 0 && <span class="">({quantity})</span>}
      </span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-4 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-4 w-fit divide-y-4 divide-grayTertiary lg:divide-y-0">
      {filters.filter(isToggle).map((filter) => (
        <li class="flex flex-col gap-4 p-4 lg:p-0">
          <span class="text-sm font-bold text-purplePrimary">
            {filter.label}
          </span>
          <FilterValues {...filter} />
        </li>
      ))}
    </ul>
  );
}

export default Filters;

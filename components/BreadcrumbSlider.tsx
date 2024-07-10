import { BreadcrumbList } from "apps/commerce/types.ts";
import Carousel from "./layout/Carousel.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import BreadcrumbSliderCard from "./BreadcrumbSliderCard.tsx";
import Breadcrumb from "./ui/Breadcrumb.tsx";

export interface item {
  title: string;
  image: ImageWidget;
  link: string;
}

export interface Props {
  title?: string;
  breadcrumb: BreadcrumbList;
  items: item[];
}

const BreadcrumbSlider = ({ title, items, breadcrumb }: Props) => {
  return (
    <div class="bg-whitePrimary w-full py-8">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mx-auto max-w-7xl w-full">
        <div class="px-4 lg:px-0 mb-4 lg:mb-0">
          {title && (
            <h1 class="mb-2 text-2xl font-semibold uppercase">{title}</h1>
          )}
          <div class="text-grayPrimary text-[11px]">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>
        </div>
        {items && (
          <div class="max-w-[816px] w-full">
            <Carousel
              layout={{ itemWidth: 121, hide: { indicators: false } }}
              children={items.map((item) => <BreadcrumbSliderCard {...item} />)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbSlider;

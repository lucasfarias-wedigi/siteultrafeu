import { BreadcrumbList } from "apps/commerce/types.ts";
import Carousel from "../../components/layout/Carousel.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import BreadcrumbSliderCard from "../../components/BreadcrumbSliderCard.tsx";

export interface item {
  title: string;
  image: ImageWidget;
  link: string;
}

export interface Props {
  breadcrumb: BreadcrumbList;
  items: item[];
}

const BreadcrumbSlider = ({ items, breadcrumb }: Props) => {
  return (
    <div>
      <div>{breadcrumb}</div>
      {items && (
        <Carousel
          layout={{ itemWidth: 121 }}
          children={items.map((item) => (
            <BreadcrumbSliderCard {...item} />
          ))}
        />
      )}
    </div>
  );
};

export default BreadcrumbSlider;

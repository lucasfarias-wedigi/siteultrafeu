import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CustomDivider from "../components/CustomDivider.tsx";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useId } from "../sdk/useId.ts";

interface Card {
  image: ImageWidget;
  text: string;
}

export interface Props {
  title: string;
  categoryCards: Card[];
}

const CategoryList = ({ title, categoryCards }: Props) => {
  const id = useId();
  return (
    <div class="w-full max-w-7xl m-auto">
      <CustomDivider>
        <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl w-full">
          {title}
        </h2>
        <div class="flex items-center justify-end gap-2.5 md:hidden">
          <Slider.PrevButton class="w-11 h-11 rounded-full bg-grayTertiary flex justify-center items-center">
            <Icon
              size={18}
              id="ChevronRight"
              strokeWidth={3}
              class="text-purplePrimary rotate-180 w-full"
            />
          </Slider.PrevButton>
          <Slider.NextButton class="w-11 h-11 rounded-full bg-grayTertiary flex justify-center items-center">
            <Icon
              size={18}
              id="ChevronRight"
              strokeWidth={3}
              class="text-purplePrimary"
            />
          </Slider.NextButton>
        </div>
      </CustomDivider>
      <Slider class="carousel w-full justify-between carousel-center">
        {categoryCards?.map((item, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="text-center">
              <Image
                src={item.image}
                width={176}
                height={145}
                alt={item.text}
              />
              <p class="text-blackPrimary text-sm">{item.text}</p>
            </div>
          </Slider.Item>
        ))}
      </Slider>
      <Slider.JS rootId={id} />
    </div>
  );
};

export default CategoryList;

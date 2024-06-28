import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CustomDivider from "../components/CustomDivider.tsx";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useId } from "../sdk/useId.ts";

/**
 * @titleBy text
 */
interface Card {
  image: ImageWidget;
  text: string;
  url: string;
}

/**
 * @titleBy title
 */
export interface Props {
  title: string;
  categoryCards: Card[];
}

const CategoryList = ({ title, categoryCards }: Props) => {
  const id = useId();
  return (
    <div id={id} class="w-full max-w-7xl m-auto mb-8">
      <div class="relative flex items-center w-full">
        <CustomDivider>
          <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl whitespace-nowrap">
            {title}
          </h2>
        </CustomDivider>
        <div class="bg-white absolute z-10 right-0 flex items-center justify-end gap-2.5 mb-8 pl-8">
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
      </div>

      <Slider class="carousel w-full justify-between carousel-center gap-8">
        {categoryCards?.map((item, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="group text-center rounded-b-card border border-[#E2E2E2] hover:bg-purplePrimary hover:border-purplePrimary">
              <a href={item.url || "#"}>
                <Image
                  src={item.image}
                  width={176}
                  height={145}
                  alt={item.text}
                />
                <p class="text-blackPrimary text-sm px-2.5 py-2 group-hover:text-white">
                  {item.text}
                </p>
              </a>
            </div>
          </Slider.Item>
        ))}
      </Slider>
      <Slider.JS rootId={id} />
    </div>
  );
};

export default CategoryList;

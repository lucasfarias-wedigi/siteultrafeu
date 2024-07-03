import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CustomDivider from "../components/CustomDivider.tsx";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useId } from "../sdk/useId.ts";

/**
 * @titleBy text
 */
interface item {
  image: ImageWidget;
  text: string;
}

/**
 * @titleBy title
 */
export interface Props {
  title: string;
  items: item[];
}

const ChoiceUltrafeu = ({ title, items }: Props) => {
  const id = useId();
  return (
    <div id={id} class="w-full max-w-7xl mx-auto relative md:px-0 px-4 mb-8">
      <CustomDivider>
        <h2 class="text-start md:text-center text-blackPrimary font-semibold text-base lg:text-2xl lg:whitespace-nowrap w-[183px] lg:w-fit">
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

      {
        /* <div class="w-full flex items-center justify-around">
        {items?.map((item) => (
          <div class="w-[152px] text-center">
            <Image
              src={item.image}
              alt={item.text}
              width={88}
              height={66}
              class="m-auto"
            />
            <p class="text-sm text-blackPrimary">{item.text}</p>
          </div>
        ))}
      </div> */
      }

      <Slider class="carousel w-full justify-between carousel-center">
        {items?.map((item, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="w-[130px] lg:w-[152px] text-center">
              <Image
                src={item.image}
                alt={item.text}
                width={88}
                height={66}
                class="m-auto"
              />
              <p class="text-sm text-blackPrimary">{item.text}</p>
            </div>
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS rootId={id} />
    </div>
  );
};

export default ChoiceUltrafeu;

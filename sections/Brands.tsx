import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CustomDivider from "../components/CustomDivider.tsx";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useId } from "../sdk/useId.ts";

/**
 * @titleBy alt
 */
interface item {
  image: ImageWidget;
  alt: string;
}

/**
 * @titleBy title
 */
export interface Props {
  title: string;
  items: item[];
}

const Brands = ({ title, items }: Props) => {
  const id = useId();
  return (
    <div id={id} class="w-full max-w-7xl mx-auto relative md:px-0 px-4 mb-8">
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

      <Slider class="carousel w-full justify-between carousel-center gap-8">
        {items?.map((item, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="w-[100px] text-center">
              <Image
                src={item.image}
                alt={item.alt}
                width={100}
                height={60}
                class="m-auto"
              />
            </div>
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS rootId={id} />
    </div>
  );
};

export default Brands;

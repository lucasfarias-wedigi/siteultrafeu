import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";

/**
 * @titleBy text
 */
export interface benefitsItemsProps {
  text: string;
  image: ImageWidget;
  link: string;
}

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  benefitsItems?: benefitsItemsProps[];
}

function Alert({ alerts = [], interval = 5, benefitsItems }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-bluePrimary w-full">
      <div class="flex flex-col-reverse md:flex-row items-center justify-center md:gap-5 w-full max-w-7xl m-auto">
        {benefitsItems && (
          <ul class="flex items-center w-full">
            {benefitsItems.map((item, i: number) => (
              <li
                class={`font-medium text-sm text-white p-2 ${
                  i === 0 ? "md:border-l bg-blueSecondary border-b-2 border-orangePrimary" : ""
                } md:border-r md:border-white md:border-opacity-50`}
              >
                <a
                  href={item.link || "#"}
                  class={`${
                    item.text === "LOJA AO VIVO" ? "bg-orangePrimary" : ""
                  } flex items-center px-1.5 py-1 gap-2`}
                >
                  <Image
                    src={item.image}
                    alt={item.text}
                    width={24}
                    height={24}
                  />
                  <span class="">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div class="relative bg-white md:bg-transparent md:w-fit w-full flex items-center justify-center">
          <Slider class="carousel carousel-center gap-6 w-full md:w-[418px] flex items-center min-h-8 md:min-h-fit">
            {alerts.map((alert, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <span class="text-xs md:text-sm text-[#686868] md:text-white flex justify-center items-center w-full">
                  {alert}
                </span>
              </Slider.Item>
            ))}
            <>
              <Slider.PrevButton class="absolute left-4 md:left-0 flex justify-center items-center">
                <Icon
                  size={18}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="text-[#686868] md:text-white rotate-180 w-full"
                />
              </Slider.PrevButton>
              <Slider.NextButton class="absolute right-4 md:right-0 flex justify-center items-center">
                <Icon
                  size={18}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="text-[#686868] md:text-white"
                />
              </Slider.NextButton>
            </>
          </Slider>
        </div>

        <Slider.JS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default Alert;

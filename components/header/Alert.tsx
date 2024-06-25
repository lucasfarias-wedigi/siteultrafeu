import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";

/**
 * @titleBy text
 */
export interface benefitsItemsProps {
  text: string;
  image?: AvailableIcons;
  link: string;
}

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  liveStore?: {
    link: string;
    text: string;
  };
  benefitsItems?: benefitsItemsProps[];
}

function Alert({ alerts = [], interval = 5, liveStore, benefitsItems }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-graySecondary w-full">
      <div class="flex flex-col-reverse md:flex-row items-center justify-between md:gap-5 w-full max-w-7xl m-auto">
        {benefitsItems && (
          <div class="w-full overflow-x-scroll md:overflow-x-auto">
            <ul class="flex min-w-full items-center">
              {benefitsItems.map((item, i: number) => (
                <a href={item.link || "#"} class="">
                  <li
                    class={`flex gap-2 h-10 items-center text-xs font-normal md:font-medium md:text-sm text-grayPrimary bg-whitePrimary px-2 ${
                      i === 0 ? "md:border-l border-b-2" : ""
                    } md:border-b-0 md:border-r md:border-grayTertiary md:border-opacity-50`}
                  >
                    {item.image && (
                      <Icon
                        size={24}
                        strokeWidth={1}
                        id={item.image}
                        class={item.image ? "block" : "hidden"}
                      />
                    )}
                    <span class="">{item.text}</span>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        )}

        {liveStore && (
          <a
            href={liveStore.text}
            class="bg-greenPrimary text-grayTertiary px-1.5 py-1"
          >
            {liveStore.text}
          </a>
        )}

        <div class="relative bg-white md:bg-transparent w-full md:max-w-[418px] flex items-center justify-center">
          <Slider class="carousel carousel-center gap-6 w-full flex items-center min-h-8 md:min-h-fit">
            {alerts.map((alert, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <span class="text-xs md:text-sm text-grayPrimary flex justify-center items-center w-full">
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
                  class="text-grayPrimary rotate-180 w-full"
                />
              </Slider.PrevButton>
              <Slider.NextButton class="absolute right-4 md:right-0 flex justify-center items-center">
                <Icon
                  size={18}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="text-grayPrimary"
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

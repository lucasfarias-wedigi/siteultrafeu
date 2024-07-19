import { useId } from "../../sdk/useId.ts";
import Slider from "../../components/ui/Slider.tsx";
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
    active?: boolean;
  };
  benefitsItems?: benefitsItemsProps[];
}

function Alert({ alerts = [], interval = 5, liveStore, benefitsItems }: Props) {
  const id = useId();
  const linkAtual = window.location.pathname;

  return (
    <div id={id} class="bg-graySecondary w-full">
      <div class="flex flex-col-reverse md:flex-row items-center justify-between md:gap-5 w-full max-w-7xl m-auto">
        {benefitsItems && (
          <div class="w-full lg:w-fit lg:overflow-x-auto overflow-x-scroll">
            <ul class="flex w-full min-w-full items-center">
              {benefitsItems.map((item, i) => (
                <a
                  key={i}
                  href={item.link || "#"}
                  class={`relative ${
                    linkAtual === item.link
                      ? "bg-purplePrimary text-grayTertiary"
                      : "bg-transparent text-grayPrimary"
                  } flex`}
                >
                  <li
                    class={`flex gap-2 h-10 items-center text-xs font-normal md:font-medium md:text-sm px-2 hover:bg-purplePrimary hover:text-grayTertiary ${
                      i === 0 ? "md:border-x" : "md:border-r"
                    } md:border-grayTertiary`}
                  >
                    {item.image && (
                      <Icon
                        size={24}
                        strokeWidth={1}
                        id={item.image}
                        class={item.image ? "block" : "hidden"}
                      />
                    )}
                    <span class="whitespace-nowrap lg:whitespace-normal">
                      {item.text}
                    </span>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        )}

        {liveStore && (
          liveStore.active &&
          (
            <a
              href={liveStore.link}
              class={`hidden lg:flex items-center gap-2 text-sm font-medium bg-greenPrimary text-grayTertiary px-1.5 py-1`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                />
                <path
                  d="M16.9588 5C17.6186 5.86961 18 6.89801 18 8C18 9.10199 17.6186 10.1304 16.9588 11M7.04117 5C6.38143 5.86961 6 6.89801 6 8C6 9.10199 6.38143 10.1304 7.04117 11"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.3159 3C21.3796 4.43008 22 6.14984 22 8C22 9.85016 21.3796 11.5699 20.3159 13M3.68409 3C2.62036 4.43008 2 6.14984 2 8C2 9.85016 2.62036 11.5699 3.68409 13"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 10L7 21"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M17 21L13 10"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.5 17H15.5"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{liveStore.text}</span>
            </a>
          )
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

import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

/**
 * @titleBy text
 */
interface CardSubItems {
  text: string;
}

/**
 * @titleBy title
 */
interface Card {
  title: string;
  link: string;
  image: ImageWidget;
  subItems: CardSubItems[];
  buttonText: string;
}

export interface Props {
  cards: Card[];
}

const FloatCards = ({ cards }: Props) => {
  const id = useId();
  return (
    <div
      id={id}
      class="w-full flex items-center justify-between gap-8 max-w-7xl mx-auto lg:-translate-y-[38px] mb-8 mt-8 lg:mt-0 lg:px-0 px-4"
    >
      <Slider class="carousel w-full justify-between carousel-center gap-8">
        {cards &&
          cards.map((item, index) => (
            <Slider.Item index={index} class="carousel-item">
              <div class="p-2 border rounded-card border-[#E2E2E2] bg-white">
                <a href={item.link || "#"}>
                  <div class="relative w-full mb-2.5">
                    <div class="absolute top-0 text-white bg-purplePrimary w-full py-1 text-center text-sm font-semibold">
                      {item.title}
                    </div>
                    <Image
                      src={item.image}
                      width={264}
                      height={100}
                      alt={item.title}
                    />
                  </div>
                  <ul>
                    {item.subItems?.map((sub) => (
                      <li class="text-blackPrimary text-sm flex items-center gap-2.5 mb-2.5">
                        <Icon
                          id="SubMenuArrowRight"
                          size={24}
                          strokeWidth={1}
                        />
                        {sub.text}
                      </li>
                    ))}
                  </ul>
                  <button class="text-base font-bold w-full py-2 flex rounded-card items-center justify-center border border-purplePrimary text-purplePrimary">
                    {item.buttonText}
                  </button>
                </a>
              </div>
            </Slider.Item>
          ))}
        {
          /* <>
          <Slider.PrevButton class="absolute left-4 md:left-0 flex justify-center items-center lg:hidden">
            <Icon
              size={18}
              id="ChevronRight"
              strokeWidth={3}
              class="text-grayPrimary rotate-180 w-full"
            />
          </Slider.PrevButton>
          <Slider.NextButton class="absolute right-4 md:right-0 flex justify-center items-center lg:hidden">
            <Icon
              size={18}
              id="ChevronRight"
              strokeWidth={3}
              class="text-grayPrimary"
            />
          </Slider.NextButton>
        </> */
        }
      </Slider>

      <Slider.JS rootId={id} />
    </div>
  );
};

export default FloatCards;

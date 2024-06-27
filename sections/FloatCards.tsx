import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

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
  return (
    <div class="flex items-center justify-between max-w-7xl mx-auto -translate-y-[38px]">
      {cards &&
        cards.map((item) => {
          <div class="w-[280px] p-2 border rounded-card border-[#E2E2E2] bg-white">
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
                    <Icon id="SubMenuArrowRight" size={24} strokeWidth={1} />
                    {sub.text}
                  </li>
                ))}
              </ul>
              <a
                href={item.link || "#"}
                class="text-base font-bold w-full py-2 flex rounded-card items-center justify-center border border-purplePrimary text-purplePrimary"
              >
                {item.buttonText}
              </a>
            </a>
          </div>;
        })}
    </div>
  );
};

export default FloatCards;

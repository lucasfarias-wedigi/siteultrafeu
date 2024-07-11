import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
interface businessCard {
  title: string;
  image: ImageWidget;
  buttonText: string;
}

interface Props {
  businessCards: businessCard[];
}

const BusinessCards = ({ businessCards }: Props) => {
  if (businessCards.length < 1) return null;
  return (
    <div class="flex justify-center lg:justify-start w-full gap-8 flex-wrap my-4 max-w-7xl mx-auto">
      {businessCards.map((item) => (
        <div class="max-w-[163px] lg:max-w-[280px] w-full p-2 rounded-card border border-grayTertiary">
          <div class="relative w-full mb-2.5">
            <div class="lg:absolute top-0 bg-purplePrimary w-full text-white font-semibold text-sm flex items-center justify-center py-1">
              {item.title}
            </div>
            <Image src={item.image} alt={item.title} width={264} height={100} />
          </div>
          <button class="flex items-center justify-center w-full py-2 rounded-card border border-purplePrimary text-purplePrimary text-base font-bold">
            {item.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BusinessCards;

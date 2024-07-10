import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RichText from "../Content/RichText.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy title
 */
interface businessCard {
  title: string;
  image: ImageWidget;
  buttonText: string;
}

export interface Props {
  banner: {
    title: string;
    imageDesktop: ImageWidget;
    imageMobile: ImageWidget;
  };
  description?: HTMLWidget;
  businessCards: businessCard[];
}

const BuildYourBusiness = ({
  banner,
  description = `<p><b>Monte seu negócio de forma simples e rápida:</b> escolha o ramo de atuação!<p>`,
  businessCards,
}: Props) => {
  return (
    <div class="mb-4">
      <div class="w-full border-t border-grayTertiary py-2">
        <div class="max-w-7xl m-auto w-full flex items-center text-grayPrimary text-[11px] gap-2.5">
          <a href="/">HOME</a>
          <span>{">"}</span>
          <a href="/monteseunegocio">MONTE SEU NEGÓCIO</a>
        </div>
      </div>
      {banner.imageDesktop ||
        (banner.imageMobile && (
          <div class="flex items-center justify-center relative w-full h-[172px] mb-4">
            <Picture>
              <Source
                media="(max-width: 767px)"
                fetchPriority={"high"}
                src={banner.imageMobile}
                width={430}
                height={122}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={"high"}
                src={banner.imageDesktop}
                width={1920}
                height={468}
              />
              <img
                class="object-cover w-full h-full"
                loading={"eager"}
                src={banner.imageDesktop}
                alt={banner.title}
              />
            </Picture>
            {banner?.title && (
              <h1 class="absolute text-2xl lg:text-[40px] font-bold text-purplePrimary">
                {banner.title}
              </h1>
            )}
          </div>
        ))}
      <div class="max-w-7xl w-full m-auto">
        {description && (
          <RichText text={description} style="text-base mb-4 px-4 lg:px-0" />
        )}
        {businessCards && (
          <div class="flex justify-center w-full gap-8 flex-wrap">
            {businessCards.map((item) => (
              <div class="max-w-[163px] lg:max-w-[280px] w-full p-2 rounded-card border border-grayTertiary">
                <div class="relative w-full mb-2.5">
                  <div class="absolute top-0 bg-purplePrimary w-full text-white font-semibold text-sm flex items-center justify-center py-1">
                    {item.title}
                  </div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={264}
                    height={100}
                  />
                </div>
                <button class="flex items-center justify-center w-full py-2 rounded-card border border-purplePrimary text-purplePrimary text-base font-bold">
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildYourBusiness;

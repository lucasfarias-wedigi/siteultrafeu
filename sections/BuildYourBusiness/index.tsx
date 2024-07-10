import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import RichText from "../Content/RichText.tsx";

/**
 * @titleBy title
 */
interface business {
  title: string;
  image: ImageWidget;
  buttonText: string;
}

export interface Props {
  banner: {
    title: string;
    image: ImageWidget;
  };
  description: HTMLWidget;
  businessType: business[];
}

const BuildYourBusiness = ({
  banner,
  description =
    `<p><b>Monte seu negócio de forma simples e rápida:</b> escolha o ramo de atuação!<p>`,
  businessType,
}: Props) => {
  return (
    <div class="mb-4">
      {banner?.image && (
        <div class="flex items-center justify-center relative w-full h-[172px] mb-4">
          <Image
            src={banner.image}
            alt={banner.title}
            width={1920}
            height={172}
          />
          {banner?.title && (
            <h1 class="absolute text-[40px] font-bold text-purplePrimary">
              {banner.title}
            </h1>
          )}
        </div>
      )}
      <div class="max-w-7xl w-full m-auto">
        {description && <RichText text={description} style="text-base mb-4" />}
        {businessType && (
          <div class="w-full gap-8 flex-wrap">
            {businessType.map((item) => (
              <div class="max-w-[280px] w-full p-2 rounded-card border border-grayTertiary">
                <div class="w-full mb-2.5">
                  <div class="absolute top-0 bg-purplePrimary w-full text-white font-semibold text-sm flex items-center justify-center py-1">
                    {item.title}
                  </div>
                  <Image
                    src={item.image}
                    width={264}
                    height={100}
                    alt={item.title}
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

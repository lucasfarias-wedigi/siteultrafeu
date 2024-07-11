import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  title: string;
  imageDesktop: ImageWidget;
  imageMobile: ImageWidget;
  marginBottom: boolean;
}

const BusinessBanner = ({
  title,
  imageDesktop,
  imageMobile,
  marginBottom,
}: Props) => {
  if (!imageDesktop || !imageMobile) return null;
  return (
    <div
      class={`flex items-center justify-center h-fit relative w-full ${
        marginBottom ? "mb-4" : "mb-0"
      }`}
    >
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority={"high"}
          src={imageMobile}
          width={430}
          height={122}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={"high"}
          src={imageDesktop ? imageDesktop : imageMobile}
          width={1920}
          height={468}
        />
        <img
          sizes="(max-width: 640px) 100vw, 30vw"
          src={imageMobile}
          alt={title}
          decoding="async"
          loading="eager"
        />
      </Picture>
      {title && (
        <h1 class="absolute text-2xl lg:text-[40px] font-bold text-purplePrimary">
          {title}
        </h1>
      )}
    </div>
  );
};

export default BusinessBanner;

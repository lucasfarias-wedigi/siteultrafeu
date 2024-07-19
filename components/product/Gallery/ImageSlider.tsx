import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { useId } from "../../../sdk/useId.ts";
import { useSignal } from "@preact/signals";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout,
  } = props;

  let videoUrl = props.page.product.isVariantOf?.hasVariant?.[0]?.video?.[0]
    ?.contentUrl;

  if (videoUrl && videoUrl.includes("youtube.com/watch")) {
    const videoId = new URL(videoUrl).searchParams.get("v");
    if (videoId) {
      videoUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const { width, height } = layout || { width: 300, height: 370 };
  const aspectRatio = `${width} / ${height}`;

  const selectedImage = useSignal(images[0]);

  return (
    <div id={id} class="grid grid-flow-row">
      {/* Image Slider */}
      <div class="bg-whitePrimary relative flex justify-center lg:block">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[41.7vw] xl:w-[800px] lg:hidden">
          {videoUrl && (
            <Slider.Item
              index={0}
              class="carousel-item w-full lg:max-h-[735px]"
            >
              <iframe
                allowFullScreen
                width="800"
                height="735"
                src={`${videoUrl}?autoplay=1&mute=1`}
              >
              </iframe>
            </Slider.Item>
          )}
          {images.map((img, index) => (
            <Slider.Item
              index={videoUrl ? index + 1 : index}
              class="carousel-item w-full lg:max-h-[735px]"
            >
              <Image
                class="w-full object-contain"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden lg:block w-screen sm:w-[41.7vw] lg:w-[63.7vw] xl:w-[800px] lg:h-full relative">
          {videoUrl &&
            (
              <iframe
                allowFullScreen
                width="800"
                height="735"
                src={`${videoUrl}?autoplay=1&mute=1`}
                class="mb-4"
              >
              </iframe>
            )}
          {images.map((img, index) => (
            <div
              class={`cursor-pointer inline-block ${
                index !== 0 && !videoUrl ? "sticky top-0 max-h-[388px]" : "mb-4"
              } ${index % 2 === 0 && index !== 0 && !videoUrl ? "ml-6" : ""} ${
                videoUrl && index % 2 !== 0 ? "ml-6" : ""
              }`}
              key={index}
              onClick={() => {
                [images[0], images[index]] = [images[index], images[0]];
                if (!videoUrl) selectedImage.value = images[0];
              }}
            >
              <Image
                class={`${
                  index === 0 && !videoUrl ? "w-full" : "w-[314px] xl:w-[388px]"
                } object-contain`}
                sizes="(max-width: 640px) 100vw, 40vw"
                src={selectedImage.value.url === img.url
                  ? images[0].url ?? ""
                  : img.url ?? ""}
                alt={selectedImage.value.url === img.url
                  ? images[0].alternateName
                  : img.alternateName}
                width={width}
                height={height}
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        {
          /* <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton> */
        }

        <div class="absolute top-2 right-2 bg-base-100 rounded-full hidden">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      {/* Dots */}

      <ul class="carousel carousel-center gap-4 justify-center px-4 bg-white py-4 lg:hidden">
        {videoUrl && (
          <li class="carousel-item">
            <Slider.Dot index={0}>
              <div class="w-3 h-3 rounded-full group-disabled:bg-greenPrimary bg-transparent border-[1px] border-grayTertiary" />
            </Slider.Dot>
          </li>
        )}
        {images.map((_img, index) => (
          <li class="carousel-item">
            <Slider.Dot index={videoUrl ? index + 1 : index}>
              <div class="w-3 h-3 rounded-full group-disabled:bg-greenPrimary bg-transparent border-[1px] border-grayTertiary" />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} />
    </div>
  );
}

import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../islands/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { SectionProps } from "deco/mod.ts";

export interface Data {
  colorName: string;
  colorimg: string;
}

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  mdColors: Data[];
}

export default function ProductDetails({
  page,
  mdColors,
}: SectionProps<typeof loader>) {
  if (!page?.seo) {
    return <NotFound />;
  }
  const { breadcrumbList } = page;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  return (
    <>
      <div class="border-t-[1px] border-solid border-grayTertiary bg-whitePrimary xl:bg-white">
        <div class="max-w-7xl mx-auto text-[11px] font-normal text-grayPrimary uppercase px-4 xl:px-0">
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        </div>
      </div>
      <div class="bg-whitePrimary mb-4 relative">
        <div class="w-full max-w-7xl mx-auto lg:py-4 flex flex-col gap-6">
          <div class="flex flex-col lg:gap-6 lg:flex-row lg:justify-center">
            <ImageGallerySlider page={page} />
            <ProductInfo page={page} mdColors={mdColors} />
          </div>
        </div>
      </div>
    </>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

export const loader = async (props: Props, _req: Request) => {
  const response = await fetch(
    "https://ultrafeu.myvtex.com/api/dataentities/AC/search?_fields=colorName,colorimg",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.vtex.ds.v10+json",
      },
    },
  );

  const data = await response.json<Data[]>();

  return {
    ...props,
    mdColors: data,
  };
};

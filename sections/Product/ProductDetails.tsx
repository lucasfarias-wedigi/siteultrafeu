import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
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
    <><div class="border-t-[1px] border-solid border-grayTertiary bg-whitePrimary xl:bg-white"><div class="max-w-7xl mx-auto text-[11px] font-normal text-grayPrimary uppercase px-4 xl:px-0"><Breadcrumb itemListElement={breadcrumb.itemListElement} /></div></div>
      <div class="bg-whitePrimary">
        <div class="w-full max-w-7xl mx-auto lg:py-4 flex flex-col gap-6">
          <div class="flex flex-col lg:gap-6 lg:flex-row lg:justify-center">
            <ImageGallerySlider
              page={page} />
            <ProductInfo
              page={page} />
          </div>
        </div>
      </div></>
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

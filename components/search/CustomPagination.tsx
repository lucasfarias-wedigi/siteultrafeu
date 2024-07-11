import Icon from "../ui/Icon.tsx";

interface PageInfo {
  nextPage?: string;
  previousPage?: string;
  currentPage: number;
  records?: number;
  recordPerPage?: number;
  pageTypes?: string[];
}

export interface PageComponentProps {
  pageInfo: PageInfo;
  totalProducts: number;
}

const CustomPagination = ({ pageInfo, totalProducts }: PageComponentProps) => {
  const pages = Array.from(
    {
      length: Math.ceil(
        (pageInfo.records || totalProducts) /
          (pageInfo.recordPerPage || totalProducts),
      ),
    },
    (_, i) => i + 1,
  );
  const updatePageParam = (url: string, pageNumber: number): string => {
    const separator = url.includes("?") ? "&" : "?";
    if (url.includes("page=")) {
      return url.replace(/(page=)\d+/, `$1${pageNumber}`);
    } else {
      return url + separator + `page=${pageNumber}`;
    }
  };
  return (
    <div class="hidden lg:flex items-center join justify-end max-w-[766px]">
      <a
        aria-label="previous page link"
        rel="prev"
        href={pageInfo.previousPage ?? "#"}
        class=""
      >
        <Icon
          id="ChevronRight"
          size={24}
          strokeWidth={2}
          class="rotate-180 text-purplePrimary"
        />
      </a>
      <div class="w-full flex items-center justify-start gap-1 overflow-hidden">
        {pages.map((item, i) => (
          <>
            <a
              href={updatePageParam(
                pageInfo.nextPage || pageInfo.previousPage || "#",
                i + 1,
              )}
            >
              <button
                class={`flex items-center justify-center hover:bg-purplePrimary hover:text-white text-sm w-[21px] h-[21px] ${
                  pageInfo.currentPage === i + 1
                    ? "bg-purplePrimary text-white"
                    : ""
                }`}
              >
                {item}
              </button>
            </a>
          </>
        ))}
      </div>
      <a
        aria-label="next page link"
        rel="next"
        href={pageInfo.nextPage ?? "#"}
        class=""
      >
        <Icon
          id="ChevronRight"
          size={24}
          strokeWidth={2}
          class="text-purplePrimary"
        />
      </a>
    </div>
  );
};

export default CustomPagination;

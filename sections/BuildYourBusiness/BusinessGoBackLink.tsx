export interface Props {
  title?: string;
  link?: {
    url: string;
    text: string;
  };
}
const BusinessGoBackLink = ({
  title,
  link = {
    url: "/monteseunegocio",
    text: "Voltar para escolher outro negócio",
  },
}: Props) => {
  return (
    <div class="bg-purplePrimary w-full">
      <div class="relative flex items-center py-1 w-full max-w-7xl mb-4 mx-auto">
        {link?.url && (
          <div class="left-0 absolute">
            <a
              href={link.url}
              class="text-sm text-white flex items-center gap-2.5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 6H15.5C17.9853 6 20 8.01472 20 10.5C20 12.9853 17.9853 15 15.5 15H4"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99998 12C6.99998 12 4.00001 14.2095 4 15C3.99999 15.7906 7 18 7 18"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {link.text}
            </a>
          </div>
        )}
        {title && (
          <h4 class="font-bold text-base text-white m-auto">{title}</h4>
        )}
      </div>
    </div>
  );
};

export default BusinessGoBackLink;

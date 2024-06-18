import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholders?: {
    email?: string;
    name?: string;
  };
  buttonText?: string;
  /** @format html */
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter({ content }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="text-white bg-blueSecondary py-8 w-full px-4 lg:px-0">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-0 items-center lg:justify-between max-w-7xl m-auto w-full">
        <div class="flex flex-col gap-4 w-full lg:max-w-[352px]">
          {content?.title && (
            <h4 class="text-2xl font-semibold">{content?.title}</h4>
          )}
          {content?.description && (
            <div class="text-sm font-medium">{content?.description}</div>
          )}
        </div>
        <div class="w-full flex justify-end items-center">
          <form class="form-control w-full" onSubmit={handleSubmit}>
            <div class="flex flex-col lg:flex-row gap-4 lg:justify-end">
              <input
                name="name"
                class="py-3 w-full lg:max-w-[447px] px-4 text-sm text-grayPrimary"
                placeholder={content?.form?.placeholders?.name ||
                  "Digite seu nome"}
              />
              <input
                name="email"
                class="py-3 px-4 w-full lg:max-w-[314px] text-sm text-grayPrimary"
                placeholder={content?.form?.placeholders?.email ||
                  "Digite seu email"}
                required
              />
              <button
                type="submit"
                class="disabled:loading bg-orangePrimary text-white p-2.5 flex items-center justify-center self-end"
                disabled={loading}
              >
                <svg
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66669 14H27.3334"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5 1.16675L27.3333 14.0001L14.5 26.8334"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;

import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import CustomDivider from "../../components/CustomDivider.tsx";

export interface layout {
  /** @description Default is 12 */
  numberOfPosts?: number;
  /** @description Up to 6. Default is 4 */
  postsPerLine?: number;
}

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}

export interface Props {
  title?: string;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;
  layout?: layout;
}

export async function loader(
  { title, facebookToken, layout }: Props,
  _req: Request,
) {
  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;
  const response = await fetch(url);
  const data: Data[] = await response.json();

  console.log(data);
  return {
    data: data.slice(0, layout?.numberOfPosts ?? 12),
    title,
    layout,
  };
}

export default function InstagramPosts({
  title,
  layout,
  data = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url: "",
    },
  ],
}: SectionProps<typeof loader>) {
  return (
    <div class="w-full px-4 flex flex-col gap-8 mb-8 lg:px-0">
      <div class="w-full max-w-7xl m-auto">
        <CustomDivider>
          <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl whitespace-nowrap">
            {title}
          </h2>
        </CustomDivider>
      </div>
      <div class="hidden lg:grid-cols-6">
      </div>
      <div
        class={`grid grid-cols-2 lg:grid-cols-${
          layout?.postsPerLine || 4
        } gap-4 items-center justify-center place-items-center`}
      >
        {data.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            title="Visite nosso instagram"
            class="rounded-lg overflow-hidden w-full max-w-[350px] sm:max-w-[350px] group"
          >
            {item.media_type === "IMAGE"
              ? (
                <Image
                  class="max-w-full max-h-full object-cover w-full group-hover:scale-110  transition duration-400 group-hover:brightness-90"
                  src={item.media_url ?? ""}
                  alt="Imagem do instagram"
                  width={350}
                  height={350}
                  loading="lazy"
                />
              )
              : (
                <video controls class="max-w-full max-h-full object-cover">
                  <source src={item.media_url}></source>
                </video>
              )}
          </a>
        ))}
      </div>
    </div>
  );
}

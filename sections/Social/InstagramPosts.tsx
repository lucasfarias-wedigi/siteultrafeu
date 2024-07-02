import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import CustomDivider from "../../components/CustomDivider.tsx";

export interface InstagramResponse {
  data: Data[];
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
}

export async function loader({ title, facebookToken }: Props, _req: Request) {
  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  try {
    const response = await fetch(url);
    const { data }: InstagramResponse = await response.json();
    return {
      data: data.slice(0, 5),
      title,
    };
  } catch (err) {
    console.error("Error fetching posts from Instagram", err);
    return {
      data: [],
      title,
    };
  }
}

export default function InstagramPosts({
  title,
  data,
}: SectionProps<typeof loader>) {
  if (data.length <= 0) return null;
  return (
    <div class="w-full px-4 py-8 flex flex-col gap-14 lg:gap-20 lg:py-10 lg:px-0">
      <div class="max-w-7xl w-full m-auto">
        <CustomDivider>
          <h2 class="text-start md:text-center text-blackPrimary font-semibold text-2xl whitespace-nowrap">
            {title}
          </h2>
        </CustomDivider>
      </div>

      <div
        class={`grid grid-cols-2 lg:grid-cols-5 items-center justify-center place-items-center`}
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

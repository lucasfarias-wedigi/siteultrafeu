/**
 * @titleBy name
 */
interface Level {
  link: string;
  name: string;
}

interface Props {
  levels: Level[];
}

const BusinessBreadCrumb = ({ levels }: Props) => {
  if (levels.length < 1) return null;
  return (
    <div class="w-full border-t border-grayTertiary py-2">
      <div class="max-w-7xl m-auto w-full flex items-center text-grayPrimary gap-2.5 text-[11px] px-4 lg:px-0">
        {levels.map((level, index) => (
          <div key={index} class="flex items-center gap-2.5">
            <a href={level.link}>{level.name}</a>
            {index < levels.length - 1 && <span>{">"}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessBreadCrumb;

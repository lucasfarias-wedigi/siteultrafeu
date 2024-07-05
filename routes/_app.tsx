import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Add custom font*/}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 100;
                font-display: swap;
                src: url(/fonts/MinorkSans-Thin.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 200;
                font-display: swap;
                src: url(/fonts/MinorkSans-Extralight.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 200;
                font-display: swap;
                src: url(/fonts/MinorkSans-ExtralightItalic.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 300;
                font-display: swap;
                src: url(/fonts/MinorkSans-Light.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 300;
                font-display: swap;
                src: url(/fonts/MinorkSans-LightItalic.otf) format('opentype');
          }
                              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/fonts/MinorkSans-Regular.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url(/fonts/MinorkSans-Medium.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 500;
                font-display: swap;
                src: url(/fonts/MinorkSans-MediumItalic.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 600;
                font-display: swap;
                src: url(/fonts/MinorkSans-Semibold.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 600;
                font-display: swap;
                src: url(/fonts/MinorkSans-SemiboldItalic.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(/fonts/MinorkSans-Bold.otf) format('opentype');
          }
              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 700;
                font-display: swap;
                src: url(/fonts/MinorkSans-BoldItalic.otf) format('opentype');
          }
                              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 800;
                font-display: swap;
                src: url(/fonts/MinorkSans-Extrabold.otf) format('opentype');
          }
                                              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 800;
                font-display: swap;
                src: url(/fonts/MinorkSans-ExtraboldItalic.otf) format('opentype');
          }
                                              @font-face {
                font-family: 'MinorkSans';
                font-style: normal;
                font-weight: 900;
                font-display: swap;
                src: url(/fonts/MinorkSans-Extrablack.otf) format('opentype');
          }
                                              @font-face {
                font-family: 'MinorkSans';
                font-style: italic;
                font-weight: 900;
                font-display: swap;
                src: url(/fonts/MinorkSans-ExtrablackItalic.otf) format('opentype');
          }
            `,
          }}
        />
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});

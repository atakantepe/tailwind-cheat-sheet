import fs from "fs";
import { parse } from "css";

const cssString = fs.readFileSync("./dist/tailwind-output.css", "utf8");

const obj = parse(cssString);
const classes = {};

if (obj.stylesheet) {
  obj.stylesheet.rules.forEach((rule) => {
    if (rule.type === "rule") {
      if (rule.declarations) {
        rule.selectors.forEach((selector) => {
          let properties = "";
          rule.declarations.forEach((declaration) => {
            properties += `${declaration.property}: ${declaration.value}; `;
          });
          classes[selector] = properties.trim();
        });
      }
    }
  });
}

const sectionMapping = {
  layout: {
    "aspect ratio": ["aspect-"],
    container: ["container"],
    columns: ["columns-"],
    "break after": ["break-after-"],
    "break before": ["break-before-"],
    "break inside": ["break-inside-", "break-inside-avoid-"],
    "box decoration break": ["box-decoration-"],
    "box sizing": ["box-"],
    display: [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "table",
      "table-caption",
      "inline-table",
      "table-cell",
      "table-column",
      "table-column-group",
      "table-footer-group",
      "table-header-group",
      "table-row-group",
      "table-row",
      "flow-root",
      "grid",
      "inline-grid",
      "contents",
      "hidden",
      "list-item",
    ],
    float: ["float-"],
    clear: ["clear-"],
    isolation: ["isolate", "isolation-"],
    "object position": [
      "object-bottom",
      "object-center",
      "object-left",
      "object-left-bottom",
      "object-left-top",
      "object-right",
      "object-right-bottom",
      "object-right-top",
      "object-top",
    ],
    "object fit": [
      "object-contain",
      "object-cover",
      "object-fill",
      "object-none",
      "object-scale-down",
    ],
    overflow: ["overflow-"],
    overscroll: ["overscroll-"],
    position: ["static", "fixed", "absolute", "relative", "sticky"],
    "Top / Right / Bottom / Left": [
      "inset-",
      "inset-x-",
      "inset-y-",
      "top-",
      "right-",
      "bottom-",
      "left-",
      "end-",
      "start-",
    ],
    visibility: ["visible", "invisible", "collapse"],
    zindex: ["z-"],
  },
  flexboxGrid: {
    "flex basis": ["basis-"],
    "flex direction": [
      "flex-row",
      "flex-row-reverse",
      "flex-col",
      "flex-col-reverse",
    ],
    "flex wrap": ["flex-wrap", "flex-wrap-reverse", "flex-nowrap"],
    flex: ["flex-"],
    "flex grow": ["grow", "grow-"],
    "flex shrink": ["flex-shrink", "flex-shrink-"],
    order: ["order-"],
    "grid template columns": ["grid-cols-"],
    "grid column start/end": ["col-start-", "col-end-", "col-span-"],
    "grid template rows": ["grid-rows-"],
    "grid row start/end": ["row-start-", "row-end-", "row-span-"],
    "grid auto flow": [
      "grid-flow-row",
      "grid-flow-col",
      "grid-flow-row-dense",
      "grid-flow-col-dense",
    ],
    "grid auto columns": [
      "auto-cols-auto",
      "auto-cols-fr",
      "auto-cols-max",
      "auto-cols-min",
    ],
    "grid auto rows": [
      "auto-rows-auto",
      "auto-rows-fr",
      "auto-rows-max",
      "auto-rows-min",
    ],
    gap: ["gap-"],
    "justify content": ["justify-"],
    "justify items": ["justify-items-"],
    "justify self": ["justify-self-"],
    "align content": ["content-"],
    "align items": ["items-"],
    "align self": ["self-"],
    "place content": ["place-content-"],
    "place items": ["place-items-"],
    "place self": ["place-self-"],
  },
  spacing: {
    margin: ["m-", "mx-", "my-", "mt-", "mr-", "mb-", "ml-", "me-", "ms-"],
    padding: ["p-", "px-", "py-", "pt-", "pr-", "pb-", "pl-", "pe-", "ps-"],
    "space between": ["space-x-", "space-y-"],
  },
  sizing: {
    width: ["w-"],
    "min width": ["min-w-"],
    "max width": ["max-w-"],
    height: ["h-"],
    "min height": ["min-h-"],
    "max height": ["max-h-"],
    size: ["size-"],
  },
  typography: {
    "font family": ["font-sans", "font-serif", "font-mono"],
    "font size": [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ],
    "font smoothing": ["antialiased", "subpixel-antialiased"],
    "font style": ["italic", "not-italic"],
    "font weight": ["font-"],
    "font variant numeric": [
      "normal-nums",
      "ordinal",
      "slashed-zero",
      "lining-nums",
      "oldstyle-nums",
      "proportional-nums",
      "tabular-nums",
      "diagonal-fractions",
      "stacked-fractions",
    ],
    "letter spacing": ["tracking-"],
    "line clamp": ["line-clamp-"],
    "line height": ["leading-"],
    "list style image": ["list-image-none"],
    "list style position": ["list-inside", "list-outside"],
    "list style type": ["list-disc", "list-decimal", "list-none"],
    "text align": [
      "text-left",
      "text-center",
      "text-right",
      "text-justify",
      "text-start",
      "text-end",
    ],
    "text color": ["text-"],
    "text decoration": ["underline", "line-through", "no-underline"],
    "text-decoration color": ["decoration-"],
    "text decoration style": [
      "decoration-solid",
      "decoration-double",
      "decoration-dotted",
      "decoration-dashed",
      "decoration-wavy",
    ],
    "text decoration thickness": [
      "decoration-auto",
      "decoration-from-font",
      "decoration-0",
      "decoration-1",
      "decoration-2",
      "decoration-4",
      "decoration-8",
    ],
    "text underline offset": ["underline-offset-"],
    "text transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
    "text overflow": ["truncate", "text-ellipsis", "text-clip"],
    "text wrap": ["text-wrap", "text-nowrap", "text-balance", "text-pretty"],
    "text indent": ["indent-"],
    "vertical align": ["align-"],
    whitespace: ["whitespace-"],
    "word break": ["break-normal", "break-words", "break-all"],
    hyphens: ["hyphens-none", "hyphens-manual", "hyphens-auto"],
    content: ["content-none"],
    "placeholder color": ["placeholder-"],
    "placeholder opacity": ["placeholder-opacity-"],
  },
  backgrounds: {
    "background attachment": ["bg-fixed", "bg-local", "bg-scroll"],
    "background color": ["bg-"],
    "background clip": ["bg-clip-"],
    "background opacity": ["bg-opacity-"],
    "background origin": ["bg-origin-"],
    "background position": [
      "bg-bottom",
      "bg-center",
      "bg-left",
      "bg-left-",
      "bg-right",
      "bg-right-",
      "bg-top",
    ],
    "background repeat": [
      "bg-repeat",
      "bg-repeat-",
      "bg-no-repeat",
      "bg-repeat-x",
      "bg-repeat-y",
    ],
    "background size": ["bg-auto", "bg-cover", "bg-contain"],
    "background image": ["bg-none", "bg-gradient-"],
    "gradient color stops": ["from-", "via-", "to-"],
  },
  borders: {
    "border radius": ["rounded", "rounded-"],
    "border width": [
      "border",
      "border-0",
      "border-2",
      "border-4",
      "border-8",
      "border-x",
      "border-x-0",
      "border-x-2",
      "border-x-4",
      "border-x-8",
      "border-y",
      "border-y-0",
      "border-y-2",
      "border-y-4",
      "border-y-8",
      "border-s",
      "border-s-0",
      "border-s-2",
      "border-s-4",
      "border-s-8",
      "border-t",
      "border-t-0",
      "border-t-2",
      "border-t-4",
      "border-t-8",
      "border-r",
      "border-r-0",
      "border-r-2",
      "border-r-4",
      "border-r-8",
      "border-b",
      "border-b-0",
      "border-b-2",
      "border-b-4",
      "border-b-8",
      "border-l",
      "border-l-0",
      "border-l-2",
      "border-l-4",
      "border-l-8",
      "boder-e",
      "border-e-0",
      "border-e-2",
      "border-e-4",
      "border-e-8",
    ],
    "border color": ["border-"],
    "border style": [
      "border-solid",
      "border-dashed",
      "border-dotted",
      "border-double",
      "border-none",
      "border-hidden",
    ],
    "divide width": [
      "divide-x",
      "divide-x-0",
      "divide-x-2",
      "divide-x-4",
      "divide-x-8",
      "divide-y",
      "divide-y-0",
      "divide-y-2",
      "divide-y-4",
      "divide-y-8",
      "divide-x-reverse",
      "divide-y-reverse",
    ],
    "divide color": ["divide-"],
    "divide style": [
      "divide-solid",
      "divide-dashed",
      "divide-dotted",
      "divide-double",
      "divide-none",
    ],
    "outline width": [
      "outline-0",
      "outline-1",
      "outline-2",
      "outline-4",
      "outline-8",
    ],
    "outline color": ["outline-"],
    "outline style": [
      "outline",
      "outline-dashed",
      "outline-dotted",
      "outline-double",
      "outline-none",
    ],
    "outline offset": ["outline-offset-"],
    "ring width": [
      "ring",
      "ring-0",
      "ring-1",
      "ring-2",
      "ring-4",
      "ring-8",
      "ring-inset",
    ],
    "ring color": ["ring-"],
    "ring-offset width": [
      "ring-offset-0",
      "ring-offset-1",
      "ring-offset-2",
      "ring-offset-4",
      "ring-offset-8",
    ],
    "ring-offset color": ["ring-offset-"],
  },
  effects: {
    "box shadow": ["shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner", "shadow-none"],
    "box shadow color": ["shadow-"],
    "opacity": ["opacity-"],
    "mix blend mode": ["mix-blend-"],
    "background blend mode": ["bg-blend-"],
  },
  filters: {
    "blur": ["blur","blur-", "blur-none"],
    "brightness": ["brightness-"],
    "contrast": ["contrast-"],
    "drop shadow": ["drop-shadow","drop-shadow-"],
    "grayscale": ["grayscale","grayscale-"],
    "hue rotate": ["hue-rotate-"],
    "invert": ["invert","invert-"],
    "saturate": ["saturate-"],
    "sepia": ["sepia","sepia-"],
    "backdrop blur": ["backdrop-blur","backdrop-blur-"],
    "backdrop brightness": ["backdrop-brightness-"],
    "backdrop contrast": ["backdrop-contrast-"],
    "backdrop grayscale": ["backdrop-grayscale","backdrop-grayscale-"],
    "backdrop hue rotate": ["backdrop-hue-rotate-"],
    "backdrop invert": ["backdrop-invert","backdrop-invert-"],
    "backdrop opacity": ["backdrop-opacity-"],
    "backdrop saturate": ["backdrop-saturate-"],
    "backdrop sepia": ["backdrop-sepia","backdrop-sepia-"],
  },
  tables:{
    "border collapse": ["border-collapse", "border-separate"],
    "border spacing": ["border-spacing-"],
    "table layout": ["table-auto", "table-fixed"],
    "caption side": ["caption-top", "caption-bottom"],
  },
  "transitions and animations": {
    "transition property": ["transition-none", "transition-all", "transition", "transition-colors", "transition-opacity", "transition-shadow", "transition-transform"],
    "transition duration": ["duration-"],
    "transition timing function": ["ease-linear", "ease-in", "ease-out", "ease-in-out"],
    "transition delay": ["delay-"],
    "animate": ["animate-none", "animate-spin", "animate-ping", "animate-pulse", "animate-bounce"],
  },
  "transforms": {
    "scale": ["scale-"],
    "rotate": ["rotate-"],
    "translate": ["translate-"],
    "skew": ["skew-"],
    "transform origin": ["origin-"],
  },
  "interactivity": {
    "accent color": ["accent-"],
    "appearance": ["appearance-"],
    "cursor":["cursor-"],
    "caret color": ["caret-"],
    "pointer events": ["pointer-events-"],
    "resize": ["resize","resize-"],
    "scroll behavior": ["scroll-auto", "scroll-smooth"],
    "scroll margin": ["scroll-m-", "scroll-mx-", "scroll-my-", "scroll-mt-", "scroll-mr-", "scroll-mb-", "scroll-ml-", "scroll-me-", "scroll-ms-"],
    "scroll padding": ["scroll-p-", "scroll-px-", "scroll-py-", "scroll-pt-", "scroll-pr-", "scroll-pb-", "scroll-pl-", "scroll-pe-", "scroll-ps-"],
    "scroll snap align": ["snap-start", "snap-end", "snap-center", "snap-align-none"],
    "scroll snap stop": ["snap-normal","snap-always"],
    "scroll snap type": ["snap-"],
    "touch action": ["touch-"],
    "user select": ["select-none", "select-text", "select-all", "select-auto"],
    "will change": ["will-change-"],
  },
  "svg": {
    "fill": ["fill-"],
    "stroke": ["stroke-"],
    "stroke width": ["stroke-0", "stroke-1", "stroke-2"],
  },
  "accessibility": {
    "screen readers": ["sr-only", "not-sr-only"],
    "focused color adjust":["forced-color-adjust-auto", "forced-color-adjust-none"],
  }
};

function organizeClasses(classes, sectionMapping) {
  const sections = {};

  const tuples = [];
  for (const section in sectionMapping) {
    for (const subsection in sectionMapping[section]) {
      for (const prefix of sectionMapping[section][subsection]) {
        tuples.push([section, subsection, prefix]);
      }
    }
  }

  const sortedTuples = tuples.sort((a, b) => b[2].length - a[2].length);

  for (const className in classes) {
    const properties = classes[className];

    let sectionType = "Other";
    let subsectionType = null;

    for (const tuple of sortedTuples) {
      const [section, subsection, prefix] = tuple;
      if (
        (prefix.endsWith("-") &&
          (className.startsWith(`.${prefix}`) ||
            className.startsWith(`.-${prefix}`))) ||
        (!prefix.endsWith("-") &&
          (className.startsWith(`.${prefix}-`) ||
            className.startsWith(`.-${prefix}-`) ||
            className === `.${prefix}`))
      ) {
        sectionType = section;
        subsectionType = subsection;
        break;
      }
    }
    if (!sections[sectionType]) {
      sections[sectionType] = {};
    }
    if (!sections[sectionType][subsectionType]) {
      sections[sectionType][subsectionType] = {};
    }
    sections[sectionType][subsectionType][className.replace(/\\/g, "")] =
      properties
        .split(";")
        .map((prop) => prop.trim())
        .join(";");
  }

  return sections;
}

const sections = organizeClasses(classes, sectionMapping);

for (const section in sections) {
  fs.writeFileSync(`./dist/${section}.json`, JSON.stringify(sections[section], null, 2));
}
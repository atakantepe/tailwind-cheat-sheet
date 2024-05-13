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
  },
  // TODO: Add the rest of the sections
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


fs.writeFileSync("./dist/sections.json", JSON.stringify(sections, null, 2));

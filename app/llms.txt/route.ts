import { getIcons } from "@/actions/get-icons";
import { LINK, SITE } from "@/constants";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";

export function GET() {
  const icons = getIcons();

  const iconLinks = icons
    .map((icon) => {
      const pascal = kebabToPascalCase(icon.name);
      const readable = icon.name.replace(/-/g, " ");
      const keywords = icon.keywords.slice(0, 4).join(", ");
      return `- [${pascal}](${SITE.URL}/icons/${icon.name}.md): Animated ${readable} icon for React${keywords ? ` — keywords: ${keywords}` : ""}`;
    })
    .join("\n");

  const content = `# ${SITE.NAME}

> Open-source collection of ${icons.length}+ beautifully crafted animated React icons based on Lucide, powered by Motion. MIT licensed and copy-paste ready.

## Docs

- [Home](${SITE.URL}/index.md): Browse all icons and copy install commands
- [Sponsorship](${SITE.URL}/sponsorship.md): Support the project
- [Contributing Guide](${LINK.GITHUB}/blob/main/CONTRIBUTING.md): How to add or improve icons
- [License (MIT)](${LINK.LICENSE}): License terms
- [GitHub Repository](${LINK.GITHUB}): Source code and issue tracker

## Skills

- [Agent Skill](${SITE.URL}/skill.md): Operating guide for installing and using icons
- [Full Documentation](${SITE.URL}/llms-full.txt): Complete corpus of every icon and usage

## Installation

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/{icon-name}.json"
\`\`\`

Replace \`{icon-name}\` with the desired icon name in kebab-case (e.g. \`activity\`, \`arrow-right\`).

## Usage

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

Each icon is a React component that animates on hover. All standard SVG props are forwarded.

## Icons

${iconLinks}

## Optional

- [Svelte port](https://www.movingicons.dev/): by @jis3r
- [Vue port](https://imfenghuang.github.io/icons/): by @imfenghuang
- [Angular port](https://github.com/ajitzero/animated-icons): by @ajitzero
- [Flutter port](https://pub.dev/packages/flutter_lucide_animated): by @ravikovind
- [Author X](${LINK.TWITTER}): ${SITE.AUTHOR.TWITTER} on X
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

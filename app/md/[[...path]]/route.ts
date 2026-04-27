import { getIcons } from "@/actions/get-icons";
import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { SUPPORT_LIST } from "@/lib/data/support-list";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";

type Params = { params: Promise<{ path?: string[] }> };

const markdownResponse = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

const renderHome = () => {
  const icons = getIcons();
  return `# ${SITE.NAME}

> ${SITE.DESCRIPTION.SHORT}

${SITE.DESCRIPTION.LONG}

## Links

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- License: ${LINK.LICENSE}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})

## Tech Stack

- React components written in TypeScript
- Animations powered by [Motion](${LINK.MOTION})
- Visual design based on [Lucide](${LINK.LUCIDE})

## Installation

Install a single icon via the shadcn CLI:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/{icon-name}.json"
\`\`\`

Replace \`{icon-name}\` with the desired icon name in kebab-case.

## Usage

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

Each icon is a React component that animates on hover. All standard SVG props are forwarded.

## Discover

- Index of every page: ${SITE.URL}/llms.txt
- Full corpus for long-context agents: ${SITE.URL}/llms-full.txt
- Agent skill: ${SITE.URL}/skill.md
- Per-icon markdown: ${SITE.URL}/icons/{icon-name}.md

## Ports

- Svelte: https://www.movingicons.dev/ by @jis3r
- Vue: https://imfenghuang.github.io/icons/ by @imfenghuang
- Angular: https://github.com/ajitzero/animated-icons by @ajitzero
- Flutter: https://pub.dev/packages/flutter_lucide_animated by @ravikovind

## Stats

- ${icons.length} animated icons available
- MIT licensed — free for personal and commercial use
`;
};

const renderSponsorship = () => {
  const tiers = SUPPORT_LIST.map(
    (tier) => `- $${tier.price}: ${tier.link}`
  ).join("\n");

  return `# Sponsor ${SITE.NAME}

> Support the development of ${SITE.NAME} — a free, open-source library of animated React icons.

Sponsorship is entirely optional. The library is MIT licensed and free for personal and commercial use. This page exists for those who asked for a way to give back.

## How to support

Pick any amount and complete checkout via Creem:

${tiers}

## Other ways to help

- Star or share the GitHub repo: ${LINK.GITHUB}
- Contribute new icons or fixes: ${LINK.GITHUB}/blob/main/CONTRIBUTING.md
- Reach out on X: ${SITE.AUTHOR.TWITTER}

Source page: ${SITE.URL}/sponsorship
`;
};

const renderIcon = (slug: string) => {
  const icon = ICON_LIST.find((i) => i.name === slug);
  if (!icon) return null;

  const pascal = kebabToPascalCase(icon.name);
  const readable = icon.name.replace(/-/g, " ");

  return `# ${pascal}

> Animated ${readable} icon for React — part of ${SITE.NAME}.

Source page: ${SITE.URL}/icons/${icon.name}

## Install

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/${icon.name}.json"
\`\`\`

## Usage

\`\`\`tsx
import { ${pascal} } from "@/components/icons/${icon.name}";

export function Demo() {
  return <${pascal} className="size-6" />;
}
\`\`\`

The component animates on hover by default. All standard SVG props are forwarded.

## Keywords

${icon.keywords.map((k) => `- ${k}`).join("\n")}
`;
};

export async function GET(_: Request, { params }: Params) {
  const { path = [] } = await params;

  if (path.length === 0) {
    return markdownResponse(renderHome());
  }

  if (path.length === 1 && path[0] === "sponsorship") {
    return markdownResponse(renderSponsorship());
  }

  if (path.length === 2 && path[0] === "icons") {
    const md = renderIcon(path[1]);
    if (md) return markdownResponse(md);
  }

  return new Response("Not found", { status: 404 });
}

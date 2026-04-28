import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

export function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "llms-full.txt",
    userAgent: req.headers.get("user-agent") ?? "",
  });
  const sections = ICON_LIST.map((icon) => {
    const pascal = kebabToPascalCase(icon.name);
    const readable = icon.name.replace(/-/g, " ");
    return `## ${pascal}

URL: ${SITE.URL}/icons/${icon.name}
Markdown: ${SITE.URL}/icons/${icon.name}.md

Animated ${readable} icon for React.

Install:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/${icon.name}.json"
\`\`\`

Use:

\`\`\`tsx
import { ${pascal} } from "@/components/icons/${icon.name}";

export function Demo() {
  return <${pascal} className="size-6" />;
}
\`\`\`

Keywords: ${icon.keywords.join(", ")}
`;
  }).join("\n");

  const content = `# ${SITE.NAME} — full documentation

> ${SITE.DESCRIPTION.SHORT}

This file is the complete corpus of every icon in ${SITE.NAME}, suitable for ingestion by long-context agents.

Site: ${SITE.URL}
Repo: ${LINK.GITHUB}
License: MIT (${LINK.LICENSE})
Author: ${SITE.AUTHOR.TWITTER} — ${LINK.TWITTER}

# About

${SITE.DESCRIPTION.LONG}

Built with React, TypeScript, [Motion](${LINK.MOTION}) for animations, and based on [Lucide](${LINK.LUCIDE}) icon designs.

# Installation

Install any single icon via the shadcn CLI. Replace \`<icon-name>\` with a kebab-case name from the list below:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/<icon-name>.json"
\`\`\`

# Usage

Each icon is a React component that animates on hover. All standard SVG props are forwarded.

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

# Discovery

- Index: ${SITE.URL}/llms.txt
- Skill: ${SITE.URL}/skill.md
- Per-icon page: ${SITE.URL}/icons/<name>
- Per-icon markdown: ${SITE.URL}/icons/<name>.md

# Ports

- Svelte: https://www.movingicons.dev/ by @jis3r
- Vue: https://imfenghuang.github.io/icons/ by @imfenghuang
- Angular: https://github.com/ajitzero/animated-icons by @ajitzero
- Flutter: https://pub.dev/packages/flutter_lucide_animated by @ravikovind

# Icons (${ICON_LIST.length} total)

${sections}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

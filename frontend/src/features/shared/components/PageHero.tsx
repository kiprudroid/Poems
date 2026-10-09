import type { ReactNode } from "react";
import { Badge } from "@/features/shared/components/ui/Badge";
import { OrnamentRule } from "@/features/shared/components/ui/OrnamentRule";

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export const PageHero = ({
  kicker,
  title,
  description,
  children,
}: PageHeroProps): ReactNode => (
  <section className="mx-auto max-w-2xl pb-8 text-center">
    <Badge tone="gilt">{kicker}</Badge>
    <h1 className="pt-4 font-display text-5xl leading-tight font-semibold text-balance">
      {title}
    </h1>
    <p className="pt-3 text-xl text-ink-500 italic">{description}</p>
    <OrnamentRule className="mx-auto max-w-xs pt-6" />
    {children ? <div className="pt-6">{children}</div> : null}
  </section>
);

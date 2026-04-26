/**
 * Trip planner page — Client-Side Rendered.
 * Wraps the PlannerClient component which handles all in-browser computation.
 */
import type { Locale } from "@/lib/types";
import { getT } from "@/lib/i18n/translations";
import PlannerClient from "@/components/planner/PlannerClient";

interface Props {
  params: { locale: Locale };
}

export default function PlanPage({ params }: Props) {
  const t = getT(params.locale);
  return <PlannerClient locale={params.locale} t={t} />;
}

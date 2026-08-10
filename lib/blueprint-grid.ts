/** Subtle blueprint hairlines derived from the existing border token. */
export const BLUEPRINT_LINE = "border-brand-border/45";

export const BLUEPRINT_FRAME = BLUEPRINT_LINE;

export const blueprintRow = `border-b ${BLUEPRINT_LINE}`;

export const blueprintCol =
  `border-b ${BLUEPRINT_LINE} lg:border-b-0 lg:border-r ${BLUEPRINT_LINE} last:border-b-0 last:border-r-0`;

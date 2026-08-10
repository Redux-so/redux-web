/** Blueprint grid border color. */
export const BLUEPRINT_BORDER = "border-[#2e2e2e]";

/** Subtle blueprint hairlines for the site grid frame. */
export const BLUEPRINT_LINE = BLUEPRINT_BORDER;

/** Site document max width — slightly wider than the previous max-w-6xl (72rem). */
export const BLUEPRINT_MAX_WIDTH = "max-w-[76rem]";

export const BLUEPRINT_FRAME = BLUEPRINT_LINE;

export const blueprintRow = `border-b ${BLUEPRINT_BORDER}`;

export const blueprintCol =
  `border-b ${BLUEPRINT_BORDER} lg:border-b-0 lg:border-r ${BLUEPRINT_BORDER} last:border-b-0 last:border-r-0`;

export const blueprintBorderB = `border-b ${BLUEPRINT_BORDER}`;

export const blueprintBorderT = `border-t ${BLUEPRINT_BORDER}`;

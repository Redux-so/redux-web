import localFont from "next/font/local";

/** Footer “redux” watermark only — not applied globally. */
export const footerWatermarkFont = localFont({
  src: "../public/fonts/neuemontreal-regular.otf",
  display: "swap",
  weight: "400",
  // Tighter vertical metrics vs default (Alata read shorter at the same font-size).
  declarations: [
    { prop: "ascent-override", value: "84%" },
    { prop: "descent-override", value: "16%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});

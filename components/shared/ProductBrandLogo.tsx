import Image from "next/image";

import { PRODUCT_BRAND_LOGO_IMAGE } from "@/lib/product-brand";

export type ProductBrandLogoProps = {
  width: number;
  height: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  decorative?: boolean;
};

export default function ProductBrandLogo({
  width,
  height,
  className,
  alt = "Redux",
  priority,
  decorative = false,
}: ProductBrandLogoProps) {
  return (
    <Image
      src={PRODUCT_BRAND_LOGO_IMAGE}
      alt={decorative ? "" : alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      aria-hidden={decorative ? true : undefined}
    />
  );
}

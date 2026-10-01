import ProductBrandLogo from "@/components/shared/ProductBrandLogo";

const LOGO_PX = 52;

const LOGO_CLASS = "h-[52px] w-auto shrink-0 object-contain";

type ProductAppChromeLogoProps = {
  className?: string;
};

export default function ProductAppChromeLogo({
  className,
}: ProductAppChromeLogoProps) {
  return (
    <ProductBrandLogo
      width={LOGO_PX}
      height={LOGO_PX}
      className={[LOGO_CLASS, className].filter(Boolean).join(" ")}
      priority
    />
  );
}

import Image from "next/image";

export default function AppChromeLogo() {
  return (
    <Image
      src="/logo.png"
      alt="Redux"
      width={28}
      height={28}
      className="h-7 w-7 object-contain"
      draggable={false}
      priority
    />
  );
}

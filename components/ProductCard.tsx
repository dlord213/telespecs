import Link from "next/link";

interface ProductCardProps {
  link: string | undefined;
  imageSrc: string | undefined;
  product_title: string | undefined;
}

export default function ProductCard({
  link,
  imageSrc,
  product_title,
}: ProductCardProps) {
  return (
    <Link
      href={{ pathname: "/device", query: { device: link } }}
      className="flex flex-col gap-3 items-center transition-all delay-0 duration-500 lg:hover:scale-105 text-center max-h-[240px]"
    >
      <img src={imageSrc} className="w-full max-w-[128px] xl:max-w-[128px]" />
      <p>{product_title}</p>
    </Link>
  );
}

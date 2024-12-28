"use client";

import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import fetchRumoredDevices from "@/utils/fetchRumoredDevices";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isFetching } = useQuery({
    queryKey: ["rumor"],
    queryFn: fetchRumoredDevices,
  });

  if (isFetching) {
    return (
      <main className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="sticky top-0 flex flex-col gap-4 lg:basis-[70%] lg:p-8 h-full"></div>
      </main>
    );
  }

  return (
    <main className="flex lg:flex-col min-h-screen">
      <div className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="grid lg:grid-cols-6 2xl:grid-cols-7 2xl:place-content-start lg:p-4 lg:gap-4">
          {data?.map((phone) => (
            <ProductCard
              imageSrc={phone.img_src}
              link={phone.href}
              product_title={phone.model}
              key={phone.href}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

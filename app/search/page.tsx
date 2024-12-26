"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import fetchDevicesByQuery from "@/utils/fetchDevicesByQuery";
import ContentLoader from "react-content-loader";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, isFetching } = useQuery({
    queryFn: () => fetchDevicesByQuery(query),
    queryKey: [query, "search"],
  });

  if (isFetching) {
    return (
      <main className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="sticky top-0 flex flex-col gap-4 lg:basis-[70%] lg:p-8 h-full">
          <ContentLoader viewBox="0 0 340 84">
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
          </ContentLoader>
        </div>
      </main>
    );
  }

  return (
    <main className="flex lg:flex-row gap-4 min-h-screen">
      <Sidebar />
      <div className="grid grid-cols-2 gap-8 p-4 lg:grid-cols-6 lg:p-4 lg:gap-4">
        {data?.map((phone) => (
          <ProductCard
            imageSrc={phone.img_src}
            link={phone.href}
            product_title={phone.model}
            key={phone.href}
          />
        ))}
      </div>
    </main>
  );
}

"use client";

import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import fetchLatestPhonesData from "@/utils/fetchLatestPhonesData";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isFetching: isLatestPhonesDataFetching } = useQuery({
    queryFn: fetchLatestPhonesData,
    queryKey: ["latest"],
  });

  return (
    <main className="flex lg:flex-col min-h-screen">
      <div className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="hidden lg:flex lg:flex-col gap-4 xl:basis-[80%] 2xl:basis-[100%] p-4">
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl 2xl:text-5xl">
              Latest devices
            </h1>
            {!isLatestPhonesDataFetching ? (
              <div className="grid grid-cols-2 gap-8 p-4 lg:grid-cols-6 2xl:grid-cols-5 lg:p-4 lg:gap-4">
                {data?.latestPhones.map((phone) => (
                  <ProductCard
                    imageSrc={phone.image}
                    link={phone.link}
                    product_title={phone.model}
                    key={phone.link}
                  />
                ))}
              </div>
            ) : (
              <div className="min-h-[240px] max-w-[240px] max-h-[240px] min-w-[240px]" />
            )}
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl 2xl:text-5xl">
              Phones in store right now
            </h1>
            {!isLatestPhonesDataFetching ? (
              <div className="grid grid-cols-2 gap-8 p-4 lg:grid-cols-6 2xl:grid-cols-5 lg:p-4 lg:gap-4">
                {data?.phonesInStore.map((phone) => (
                  <ProductCard
                    imageSrc={phone.image}
                    link={phone.link}
                    product_title={phone.model}
                    key={phone.link}
                  />
                ))}
              </div>
            ) : (
              <div className="min-h-[240px] max-w-[240px] max-h-[240px] min-w-[240px]" />
            )}
          </section>
        </div>
        <div className="flex flex-col lg:hidden p-4 gap-4 ">
          <section className="flex flex-col gap-8">
            <h1 className="text-2xl font-black">Latest devices</h1>
            <div className="grid grid-cols-2 gap-8">
              {data?.latestPhones.map((phone) => (
                <ProductCard
                  product_title={phone.model}
                  imageSrc={phone.image}
                  link={phone.link}
                  key={phone.link}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="text-2xl font-black">Phones in store</h1>
            <div className="grid grid-cols-2 gap-8">
              {data?.phonesInStore.map((phone) => (
                <ProductCard
                  product_title={phone.model}
                  imageSrc={phone.image}
                  link={phone.link}
                  key={phone.link}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import "swiper/css";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Sidebar from "@/components/Sidebar";
import fetchLatestPhonesData from "@/utils/fetchLatestPhonesData";

import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import ContentLoader from "react-content-loader";

export default function Home() {
  const { data, isFetching: isLatestPhonesDataFetching } = useQuery({
    queryFn: fetchLatestPhonesData,
    queryKey: ["latest"],
  });

  return (
    <main className="flex lg:flex-col min-h-screen">
      <div className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="flex lg:flex-col gap-4 xl:basis-[80%] 2xl:basis-[70%] p-4">
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl">Latest devices</h1>
            {!isLatestPhonesDataFetching ? (
              <Swiper
                slidesPerView={data!.latestPhones?.length / 3}
                spaceBetween={20}
                className="xl:max-w-[70vw]"
              >
                {data?.latestPhones.map((phone) => (
                  <SwiperSlide key={phone.model} className="p-2">
                    <ProductCard
                      product_title={phone.model}
                      imageSrc={phone.image}
                      link={phone.link}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="max-w-[240px] w-full max-h-[240px] h-full">
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
                </ContentLoader>
              </div>
            )}
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl">Phones in store right now</h1>
            {!isLatestPhonesDataFetching ? (
              <Swiper
                slidesPerView={data!.phonesInStore?.length / 3}
                spaceBetween={20}
                className="xl:max-w-[70vw]"
              >
                {data?.phonesInStore.map((phone) => (
                  <SwiperSlide key={phone.model} className="p-2">
                    <ProductCard
                      product_title={phone.model}
                      imageSrc={phone.image}
                      link={phone.link}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="max-w-[240px] w-full max-h-[240px] h-full">
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
                </ContentLoader>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

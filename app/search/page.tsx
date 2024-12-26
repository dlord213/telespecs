"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import * as cheerio from "cheerio";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, error, isFetching } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=" +
                query
            )
        );

        if (!data.contents) throw new Error("Failed to fetch page content.");

        const $ = cheerio.load(data.contents);

        const phoneData: {
          href: string | undefined;
          img_src: string | undefined;
          model: string | undefined;
        }[] = [];

        $(".makers a").each((index, element) => {
          const href = $(element).attr("href")?.replace(".php", "");
          const img_src = $(element).find("img").attr("src");
          const model = $(element)
            .find("span")
            .html()
            ?.replace(/<br>/g, " ")
            .replace(/<[^>]+>/g, "");

          phoneData.push({ model, img_src, href });
        });

        // Log the result
        console.log(phoneData);
        return phoneData;
      } catch (err) {
        throw err;
      }
    },
    queryKey: [query, "search"],
  });

  if (isFetching) {
    return (
      <main className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
      </main>
    );
  }

  return (
    <main className="flex lg:flex-row gap-4 min-h-screen">
      <Sidebar />
      <div className="grid lg:grid-cols-6 lg:p-4 lg:gap-4">
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

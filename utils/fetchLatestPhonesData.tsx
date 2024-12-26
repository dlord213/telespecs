/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cheerio from "cheerio";
import axios from "axios";

export default async function fetchLatestPhonesData() {
  try {
    const { data } = await axios.get(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent("https://www.gsmarena.com/")
    );

    if (!data.contents) throw new Error("Failed to fetch page content.");

    const $ = cheerio.load(data.contents);

    const latestPhones: {
      model: string;
      image: string | undefined;
      link: string | undefined;
    }[] = [];
    $(
      '.module-latest:has(h4.section-heading:contains("Latest devices")) .module-phones-link'
    ).each((_: any, el: any) => {
      const model = $(el).text().trim();
      const image = $(el).find("img").attr("src");
      const link = $(el).attr("href")?.replace(".php", "");
      latestPhones.push({ model, image, link });
    });

    const phonesInStore: {
      model: string;
      image: string | undefined;
      link: string | undefined;
    }[] = [];
    $(
      '.module-latest:has(h4.section-heading:contains("In stores now")) .module-phones-link'
    ).each((_: any, el: any) => {
      const model = $(el).text().trim();
      const image = $(el).find("img").attr("src");
      const link = $(el).attr("href")?.replace(".php", "");
      phonesInStore.push({ model, image, link });
    });

    // Combine results
    const result = {
      latestPhones,
      phonesInStore,
    };

    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}

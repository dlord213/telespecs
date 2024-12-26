import axios from "axios";
import * as cheerio from "cheerio";

export default async function fetchDevicesByRanking() {
  try {
    const { data } = await axios.get(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent("https://www.gsmarena.com/")
    );

    if (!data.contents) throw new Error("Failed to fetch page content.");

    const $ = cheerio.load(data.contents);

    const dailyInterestDevices: {
      rank: string;
      device: string;
      hits: string;
      link: string;
    }[] = [];
    $(".module-rankings.s3")
      .first()
      .find("tbody > tr")
      .each((index, element) => {
        const rank = $(element).find("td:nth-child(1)").text().trim();
        const device = $(element).find("th > a").text().trim();
        const hits = $(element).find("td:nth-child(3)").text().trim();
        const link = $(element)
          .find("th > a")
          .attr("href")
          ?.replace(".php", "");

        if (rank && device && hits) {
          dailyInterestDevices.push({
            rank,
            device,
            hits,
            link: `https://example.com/${link}`,
          });
        }
      });

    const topFansDevices: {
      rank: string;
      device: string;
      favorites: string;
      link: string;
    }[] = [];
    $(".module-rankings.s3")
      .last()
      .find("tbody > tr")
      .each((index, element) => {
        const rank = $(element).find("td:nth-child(1)").text().trim();
        const device = $(element).find("th > a").text().trim();
        const favorites = $(element).find("td:nth-child(3)").text().trim();
        const link = $(element).find("th > a").attr("href");

        if (rank && device && favorites) {
          topFansDevices.push({
            rank,
            device,
            favorites,
            link: `https://example.com/${link}`,
          });
        }
      });

    const result = {
      dailyInterestDevices,
      topFansDevices,
    };

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { dailyInterestDevices: [], topFansDevices: [] };
  }
}

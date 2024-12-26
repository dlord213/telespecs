import axios from "axios";
import * as cheerio from "cheerio";

const fetchDevicesByQuery = async (query: string) => {
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

    console.log(phoneData);
    return phoneData;
  } catch (err) {
    throw err;
  }
};
export default fetchDevicesByQuery;

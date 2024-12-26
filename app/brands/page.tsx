import Sidebar from "@/components/Sidebar";
import { brands } from "@/types/Brands";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex lg:flex-col min-h-screen">
      <div className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="grid lg:grid-cols-5 gap-2 p-4 items-center">
          {brands.map((obj) => (
            <Link href={obj.link} key={obj.name}>
              <h1 className="lg:text-xl transition-all delay-0 duration-300 hover:scale-110 hover:text-red-500 font-bold">
                {obj.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

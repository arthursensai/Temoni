import { BookHeart, GraduationCap, Heart, Smile } from "lucide-react";
import Link from "next/link";

const sizeIconsSmall = 24;
const iconsColor = "black";

const Links = () => {
  return (
    <div className="flex gap-4 items-center justify-between ">
      <div className="bg-white/90 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <Link href="/dashboard/tomorrowLetter/new" className="w-full h-full">
          <BookHeart
            color={iconsColor}
            size={sizeIconsSmall}
            className="lg:w-9 lg:h-9"
          />
        </Link>
      </div>
      <div className="bg-white/90 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <GraduationCap
          color={iconsColor}
          size={sizeIconsSmall}
          className="lg:w-9 lg:h-9"
        />
      </div>
      <div className="bg-white/90 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <Heart
          color={iconsColor}
          size={sizeIconsSmall}
          className="lg:w-9 lg:h-9"
        />
      </div>
      <div className="bg-white/90 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <Smile
          color={iconsColor}
          size={sizeIconsSmall}
          className="lg:w-9 lg:h-9"
        />
      </div>
    </div>
  );
};

export default Links;

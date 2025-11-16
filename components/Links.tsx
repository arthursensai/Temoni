import { BookHeart, GraduationCap, Heart, Smile } from "lucide-react";

const sizeIcons = 36;

const Links = () => {
  return (
    <div className="flex gap-4 items-center justify-between ">
      <div className="bg-white/95 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <BookHeart color="#35353E" size={sizeIcons} />
      </div>
      <div className="bg-white/95 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <GraduationCap color="#35353E" size={sizeIcons} />
      </div>
      <div className="bg-white/95 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <Heart color="#35353E" size={sizeIcons} />
      </div>
      <div className="bg-white/95 p-1.5 flex items-center justify-center rounded-4xl shadow-2xl ring-2 ring-black hover:ring-4 transition-all hover:cursor-pointer">
        <Smile color="#35353E" size={sizeIcons} />
      </div>
    </div>
  );
};

export default Links;

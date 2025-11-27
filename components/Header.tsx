import ProfileButton from "./Profile";

const Header = () => {
  return (
    <header className="py-4 flex w-full items-center justify-around gap-4 bg-white/10 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-shadow-md">Tomoni</h1>

      <ProfileButton />
    </header>
  );
};

export default Header;

const Footer = () => {
  return (
    <footer className="bg-dark-gray py-6 text-center">
      <div className="container mx-auto flex flex-col gap-2">
        <p className="md:text-xl text-lg font-semibold font-poppins text-white">
          Popcorn Time
        </p>
        <p className="text-sm text-white/70">
          &copy; {new Date().getFullYear()} Popcorn Time. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

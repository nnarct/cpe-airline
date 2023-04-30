import hero from "./hero.png";
export const Hero = () => {
  return (
    <div className="h-96 flex">
      <img alt="" src={hero} className="select-none object-cover h-96 w-full" />
    </div>
  );
};

export default Hero;

import { Parallax } from "react-parallax";

const Cover = ({ img, title, subTitle }) => {
  return (
    <section>
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the menu"
        menu
        strength={-200}
      >
        <div className="hero md:h-[500px]">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold uppercase">{title} </h1>
              <p className="mb-5 uppercase">{subTitle}</p>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default Cover;

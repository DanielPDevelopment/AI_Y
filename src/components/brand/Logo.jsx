import { Typewriter } from 'react-simple-typewriter';

export const Logo = () => (
  <div className="">
    <div className="w-full">
      <div className="font-mono text-md tracking-[.5px] text-primaryBlue">
        Query
        <span className="text-creamyWhite/50 font-mono">
          <Typewriter
            words={['Intelligence']}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </div>
    </div>
  </div>
);

export default Logo;

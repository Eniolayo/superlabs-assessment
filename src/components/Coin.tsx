import { animated, useSpring } from "@react-spring/web";

export type CoinProps = {
  x: number;
  y: number;
  id: number;
};

const Coin: React.FC<CoinProps> = ({ x, y }) => {
  const props = useSpring({
    from: { left: `${x}px`, top: "-50px" },
    to: { left: `${x}px`, top: `${y}px` },
    config: { mass: 1, tension: 100, friction: 12 },
  });

  return (
    <animated.div
      style={{ ...props, userSelect: "none" }}
      className="absolute z-20 text-4xl"
    >
      🪙
    </animated.div>
  );
};
export default Coin;

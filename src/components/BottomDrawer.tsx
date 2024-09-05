import { Icon } from "@iconify/react";
import { animated, useSpring } from "@react-spring/web";
import React from "react";

const BottomDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  buySpeedBoost: () => void;
  buyMoreCoins: () => void;
}> = ({ isOpen, onClose, buySpeedBoost, buyMoreCoins }) => {
  const drawerStyle = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(100%)",
    config: { duration: 200 },
  });

  return (
    <animated.div
      style={drawerStyle}
      className="fixed bottom-0 left-0 right-0 z-[1000] h-1/2 rounded-t-lg bg-blue-950 shadow-lg"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-xl font-semibold">Actions</h3>
        <button
          onClick={onClose}
          className="text-gray-100 hover:text-gray-200 focus:outline-none"
        >
          <Icon icon="mdi:close" className="text-2xl" />
        </button>
      </div>
      <div className="grid p-4">
        <p>Use points to buy a speed boost or more coins!</p>
        <button
          className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-black"
          onClick={buySpeedBoost}
        >
          Buy Speed Boost: -500ms (Cost: 10 points)
        </button>
        <button
          className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-black"
          onClick={buyMoreCoins}
        >
          Buy More Coins: +25 slots (Cost: 20 points)
        </button>
      </div>
    </animated.div>
  );
};

export default BottomDrawer;

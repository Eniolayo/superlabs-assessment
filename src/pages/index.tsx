import { Icon } from "@iconify/react";
import React, { useState } from "react";

import BottomDrawer from "@/components/BottomDrawer";
import Coin, { CoinProps } from "@/components/Coin";
import { useToast } from "@/components/Toast/ToastContext";
import { useCoinManagement } from "@/utils/useCoinManagement";
import { useScreenDimensions } from "@/utils/useScreenDimensions";

function CoinAnimation() {
  const {
    coins,
    setCoins,
    isRemovingCoins,
    setIsRemovingCoins,
    totalPoints,
    setTotalPoints,
    maxCoins,
    setMaxCoins,
    rechargingSpeed,
    setRechargingSpeed,
  } = useCoinManagement();

  const screenDimensions = useScreenDimensions();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToast } = useToast();

  const handleOpenDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const coinSize = 32;
  const padding = {
    inline: 20,
    block: 20,
  };

  const buySpeedBoost = () => {
    const cost = 10; // Define the cost in points
    const speedReduction = 500; // Define how much speed to reduce (1 second)
    if (totalPoints >= cost && rechargingSpeed > speedReduction) {
      setTotalPoints(prevPoints => prevPoints - cost);
      setRechargingSpeed(prevSpeed => prevSpeed - speedReduction);
      addToast({
        message: "Speed Boost Activated! 🚀 Charge speed increased!",
        type: "success",
      });
    } else {
      addToast({
        message: "Not enough points or speed cannot be reduced further.",
        type: "error",
      });
    }
  };
  // Function to buy more max coins using points
  const buyMoreCoins = () => {
    const cost = 20; // Cost per additional coin
    if (totalPoints >= cost) {
      setTotalPoints(prevPoints => prevPoints - cost);
      setMaxCoins(prevMaxCoins => prevMaxCoins + 25);
      addToast({
        message: "Coins Acquired! 🪙 More slots available!",
        type: "success",
      });
    } else {
      addToast({
        message: "Not enough points.",
        type: "error",
      });
    }
  };
  const handleTap = () => {
    if (coins.length < maxCoins) {
      const newCoin: CoinProps = {
        id: Date.now(),
        x:
          padding.inline +
          Math.random() *
            (screenDimensions.width - coinSize - 2 * padding.inline),
        y:
          padding.block +
          Math.random() *
            (screenDimensions.height - coinSize - 5 * padding.block),
      };

      // Ensure the coin doesn't go off the screen horizontally
      newCoin.x = Math.max(
        padding.inline,
        Math.min(newCoin.x, screenDimensions.width - coinSize - padding.inline)
      );

      // Ensure the coin doesn't go off the screen vertically
      newCoin.y = Math.max(
        padding.block,
        Math.min(newCoin.y, screenDimensions.height - coinSize - padding.block)
      );

      setCoins(prevCoins => [...prevCoins, newCoin]);
    }

    if (!isRemovingCoins) {
      setIsRemovingCoins(false);
    }

    setTimeout(() => {
      setIsRemovingCoins(true); // Start removing coins after user stops tapping
    }, 1000);
  };

  return (
    <div
      className="relative flex h-screen w-full touch-none items-center justify-center bg-gradient-to-t from-[#4A148C] to-[#E040FB] text-white"
      onClick={handleTap}
    >
      {coins.map(coin => (
        <Coin key={coin.id} x={coin.x} y={coin.y} id={coin.id} />
      ))}
      <span
        className="absolute cursor-pointer text-5xl font-semibold"
        style={{
          userSelect: "none",
        }}
      >
        Tap anywhere
      </span>
      <div className="absolute inset-x-4 bottom-2 z-50 flex items-center justify-between">
        <div
          onClick={e => e.stopPropagation()}
          className="flex w-fit items-end rounded border border-white/40 px-1 text-center text-sm"
        >
          <p
            className=""
            style={{
              userSelect: "none",
            }}
          >
            <span className="mx-auto block">🪙</span>
            <span className="font-semibold">Coins:</span> {coins.length} /{" "}
            {maxCoins}
          </p>
          <span className="mx-1 block h-full w-px bg-white/40" />
          <p
            className=""
            style={{
              userSelect: "none",
            }}
          >
            <Icon icon="fxemoji:bolt" className="mx-auto block" />
            <span className="font-semibold">Charge:</span>{" "}
            {rechargingSpeed / 1000}s
          </p>
          <span className="mx-1 block h-full w-px bg-white/40" />
          <p
            className=" "
            style={{
              userSelect: "none",
            }}
          >
            <Icon icon="mdi:trophy" className="mx-auto block text-[#ffb636]" />
            <span className="font-semibold">Total Points:</span> {totalPoints}
          </p>
        </div>
        <button onClick={handleOpenDrawer}>
          <Icon
            icon="fa-solid:rocket"
            className="mx-auto block text-[#ffb636]"
          />
          Boost
        </button>
      </div>
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        buySpeedBoost={buySpeedBoost}
        buyMoreCoins={buyMoreCoins}
      />
    </div>
  );
}

export default CoinAnimation;

import { Icon } from "@iconify/react";
import React, { useState } from "react";

import BottomDrawer from "@/components/BottomDrawer";
import Coin from "@/components/Coin";
import { useCoinManagement } from "@/hooks/useCoinManagement";
import { useGameActions } from "@/hooks/useGameActions";
import { useScreenDimensions } from "@/hooks/useScreenDimensions";

function CoinAnimation() {
  const [isLoading, setIsLoading] = useState(true);

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

  const handleOpenDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDrawerOpen(true);
  };
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const { buySpeedBoost, buyMoreCoins, handleTap } = useGameActions(
    totalPoints,
    setTotalPoints,
    rechargingSpeed,
    setRechargingSpeed,
    maxCoins,
    setMaxCoins,
    coins,
    setCoins,
    isRemovingCoins,
    setIsRemovingCoins,
    screenDimensions
  );

  return isLoading ? (
    <div className="absolute inset-0 flex h-screen w-full touch-none items-center justify-center bg-gradient-to-t from-[#4A148C] to-[#E040FB]">
      <Icon
        icon="fa6-solid:spinner"
        className="relative z-50 animate-spin text-5xl text-white"
      />
    </div>
  ) : (
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

import { useEffect, useState } from "react";

import { CoinProps } from "@/components/Coin";

import { useLocalStorage } from "./useLocalStorage";

export function useCoinManagement() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [isRemovingCoins, setIsRemovingCoins] = useState(false);
  const [totalPoints, setTotalPoints] = useLocalStorage("totalPoints", 0);
  const [maxCoins, setMaxCoins] = useLocalStorage("maxCoins", 100);
  const [rechargingSpeed, setRechargingSpeed] = useLocalStorage(
    "rechargingSpeed",
    15000
  );

  useEffect(() => {
    if (isRemovingCoins) {
      const interval = setInterval(() => {
        setCoins(prevCoins => {
          if (prevCoins.length - 1 === 0) {
            clearInterval(interval);
            setIsRemovingCoins(false);
            return prevCoins.slice(1);
          }
          return prevCoins.slice(1);
        });
        setTotalPoints(prevPoints => prevPoints + 1);
      }, rechargingSpeed);

      return () => clearInterval(interval);
    }
  }, [isRemovingCoins, rechargingSpeed, setTotalPoints]);

  return {
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
  };
}

import { CoinProps } from "@/components/Coin";
import { useToast } from "@/components/Toast/ToastContext";

export function useGameActions(
  totalPoints: number,
  setTotalPoints: (value: number | ((prevValue: number) => number)) => void,
  rechargingSpeed: number,
  setRechargingSpeed: (value: number | ((prevValue: number) => number)) => void,
  maxCoins: number,
  setMaxCoins: (value: number | ((prevValue: number) => number)) => void,
  coins: CoinProps[],
  setCoins: (
    value: CoinProps[] | ((prevValue: CoinProps[]) => CoinProps[])
  ) => void,
  isRemovingCoins: boolean,
  setIsRemovingCoins: (value: boolean) => void,
  screenDimensions: { width: number; height: number }
) {
  const { addToast } = useToast();

  const buySpeedBoost = () => {
    const cost = 10;
    const speedReduction = 500;
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

  const buyMoreCoins = () => {
    const cost = 20;
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
    const coinSize = 32;
    const padding = { inline: 20, block: 20 };

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

      newCoin.x = Math.max(
        padding.inline,
        Math.min(newCoin.x, screenDimensions.width - coinSize - padding.inline)
      );

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
      setIsRemovingCoins(true);
    }, 1000);
  };

  return { buySpeedBoost, buyMoreCoins, handleTap };
}

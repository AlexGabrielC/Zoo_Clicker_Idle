import React, { createContext, useState } from "react";

interface GameContextType {
    caca: number;
    setCaca: (value: number) => void;
    cacaPerClick: number;
    setCacaPerClick: (value: number) => void;
    cacaPerSecond: number;
    setCacaPerSecond: (value: number) => void;
}

export const GameContext = createContext<GameContextType>({
    caca: 0,
    setCaca: () => {},
    cacaPerClick: 1,
    setCacaPerClick: () => {},
    cacaPerSecond: 0,
    setCacaPerSecond: () => {},
});

export const GameProvider: React.FC = ({ children }) => {
    const [caca, setCaca] = useState<number>(0);
    const [cacaPerClick, setCacaPerClick] = useState<number>(1);
    const [cacaPerSecond, setCacaPerSecond] = useState<number>(0);

    return (
        <GameContext.Provider
            value={{
                caca,
                setCaca,
                cacaPerClick,
                setCacaPerClick,
                cacaPerSecond,
                setCacaPerSecond,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
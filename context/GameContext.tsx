import React, { createContext, useState, useEffect, ReactNode } from "react";

interface GameContextType {
    caca: number;
    setCaca: (value: number) => void;
    cacaPerClick: number;
    setCacaPerClick: (value: (prev: number) => number) => void;
    cacaPerSecond: number;
    setCacaPerSecond: (value: (prev: number) => number) => void;
}

export const GameContext = createContext<GameContextType>({
    caca: 0,
    setCaca: () => {},
    cacaPerClick: 1,
    setCacaPerClick: () => {},
    cacaPerSecond: 0,
    setCacaPerSecond: () => {},
});

interface GameProviderProps {
    children: ReactNode;  // Ajout du typage pour la propriété `children`
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [caca, setCaca] = useState<number>(0);
    const [cacaPerClick, setCacaPerClick] = useState<number>(1);
    const [cacaPerSecond, setCacaPerSecond] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCaca((prevCaca) => prevCaca + cacaPerSecond);
        }, 1000);

        return () => clearInterval(interval);
    }, [cacaPerSecond]);

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

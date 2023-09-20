import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('prefers-color-scheme:dark').matches, 'isDarkMode')

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    function toggleDarkMode() {
        setIsDarkMode(dark => !dark)
    }
    return (
        <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode() {
    const context = useContext(DarkModeContext)
    if (context === undefined) throw new Error("you are using context outside of DarkModeContext")
    return context
}

export { DarkModeProvider, useDarkMode }

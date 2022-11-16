import { useContext, createContext, useState, useEffect } from "react";

const DarkModeContext = createContext(); //아래 훅을 만들었기 때문에 export필요 X

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches); //다크모드 상태 변수
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  //제일 처음 마운트(로딩) 될때 다크모드인지 아닌지 판단

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//Hooks
export const useDarkMode = () => useContext(DarkModeContext);

//다크모드가 트루였을때 제일 상위 엘리먼트에 dark 클라스를 넣어준다
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark"; //업데이트 될때마다 로컬 스토리지에 저장
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

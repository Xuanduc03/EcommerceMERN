import { useEffect, useState } from 'react';

const UseDarkSide = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";
    localStorage.getItem("theme", theme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        if(localStorage.theme === "dark"){
            localStorage.removeItem("theme");
        }else {
            localStorage.setItem("theme", theme);
        }
    })
  return [colorTheme, setTheme];
}
export default UseDarkSide;
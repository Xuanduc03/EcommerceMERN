import React, { useState } from 'react';
import {DarkModeSwitch} from "react-toggle-dark-mode";
import UseDarkSide from './UseDarkSide';

const Switcher = () => {
    const [colorTheme, setTheme] = UseDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false 
    ); // Cập nhật trạng thái darkSide

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme); // Cập nhật colorTheme
        setDarkSide(checked); // Cập nhật darkSide
    };

    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "2px" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={25}
            />
        </>
    );
}

export default Switcher;
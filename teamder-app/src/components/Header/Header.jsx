import React from "react";
import {Link, NavLink} from "react-router-dom";
import style from "./Header.module.css"
function Header() {
  return (<div className={style.header}>
          <img src={"https://i.scdn.co/image/ab67706c0000bebb7d7e5ac5531d35279b8229a5"}/>
          <div className={style.content}>
              <a href={"/mainPage"} className={({isActive}) => isActive ? style.active : null}>Main</a>
              <a href={"/playingHistory"}
                       className={({isActive}) => isActive ? style.active : null}>History</a>
          </div>
      </div>

);
}

export default Header;

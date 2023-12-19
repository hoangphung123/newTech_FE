// Header.js
import React from "react";

// import './header.css'

function Header() {
  return (
    <header className="header">
      <section class="flex">
        <div style={{ display: "flex", alignItems: "center", width: "11rem", justifyContent: "space-between" }}>
          <img className="Logo_header" src={"/img/Logo(1).png"} alt="" />
          <a href="/homeUser" class="logo">
            Hcmute
          </a>
        </div>

        <form action="search.html" method="post" class="search-form">
          <input
            type="text"
            name="search_box"
            required
            placeholder="search courses..."
            maxlength="100"
          />
          <button type="submit" class="fas fa-search"></button>
        </form>

        <div class="icons">
          <div id="menu-btn" class="fas fa-bars"></div>
          <div id="search-btn" class="fas fa-search"></div>
          <div id="user-btn" class="fas fa-user"></div>
          <div id="toggle-btn" class="fas fa-sun"></div>
        </div>

        <div class="profile">
          <img
            src="https://i.pinimg.com/474x/92/86/13/92861311e6def511d07ffbbef62372f1.jpg"
            alt=""
          />
          <h3 class="name">shaikh anas</h3>
          <p class="role">studen</p>
          <a href="profile.html" class="btn">
            view profile
          </a>
          <div class="flex-btn">
            <a href="login.html" class="option-btn">
              login
            </a>
            <a href="register.html" class="option-btn">
              register
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;

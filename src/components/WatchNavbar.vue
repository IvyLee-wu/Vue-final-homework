<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-link h3 color font-weight-bold" to="/watchindex">
        <img src="../assets/clock.png" alt height="45">
        挖趣鐘錶店
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li>
            <router-link class="nav-link h5 active" to="/watchproducts">商品頁面</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link h5" to="/watchcart">購物車</router-link>
          </li>
        </ul>
        <router-link to="/login">
          <button class="btn btn-outline-dark btn-sm my-2 my-sm-0" type="button">
            登入
          </button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style>
.color{
  color: #806755;
}
</style>

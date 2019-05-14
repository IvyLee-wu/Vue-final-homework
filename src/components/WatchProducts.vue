<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-3">
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active text-center h6"
              id="list-home-list"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home"
              @click.prevent="currentPage ='機械錶',status.filter=false"
            >機械錶</a>
            <a
              class="list-group-item list-group-item-action text-center h6"
              id="list-profile-list"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile"
              @click.prevent="currentPage ='電子錶',status.filter=false"
            >電子錶</a>
            <a
              class="list-group-item list-group-item-action text-center h6"
              id="list-messages-list"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages"
              @click.prevent="currentPage ='懷錶',status.filter=false"
            >懷錶</a>
            <a
              class="list-group-item list-group-item-action text-center h6"
              id="list-settings-list"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings"
              @click.prevent="currentPage ='其他',status.filter=false"
            >其他商品</a>
          </div>
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="tab-content">
            <div class="tab-pane active" id="list-gold">
              <div class="row">
                <template v-for="(item,key) in filterProducts">
                  <div class="col-lg-4 col-md-6 mb-4" :key="key">
                    <WatchCard :item="item" v-on:addToCart="addToCart" :status="status.addToCart"/>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WatchSideCart ref="sidecart"></WatchSideCart>
  </div>
</template>

<script>
import $ from "jquery";

import WatchCard from "@/components/WatchCard";
import WatchSideCart from "@/components/WatchSideCart";

export default {
  data() {
    return {
      currentPage: "機械錶",
      status: {
        addToCart: "",
        filter: false
      },
      allProducts: [],
      products: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      this.$http.get(api).then(response => {
        this.isLoading = false;
        this.products = response.data.products;
        this.pagination = response.data.pagination;
      });
    },
    getAllProducts() {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products/all`;
      this.$http.get(api).then(response => {
        this.allProducts = response.data.products;
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        data: {
          product_id: id,
          qty: qty
        }
      };
      this.status.addToCart = id;
      this.$http.post(api, cart).then(response => {
        this.$refs.sidecart.getCart();
        console.log(response.data);
        this.status.addToCart = "";
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        console.log(response.data.data);
        vm.carts = response.data.data;
      });
    },
  },
  computed: {
    filterProducts() {
      let vm = this;
      return vm.allProducts.filter(function(item, index) {
        if (item.category == vm.currentPage) return true;
      });
    }
  },
  created() {
    this.getProducts();
    this.getAllProducts();
    this.getCart();
  },
  components: {
    WatchCard,
    WatchSideCart,
  }
};
</script>

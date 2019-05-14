<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant py-5">
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 60px;">
            <h1 class="h2">
              {{ product.title }}
              <small class="text-muted">({{ product.category }})</small>
            </h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">售價 {{ product.origin_price | currency }}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <small>特價 NT</small>
                <strong>{{ product.price | currency }}</strong>
              </div>
            </div>
            <hr>
            <div class="input-group mt-3">
              <select name class="form-control mr-1" v-model="qty">
                <option v-for="num in 5" :key="num" :value="num">{{ num }} {{ product.unit }}</option>
              </select>
              <a
                href="#"
                class="btn btn-info"
                @click.prevent="addToCart()"
                :class="{ 'disabled':status.addToCart }"
              >
                加入購物車
                <i class="fas fa-spinner fa-spin ml-1" v-if="status.addToCart"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>{{ product.title }}</h2>
          <p class="card-text py-2 h6">{{ product.description }}</p>
          <img :src="product.imageUrl" class="w-100 rounded" alt>
          <div class="alert alert-secondary mt-4" role="alert">
            <h3 class="text-center font-weight-bold">購物說明</h3>
            <p>會員所購買的商品均享有到貨七天的猶豫期（含例假日）。退回之商品必須於猶豫期內寄回。</p>
            <p>辦理退換貨時，商品必須是全新狀態與完整包裝(請注意保持商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性，切勿缺漏任何配件或損毀原廠外盒)。退回商品無法回復原狀者，恐將影響退貨權益或需負擔部分費用。</p>
          </div>
        </div>
      </div>
    </div>
    <WatchSideCart ref="sidecart"></WatchSideCart>
  </div>
</template>

<script>
import $ from "jquery";

import WatchSideCart from "@/components/WatchSideCart";

export default {
  data() {
    return {
      product: {},
      isLoading: false,
      qty: 1,
      status: {
        addToCart: false
      },
    };
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      this.$http.get(api).then(response => {
        this.isLoading = false;
        if (response.data.success) {
          this.product = response.data.product;
        }
      });
    },
    addToCart() {
      var vm = this;
      let id = vm.product.id;
      let qty = vm.qty;
      vm.status.addToCart = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        data: {
          product_id: id,
          qty: qty
        }
      };
      vm.$http.post(api, cart).then(response => {
        vm.$refs.sidecart.getCart();
        console.log(response.data);
        vm.status.addToCart = false;
      });
    }
  },
  created() {
    let id = this.$route.params.id;
    this.getProduct(id);
  },
  components: {
    WatchSideCart,
  }
};
</script>
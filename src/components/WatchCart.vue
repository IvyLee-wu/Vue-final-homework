<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="my-5 row justify-content-center">
        <div class="my-5 col-md-5" v-if="cart.total">
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total | currency }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>
        <div class="my-5 h6" v-else>
          <p>購物車內暫無商品。</p>
          <router-link to="/watchproducts" class="text-info">點此返回商品頁面。</router-link>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <form class="col-md-7" @submit.prevent="createOrder" v-if="cart.total">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-validate="'required|email'"
              :class="{ 'is-invalid': errors.has('email') }"
              v-model="form.user.email"
              placeholder="請輸入 Email"
            >
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              :class="{ 'is-invalid': errors.has('name') }"
              v-model="form.user.name"
              v-validate="'required'"
              placeholder="輸入姓名"
            >
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
          </div>
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            >
          </div>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              :class="{ 'is-invalid': errors.has('address') }"
              id="useraddress"
              v-model="form.user.address"
              v-validate="'required'"
              placeholder="請輸入地址"
            >
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>
          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      cart: {},
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`/watchcheckout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>

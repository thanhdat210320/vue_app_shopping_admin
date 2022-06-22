<template>
  <section class="wrapper" style="margin-left: 15%; width: 86%; margin-top: 0">
    <!-- //market-->
    <div class="market-updates">
      <div class="col-md-3 market-update-gd">
        <div class="market-update-block clr-block-2">
          <div class="col-md-4 market-update-right">
            <i class="fa fa-eye"> </i>
          </div>
          <div class="col-md-8 market-update-left">
            <h4>Sản Phẩm</h4>
            <h3>{{ quantityProducts }}</h3>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="col-md-3 market-update-gd">
        <div class="market-update-block clr-block-1">
          <div class="col-md-4 market-update-right">
            <i class="fa fa-usd"></i>
          </div>
          <div class="col-md-8 market-update-left">
            <h4>Tổng Doanh Thu</h4>
            <h3>
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(statistical.totalrevenue)
              }}
            </h3>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="col-md-3 market-update-gd">
        <div class="market-update-block clr-block-3">
          <div class="col-md-4 market-update-right">
            <i class="fa fa-usd"></i>
          </div>
          <div class="col-md-8 market-update-left">
            <h4>Lợi Nhuận</h4>
            <h3>
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(statistical.profit)
              }}
            </h3>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="col-md-3 market-update-gd">
        <div class="market-update-block clr-block-4">
          <div class="col-md-4 market-update-right">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </div>
          <div class="col-md-8 market-update-left">
            <h4>ĐH Hoàn Thành</h4>
            <h3>{{ statistical.ordersuccess }}</h3>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <!-- //market-->
    <div class="row">
      <div class="panel-body">
        <div class="col-md-12 w3ls-graph">
          <!--agileinfo-grap-->
          <div class="agileinfo-grap">
            <div class="agileits-box">
              <header class="agileits-box-header clearfix">
                <h3>Visitor Statistics</h3>
                <div class="toolbar"></div>
              </header>
              <div class="agileits-box-body clearfix">
                <div id="hero-area"></div>
              </div>
            </div>
          </div>
          <!--//agileinfo-grap-->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "HomeAdmin",
  data() {
    return {
      statistical: {},
      products: [],
    };
  },
  async created() {
    await this.getStatistical();
    await this.getallProduct();
  },
  computed: {
    quantityProducts() {
      return this.products.length;
    },
  },
  methods: {
    async getStatistical() {
      try {
        const respon = await axios.get(
          "https://localhost:44309/api/Order/Statistical"
        );
        this.statistical = respon.data;
        console.log(respon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getallProduct() {
      try {
        const respon = await axios.get(
          "https://localhost:44309/api/Product/GetAll"
        );
        this.products = respon.data;
        console.log(respon.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

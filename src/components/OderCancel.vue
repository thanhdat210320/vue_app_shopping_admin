<template>
  <section class="wrapper">
    <div class="table-agile-info">
      <div class="panel panel-default">
        <div class="panel-heading">ĐƠN HÀNG ĐÃ HỦY</div>
        <div>
          <table
            class="table"
            ui-jq="footable"
            ui-options='{
        "paging": {
          "enabled": true
        },
        "filtering": {
          "enabled": true
        },
        "sorting": {
          "enabled": true
        }}'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ Tên</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Ngày Tạo</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody v-for="oderCancel in oderCancels" :key="oderCancel.id">
              <tr>
                <td>{{ oderCancel.id }}</td>
                <td>{{ oderCancel.custemerName }}</td>
                <td>{{ oderCancel.custemerPhone }}</td>
                <td>{{ oderCancel.custemerAddress }}</td>
                <td>{{ formatDate(oderCancel.createDate) }}</td>
                <!-- <td>
                  <select name="" id="">
                    <option value="">Chưa Xác Nhận</option>
                    <option value="">Đã Xác Nhận</option>
                    <option value="">Đang Giao</option>
                    <option value="">Hoàn Thành</option>
                  </select>
                </td>
                <td>Hd</td> -->
                <td>
                

                  <button
                    style="margin-right: 10px"
                    @click="isShow = !isShow"
                    @click.prevent="ViewOderDetail(oderCancel.id)"
                    class="btn_del"
                  >
                    VIEW
                  </button>
                  <button style="margin-right: 10px" class="btn_delete">
                    CANCEL
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </div>
  </section>
  <form class="AddCategory" v-if="isShow === true">
    <div class="form-group">
      <button class="btn_x" style="float: right" @click="isShow = !isShow">
        X
      </button>
      <label for="exampleInputEmail1">Chi Tiết Đơn Hàng</label>
      <table
        class="table"
        ui-jq="footable"
        ui-options='{
        "paging": {
          "enabled": true
        },
        "filtering": {
          "enabled": true
        },
        "sorting": {
          "enabled": true
        }}'
      >
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
          </tr>
        </thead>
        <tbody v-for="item in viewOders" :key="item.id">
          <tr>
            <td>
              <img
                style="width: 50px; height: 50px"
                :src="`/admin/img/products/${item.image}`"
              />
            </td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="" style="float: right">
        Tổng tiền:
        {{
          Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(oderTotal)
        }}
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "OderCancelComponent",
  data() {
    return {
      oderCancels: [],
      isShow: false,
      viewOders: [],
      id: this.$route.params.id,
      total: 0,
    };
  },
  async created() {
    await this.getOderCancel();
  },
  computed: {
    oderTotal() {
      let total = 0;
      this.viewOders.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
  methods: {
    async getOderCancel() {
      try {
        const repons = await axios.get(
          "https://localhost:44309/api/Order/OrderCancel?pageIndex=1&pageSize=5"
        );
        this.oderCancels = repons.data.items;
        console.log(repons.data);
      } catch (error) {
        console.log(error);
      }
    },
    formatDate: function (value) {
      return moment(String(value)).format("MM-DD-YYYY - hh:mm");
    },
    async ViewOderDetail(id) {
      try {
        const repons = await axios.get(
          `https://localhost:44309/api/Order/GetById/${id}`
        );
        this.viewOders = repons.data;
        console.log(repons.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
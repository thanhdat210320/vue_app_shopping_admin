<template>
  <section class="wrapper">
    <div class="table-agile-info">
      <div class="panel panel-default">
        <div class="panel-heading">ĐƠN HÀNG</div>
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
                <th>Trạng Thái</th>
                <th>Tổng Hóa Đơn</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody v-for="oder in oders" :key="oder.id">
              <tr>
                <td>{{ oder.id }}</td>
                <td>{{ oder.custemerName }}</td>
                <td>{{ oder.custemerPhone }}</td>
                <td>{{ oder.custemerAddress }}</td>
                <td>{{ formatDate(oder.createDate) }}</td>
                <td>
                  <select v-model="oder.status" name="" id="">
                    <option :value="0">Đơn hàng chưa xác thực</option>
                    <option :value="1">Đơn hàng đã xác thực</option>
                    <option :value="2">Đơn hàng đang giao</option>
                    <option :value="3">Đơn hàng thành công</option>
                    <option :value="4">Đơn hàng hủy</option>
                  </select>
                </td>
                <td>Hd</td>
                <td>
                  <button
                    @click="updateStatus({ id: oder.id, status: oder.status })"
                    style="margin-right: 10px"
                    class="btn_update"
                  >
                    UPDATE
                  </button>

                  <button
                    style="margin-right: 10px"
                    @click="isShow = !isShow"
                    @click.prevent="ViewOderDetail(oder.id)"
                    class="btn_del"
                  >
                    VIEW
                  </button>
                  <button
                    @click="updateStatus({ id: oder.id, status: 4 })"
                    style="margin-right: 10px"
                    class="btn_delete"
                  >
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
              <img style="width: 50px; height: 50px" :src="item.image" />
            </td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{
          Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price)
        }}</td>
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
  name: "OderComponent",
  data() {
    return {
      oders: [],
      isShow: false,
      viewOders: [],
      id: this.$route.params.id,
      total: 0,
    };
  },
  async created() {
    await this.getOders();
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
    async getOders() {
      try {
        const repons = await axios.get(
          "https://localhost:44309/api/Order/GetAllPageing?pageIndex=1&pageSize=10"
        );
        this.oders = repons.data.items;
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
    orderSuccess() {},
    updateStatus(status) {
      axios
        .put(
          `https://localhost:44309/api/Order/UpdateOrderStatus/${status.id}`,
          status
        )
        .then((response) => {
          console.log(response.data);
          alert("Cập nhập thành công");
          console.log(status);
          this.getOders();
        });
    },
  },
};
</script>

<style>
.table > thead > tr > th {
  text-align: center;
}
</style>
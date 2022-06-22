<template>
  <section class="wrapper">
    <div class="table-agile-info">
      <div class="panel panel-default">
        <div class="panel-heading">Sản Phẩm</div>
        <button @click="isShow = !isShow" class="add_category">ADD</button>
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
                <th style="text-aline: center">ID</th>
                <th>Tên Sản Phẩm</th>
                <th data-breakpoints="xs">Ảnh</th>
                <th>NXB</th>
                <th>Đơn Giá</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr data-expanded="true" v-for="item in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>
                  <img style="width: 50px; height: 50px" :src="item.image" />
                </td>
                <td>{{ item.nxb }}</td>
                <td>
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)
                  }}
                </td>
                <td @click="isShow = !isShow">
                  <button @click="getProductById(item.id)" class="btn_update">
                    EDIT
                  </button>
                </td>
                <td>
                  <button @click="removeProduct(item.id)" class="btn_delete">
                    DELETE
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
  <div class="flex" style="margin-left: 70%">
    <pagination
      :records="total"
      v-model="pageIndex"
      :per-page="pageSize"
      @paginate="getPage"
    >
    </pagination>
  </div>
  <div class="container-crud" v-if="isShow === true">
    <div class="crud">
      <div class="remove" @click="isShow = !isShow">
        <h5>X</h5>
      </div>

      <div class="crud-input">
        <div class="form" action="">
          <div class="content-left">
            <div class="content">
              <label for="">Tên sản phẩm</label>
              <div class="input">
                <input type="text" placeholder="" v-model="formProduct.name" />
              </div>
            </div>

            <div class="price" style="display: flex">
              <div class="content">
                <label for="">Giá bán</label>
                <div class="input">
                  <input
                    type="number"
                    placeholder=""
                    v-model="formProduct.originalPrice"
                  />
                </div>
              </div>
              <div class="content">
                <label for="">Giá nhập</label>
                <div class="input">
                  <input
                    type="number"
                    placeholder=""
                    v-model="formProduct.price"
                  />
                </div>
              </div>
            </div>

            <div class="content">
              <label for="">NXB</label>
              <div class="input">
                <input type="text" placeholder="" v-model="formProduct.nxb" />
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="content">
              <div class=""><label for="cars">Loại sản phẩm</label></div>
              <select
                class="aa"
                style="width: 90%; height: 40px; margin-bottom: 10px"
                name="cars"
                id="cars"
                v-model="formProduct.cateID"
              >
                <option value="2">Thiếu Nhi</option>
                <option value="3">Tiểu Thuyết</option>
                <option value="4">Tâm Lý Học</option>
                <option value="5">Chuyện Trinh Thám</option>
                <option value="6">Sách Mới Nhất</option>
                <option value="7">Đồ Chơi-Quà Lưu Niệm</option>
              </select>
            </div>
            <div class="">
              <div class="content">
                <label for="">Số lượng</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder=""
                    v-model="formProduct.quantity"
                  />
                </div>
              </div>

              <div class="content">
                <label for="">Hình ảnh</label>
                <div class="input" style="display: flex">
                  <div class="" v-if="!formProduct.image" style="height: 70px">
                    <input
                      name="file"
                      id="imageUpload"
                      @change="onFileChange"
                      accept="image/*"
                      ref="fileInput"
                      type="file"
                    />
                  </div>

                  <div class="" v-else>
                    <img
                      v-if="formProduct.image"
                      style="width: 100px; height: 70px"
                      :src="formProduct.image"
                    />
                    <button
                      class="btn_x"
                      style="
                        background: white;
                        border: none;
                        position: absolute;
                        margin-left: 8px;
                      "
                      @click="removeImage(e)"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <label for="">Mô tả</label>
          <div class="input">
            <ckeditor
              class="edit"
              :editor="editor"
              v-model="formProduct.description"
              :config="editorConfig"
            ></ckeditor>
          </div>
        </div>
        <div class="submit">
          <button
            v-if="id === null"
            @click="addProduct()"
            style="border-radius: 10%"
            class="btn btn-danger"
          >
            ADD
          </button>

          <button
            v-if="id !== null"
            @click="editProduct()"
            style="border-radius: 10%"
            class="btn btn-danger"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Paginate from "vuejs-paginate";
import Pagination from "v-pagination-3";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    Pagination,
  },
  name: "ProductComponent",

  data() {
    return {
      editor: ClassicEditor,

      editorConfig: {
        height: "250px",
      },
      formProduct: {
        name: "",
        price: "",
        originalPrice: "",
        quantity: "",
        nxb: "",
        description: "",
        image: "",
        cateID: "",
      },
      isShow: false,
      products: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      id: null,
    };
  },
  async created() {
    await this.getProducts();
    await this.onFileChange();
    await this.loadListItem();
  },
  methods: {
    async getProducts() {
      await axios
        .get(
          `https://localhost:44309/api/Product/GetAllPageing?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then((response) => {
          this.products = response.data.items;
          this.total = response.data.totalRecord;
          this.pageSize = response.data.pageSize;
          this.pageCount = response.data.pageCount;
          this.pageIndex = response.data.pageIndex;
        });
    },
    getPage(pageIndex) {
      this.products = [];
      const startIndex = this.pageSize * (pageIndex - 1) + 1;
      const endIndex = startIndex + this.pageSize - 1;
      for (let i = startIndex; i <= endIndex; i++) {
        this.getProducts(this.products.push(`Item ${i}`));
      }
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTranfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this.formProduct;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.formProduct.image = "";
    },
    async addProduct() {
      // this.$store.dispatch("addProduct", this.formProduct);
      await axios
        .post("https://localhost:44309/api/Product/Create", this.formProduct)
        .then((response) => {
          console.log(response);
          alert("Thêm sản phẩm thành công");
          this.isShow = !this.isShow;
          this.loadListItem();
          this.formProduct = [];
        })
        .catch((error) => console.log(error));
    },
    async removeProduct(id) {
      if (confirm("Bạn chắc có muốn xóa!")) {
        await axios
          .delete(`https://localhost:44309/api/Product/Delete/${id}`)
          .then((response) => {
            console.log(response);
            this.loadListItem();
          })
          .catch((error) => console.log(error));
      }
    },
    async editProduct() {
      const id = this.id;
      if (confirm("Bạn chắc có muốn sửa!")) {
        await axios
          .put(
            `https://localhost:44309/api/Product/Update/${id}`,
            this.formProduct
          )
          .then((response) => {
            console.log(response);
            alert("Sửa sản phẩm thành công");
            this.isShow = !this.isShow;
            this.loadListItem();
            console.log(this.formProduct);
          })
          .catch((error) => console.log(error));
      }
    },
    async getProductById(id) {
      this.id !== null;
      await axios
        .get(`https://localhost:44309/api/Product/GetById/${id}`)
        .then((response) => {
          this.id = id;
          this.formProduct.cateID = response.data.cateID;
          this.formProduct.name = response.data.name;
          this.formProduct.price = response.data.price;
          this.formProduct.originalPrice = response.data.originalPrice;
          this.formProduct.quantity = response.data.quantity;
          this.formProduct.description = response.data.description;
          this.formProduct.nxb = response.data.nxb;
          this.formProduct.image = response.data.image;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
   
<style>
.table > thead > tr > th {
  text-align: center;
}
a {
  margin: 10px;
}
th {
  text-align: center;
}
label {
  font-weight: 700;
}
a {
  cursor: pointer;
}
.pagination {
  justify-content: center;
  flex-wrap: wrap;
}
.crud {
  position: fixed;
  width: 60%;
  height: 650px;
  background: white;
  top: 8%;
  right: 15%;
  z-index: 999;
  border: 2px solid #ccc;

  transition: 2s;
}
.remove {
  float: right;
  padding: 15px;
}
.crud-input {
  width: 100%;
  padding: 20px;
}
.btn-danger {
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
}
input:focus {
  outline: none;
}
input {
  width: 90%;
  height: 40px;
}
.form {
  display: flex;
}
.content-left {
  width: 50%;
}
.content-right {
  width: 50%;
}
/* .submit {
  padding: 6px;
  width: 60px;
  float: right;

  margin-right: 48px;
  margin-top: -130px;
} */
.remove {
  cursor: pointer;
}
.ckedit {
  height: 50px;
  width: 100%;
}
.input {
  padding-bottom: 10px;
}
a {
  cursor: pointer;
}
.pagination {
  justify-content: center;
  flex-wrap: wrap;
}
button {
  background: orange;
  border: none;
}
button:hover {
  background: coral;
}
i {
  font-style: unset;
}
</style>
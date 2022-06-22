<template>
  <section class="wrapper">
    <div class="table-agile-info">
      <div class="panel panel-default">
        <div class="panel-heading">Loại Sản Phẩm</div>
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
                <th data-breakpoints="xs">ID</th>
                <th>Tên Loại Sản Phẩm</th>
                <th data-breakpoints="xs">Mô Tả</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                data-expanded="true"
                v-for="item in categories"
                :key="item.id"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td v-html="item.title"></td>
                <td>
                  <span @click="isShow = !isShow">
                    <button @click="getCategory(item.id)" class="btn_update">
                      Update
                    </button>
                  </span>
                </td>
                <td>
                  <button @click="removeCategory(item.id)" class="btn_delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="" style="margin-left: 65%">
      <pagination
        :records="total"
        v-model="pageIndex"
        :per-page="pageSize"
        @paginate="getPage"
      >
      </pagination>
    </div>
  </section>

  <form class="AddCategory" v-if="isShow === true">
    <div class="form-group">
      <button class="btn_x" style="float: right" @click="isShow = !isShow">
        X
      </button>
      <label for="exampleInputEmail1">Tên Loại Sản Phẩm</label>
      <input
        type="text"
        class="form-control"
        v-model="formData.name"
        placeholder=""
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Mô Tả</label>
      <ckeditor
        class="edit"
        :editor="editor"
        v-model="formData.title"
        :config="editorConfig"
      ></ckeditor>
    </div>
    <button v-if="id === null" @click.prevent="addcategory" type="submit" class="btn btn-primary">
      ADD
    </button>
    <button v-if="id !== null" @click.prevent="editcategory" type="submit" class="btn btn-primary">
      EDIT
    </button>
  </form>
</template>

<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "CategoryComponent",

  data() {
    return {
      editor: ClassicEditor,

      editorConfig: {
        height: "250px",
      },

      formData: {
        name: "",
        title: "",
      },
      id: null,
      categories: [],
      isShow: false,
    };
  },
  created() {
    this.loadCategory();
  },

  methods: {
    loadCategory() {
      axios.get("https://localhost:44309/api/Category/GetAll").then((res) => {
        this.categories = res.data;
      });
    },
    addcategory() {
      axios
        .post("https://localhost:44309/api/Category/Create", this.formData)
        .then((res) => {
          console.log(res);
          this.loadCategory();
          this.isShow = !this.isShow;
          alert("Thêm thành công");
        });
    },
    removeCategory(id) {
      if (confirm("Bạn muốn xóa sản phẩm ?")) {
        axios
          .delete(`https://localhost:44309/api/Category/Delete/${id}`)
          .then((res) => {
            console.log(res);
            this.loadCategory();
            alert("Xóa thành công");
          });
      }
    },
    getCategory(id) {
      axios
        .get(`https://localhost:44309/api/Category/GetById/${id}`)
        .then((res) => {
          this.id = res.data.id;
          this.formData.name = res.data.name;
          this.formData.title = res.data.title;
        });
    },
    editcategory() {
      const id = this.id;
      if (confirm("Bạn muốn sửa sản phẩm ?")) {
        axios
          .put(
            `https://localhost:44309/api/Category/Update/${id}`,
            this.formData
          )
          .then((res) => {
            console.log(res);
            this.loadCategory();
            this.isShow = !this.isShow;
            this.formData = [];
            alert("Sửa  thành công");
          })
          .catch((error) =>{
            console.log(error.message);
          });
      }
    },
  },
};
</script>

<style>
.btn_update {
  background: rgb(123, 239, 56);
  border: 1px solid blue;
  color: rgb(48, 47, 47);
}
.btn_update:hover {
  background-color: aquamarine;
  color: rgb(38, 37, 37);
}
.btn_delete {
  background: #fd3a25;
  border: 1px solid rgb(245, 73, 124);
  color: rgb(48, 47, 47);
}
.btn_delete:hover {
  background-color: #ff0000;
  color: rgb(38, 37, 37);
}
.form-group {
  padding: 20px;
}
.btn_x {
  margin-bottom: 10px;
}
.AddCategory {
  position: fixed;
  top: 21%;
  z-index: 999;
  background: rgb(247, 255, 255);
  border: 1px solid rgb(75, 74, 74);
  border-radius: 10px;
  margin-left: 32%;
  margin-top: 50px;
  width: 50%;
}
.add_category {
  float: right;
  margin: 10px;
  background-color: #00ffff;
  border: 1px solid black;
  padding: 5px 15px;
  border-radius: 5px;
}
.add_category:hover {
  background-color: #00ff00;
}
.edit {
  height: 250px;
}
.ck-editor__editable {
  min-height: 200px;
}
</style>
<template>
  <el-dialog
    :title="isEdit ? '编辑角色' : '添加角色'"
    :visible.sync="dialogFormFlag"
  >
    <el-form :model="form" ref="roleForm">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDiaolog">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { SaveOrUpdate } from "@/services/role/role";
import { Role, RoleInfo } from "@/services/role/role-module";
import { Form } from "element-ui";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      formLabelWidth: "120px",
      form: new RoleInfo(),
      dialogFormFlag: false,
      isEdit: false
    };
  },
  methods: {
    async saveOrUpdate() {
      if (!this.isEdit) {
        Reflect.deleteProperty(this.form, "id");
        Reflect.set(this.form, "status", 1);
      }
      const data = await SaveOrUpdate(this.form);
      if (data.code === "000000") {
        this.$message({
          message: `${this.isEdit ? "编辑" : "添加"}成功`,
          type: "success"
        });
        this.closeDiaolog();
        this.$emit("close-role", true);
      }
    },

    // 父组件调用
    openDialog(data: Role) {
      this.isEdit = !!data;
      this.dialogFormFlag = true;
      if (this.isEdit) {
        this.form = Object.assign({}, data);
      }
    },

    closeDiaolog() {
      this.dialogFormFlag = false;
      this.form = new RoleInfo();
      (this.$refs.roleForm as Form).resetFields();
    }
  }
});
</script>
<style lang="scss" scoped></style>

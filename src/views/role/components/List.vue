<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          ref="form"
          :model="form"
          :inline="true"
          label-width="80px"
          size="small"
        >
          <el-form-item prop="name" label="输入搜索">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRresh" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="add-box">
          <el-button plain @click="addRole">添加角色</el-button>
        </div>
      </div>
      <el-table
        :data="roleListInfo.records"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column width="180" prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column width="180" label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >分配菜单</el-button
              >
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >分配资源</el-button
              >
            </el-row>
            <el-row>
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <SaveUpdateRole
      :is-edit="isEdit"
      @close-role="onRresh"
      ref="SaveUpdateRole"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Form } from "element-ui";
import { DeleteRole, getRolePages } from "@/services/role/role";
import { Role, RoleListInfo, RoleParam } from "@/services/role/role-module";
import SaveUpdateRole from "./EditRole.vue";

export default Vue.extend({
  name: "RoleList",
  data() {
    return {
      form: new RoleParam(),
      totalCount: 0,
      roleListInfo: new RoleListInfo(), // 资源分类列表
      isLoading: true, // 加载状态
      isEdit: false
    };
  },
  created() {
    this.loadResources();
  },
  methods: {
    async loadResources() {
      this.isLoading = true; // 展示加载中状态
      this.roleListInfo = await getRolePages(this.form);
      this.totalCount = this.roleListInfo.total;
      this.isLoading = false; // 关闭加载中状态
    },

    onRresh() {
      this.loadResources();
    },

    addRole() {
      (this.$refs.SaveUpdateRole as any).openDialog();
    },

    handleEdit(item: Role) {
      (this.$refs.SaveUpdateRole as any).openDialog(item);
    },

    async handleDelete(id: number) {
      const data = await DeleteRole(id);
      if (data.code === "000000") {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.onRresh();
      }
    },

    onReset() {
      (this.$refs.form as Form).resetFields();
      this.onRresh();
    }
  },
  components: {
    SaveUpdateRole
  }
});
</script>
<style lang="scss" scoped>
.add-box {
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>

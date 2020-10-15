/**
 * 角色相关
 */
import request from "@/utils/request";
import { RoleInfo, RoleListInfo, RoleParam } from "./role-module";

export const getRolePages = (data: RoleParam): Promise<RoleListInfo> => {
  return new Promise(resolve => {
    request({
      method: "POST",
      url: "/boss/role/getRolePages",
      data
    }).then(res => {
      resolve(res.data.data);
    });
  });
};
export const SaveOrUpdate = (data: RoleInfo): Promise<any> => {
  return new Promise(resolve => {
    request({
      method: "POST",
      url: "/boss/role/saveOrUpdate",
      data
    }).then(res => {
      resolve(res.data);
    });
  });
};
export const DeleteRole = (id: number): Promise<any> => {
  return new Promise(resolve => {
    request({
      method: "DELETE",
      url: `/boss/role/${id}`
    }).then(res => {
      resolve(res.data);
    });
  });
};

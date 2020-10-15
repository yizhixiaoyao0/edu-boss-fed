export class RoleParam {
  public current: number = 1;
  public name: string = "";
  public pageNum: number = 1;
  public size: number = 50;
}

export class RoleInfo {
  public code: string = "";
  public description: string = "";
  public id?: number = 0;
  public status?: number = 0;
  public name: string = "";
}

export class Role {
  public code: string = "";
  public createdBy: string = "";
  public createdTime: number = 0;
  public description: string = "";
  public id: number = 0;
  public name: string = "";
  public updatedBy: string = "";
  public updatedTime: number = 0;
}

export class RoleListInfo {
  public current: number = 1;
  public hitCount: boolean = false;
  public optimizeCountSql: boolean = true;
  public orders: number[] = [];
  public pages: number = 1;
  public searchCount: boolean = true;
  public size: number = 50;
  public total: number = 7;
  public records: Role[] = [];
}

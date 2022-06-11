export interface CategoryDef {
  id: string;
  title: string;
}

export type CategoryRequest = Omit<CategoryDef, "id">;

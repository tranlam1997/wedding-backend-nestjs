import { Model } from "sequelize-typescript";

type Constructor<T> = new (...args: any[]) => T;
export type ModelType<K extends Record<string,any>, T extends Model<K>> = Constructor<T> & typeof Model;
export class BaseRepository<K extends Record<string,any>, T extends Model<K>> {
  model: ModelType<K, T>;

  constructor(protected customModel: ModelType<K, T>) {
    this.model = customModel;
  }

  create(payload: any) {
    return this.model.create(payload);
  }
}

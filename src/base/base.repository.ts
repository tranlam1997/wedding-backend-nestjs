import { DataSource, EntityTarget, FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  entity: EntityTarget<T>;

  constructor(private readonly dataSource: DataSource, entity: EntityTarget<T>) {
    this.entity = entity;
  }

  create(payload: any) {
    const entity = this.dataSource.manager.create<T>(this.entity, payload);
    return this.dataSource.manager.save<T>(entity);
  }

  find(options: any, relations?: string[], skip?: number, take?: number) {
    return this.dataSource.manager.find<T>(this.entity, {
      ...options,
      relations,
      skip,
      take,
    } as FindManyOptions);
  }

  findOne(options: any, relations?: string[]) {
    return this.dataSource.manager.findOne<T>(this.entity, {
      ...options,
      relations,
    } as FindOneOptions);
  }

  findById(id: any, relations?: string[]) {
    return this.dataSource.manager.findOne<T>(this.entity, {
      where: { id },
      relations,
    } as FindOneOptions);
  }

  update(conditions: any, payload: any) {
    return this.dataSource.manager.update<T>(this.entity, conditions, payload);
  }

  delete(conditions: any) {
    return this.dataSource.manager.delete<T>(this.entity, conditions);
  }

  deleteById(id: any) {
    return this.dataSource.manager.delete<T>(this.entity, id);
  }

  getEntityRepository() {
    return this.dataSource.getRepository<T>(this.entity);
  }

  createQueryBuilder(alias: string) {
    return this.dataSource.manager.createQueryBuilder<T>(this.entity, alias);
  }
}

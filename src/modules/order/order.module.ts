import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from './order.service';
import { MenuModule } from '../menu/menu.module';

@Module({
    imports: [MenuModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule { }
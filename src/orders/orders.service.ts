import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModule: typeof Order,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModule.create({
      amount: createOrderDto.amount,
    });
  }

  findAll() {
    return this.orderModule.findAll();
  }

  findOne(id: string) {
    return this.orderModule.findByPk(id, { rejectOnEmpty: true });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModule.findByPk(id, { rejectOnEmpty: true });
    order.update({ amount: updateOrderDto.amount });
    return order;
  }

  async remove(id: string) {
    const order = await this.orderModule.findByPk(id, { rejectOnEmpty: true });
    order.destroy();
  }
}

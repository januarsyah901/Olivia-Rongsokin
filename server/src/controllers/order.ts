import { Response } from 'express';
import { PrismaClient, OrderStatus, OrderMethod } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';
import { io } from '../index';

const prisma = new PrismaClient();

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customerId = req.user?.id;
    const { collectorId, categoryId, method, photoUrl, estimatedWeight } = req.body;

    if (!collectorId || !categoryId || !method || !estimatedWeight) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const order = await prisma.order.create({
      data: {
        customerId: customerId!,
        collectorId,
        categoryId,
        method: method as OrderMethod,
        photoUrl,
        estimatedWeight: parseFloat(estimatedWeight),
        status: OrderStatus.PENDING
      },
      include: {
        customer: { select: { name: true } },
        category: true
      }
    });

    // Notify collector via socket
    io.to(`collector:${collectorId}`).emit('new_order', order);

    res.status(201).json({ status: 'success', data: order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    const orders = await prisma.order.findMany({
      where: role === 'CUSTOMER' ? { customerId: userId } : { collectorId: userId },
      include: {
        customer: { select: { name: true } },
        collector: { select: { name: true } },
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: { select: { name: true } },
        collector: { select: { name: true, collectorProfile: true } },
        category: true
      }
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const collectorId = req.user?.id;

    const order = await prisma.order.update({
      where: { id, collectorId, status: OrderStatus.PENDING },
      data: { status: OrderStatus.CONFIRMED }
    });

    // Notify customer
    io.to(`order:${id}`).emit('order_status_update', { id, status: OrderStatus.CONFIRMED });

    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(400).json({ error: 'Failed to accept order' });
  }
};

export const validateOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { actualWeight, agreedPrice } = req.body;
    const collectorId = req.user?.id;

    const totalPrice = parseFloat(actualWeight) * parseFloat(agreedPrice);

    const order = await prisma.order.update({
      where: { id, collectorId },
      data: {
        actualWeight: parseFloat(actualWeight),
        agreedPrice: parseFloat(agreedPrice),
        totalPrice,
        status: OrderStatus.AWAITING_CONFIRMATION
      }
    });

    // Notify customer
    io.to(`order:${id}`).emit('order_status_update', { 
      id, 
      status: OrderStatus.AWAITING_CONFIRMATION,
      actualWeight,
      totalPrice
    });

    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(400).json({ error: 'Failed to validate order' });
  }
};

export const confirmOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customerId = req.user?.id;

    const order = await prisma.order.update({
      where: { id, customerId, status: OrderStatus.AWAITING_CONFIRMATION },
      data: { status: OrderStatus.COMPLETED }
    });

    // Create receipt snapshot
    await prisma.receipt.create({
      data: {
        orderId: id,
        detailsJson: order as any
      }
    });

    // Notify collector
    io.to(`order:${id}`).emit('order_status_update', { id, status: OrderStatus.COMPLETED });

    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(400).json({ error: 'Failed to confirm order' });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const order = await prisma.order.update({
      where: { id, status: { notIn: [OrderStatus.COMPLETED, OrderStatus.CANCELLED] } },
      data: { status: OrderStatus.CANCELLED }
    });

    io.to(`order:${id}`).emit('order_status_update', { id, status: OrderStatus.CANCELLED });

    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(400).json({ error: 'Failed to cancel order' });
  }
};

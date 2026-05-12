import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.collectorProfile.findUnique({
      where: { userId },
      include: {
        catalogs: {
          include: { category: true }
        }
      }
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: profile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { shopName, description, radiusKm, isOpen, location } = req.body;

    // Update profile
    const profile = await prisma.collectorProfile.upsert({
      where: { userId },
      update: { shopName, description, radiusKm, isOpen },
      create: { userId: userId!, shopName, description, radiusKm, isOpen }
    });

    // Update user location if provided (lat, lng)
    if (location && location.lat && location.lng) {
      await prisma.$executeRaw`
        UPDATE "User" 
        SET location = ST_SetSRID(ST_MakePoint(${location.lng}, ${location.lat}), 4326)::geography
        WHERE id = ${userId}
      `;
    }

    res.status(200).json({ status: 'success', data: profile });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCatalog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { catalogs } = req.body; // Array of { categoryId, minPrice, maxPrice, isActive }

    const profile = await prisma.collectorProfile.findUnique({ where: { userId } });
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Simple implementation: delete and recreate catalogs for this collector
    // In production, you'd want a more sophisticated approach
    await prisma.collectorCatalog.deleteMany({ where: { collectorId: profile.id } });

    if (catalogs && Array.isArray(catalogs)) {
      await prisma.collectorCatalog.createMany({
        data: catalogs.map((c: any) => ({
          collectorId: profile.id,
          categoryId: c.categoryId,
          minPrice: c.minPrice,
          maxPrice: c.maxPrice,
          isActive: c.isActive ?? true
        }))
      });
    }

    res.status(200).json({ status: 'success', message: 'Catalog updated' });
  } catch (error) {
    console.error('Update catalog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchCollectors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng, categoryId, radius = 5000 } = req.query;

    if (!lat || !lng) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const searchRadius = parseFloat(radius as string);

    // Query collectors using PostGIS
    // 1. Join User and CollectorProfile
    // 2. Filter by distance using ST_DWithin
    // 3. Optional: Filter by WasteCategory if categoryId is provided
    // 4. Sort by isPremium and then by distance
    
    let query = `
      SELECT 
        u.id, u.name, u.location,
        cp."shopName", cp.description, cp."radiusKm", cp."isPremium", cp."isOpen",
        ST_Distance(u.location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) as distance
      FROM "User" u
      JOIN "CollectorProfile" cp ON u.id = cp."userId"
      WHERE u.role = 'COLLECTOR'
      AND cp."isOpen" = true
      AND ST_DWithin(u.location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)
    `;

    const params: any[] = [longitude, latitude, searchRadius];

    if (categoryId) {
      query += ` AND EXISTS (
        SELECT 1 FROM "CollectorCatalog" cc 
        WHERE cc."collectorId" = cp.id 
        AND cc."categoryId" = $4 
        AND cc."isActive" = true
      )`;
      params.push(categoryId);
    }

    query += ` ORDER BY cp."isPremium" DESC, distance ASC`;

    const collectors = await prisma.$queryRawUnsafe(query, ...params);

    res.status(200).json({ status: 'success', data: collectors });
  } catch (error) {
    console.error('Search collectors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.wasteCategory.findMany();
    res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const iconsDirectory = path.join(process.cwd(), 'public/icons/edge');
  
  try {
    if (!fs.existsSync(iconsDirectory)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(iconsDirectory);
    const svgFiles = files
      .filter(file => file.endsWith('.svg'))
      .map(file => ({
        name: file.replace('.svg', ''),
        path: `/icons/edge/${file}`
      }));

    return NextResponse.json(svgFiles);
  } catch (error) {
    console.error('Error reading icons directory:', error);
    return NextResponse.json({ error: 'Failed to read icons' }, { status: 500 });
  }
}

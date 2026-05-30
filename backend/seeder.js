import Product from './models/Product.js';
import { sequelize } from './db.js';

// Sample automotive products data with Indian Rupee pricing
const sampleProducts = [
  {
    name: 'V8 Turbocharger Assembly',
    description: 'High-performance twin-turbo V8 turbocharger with intercooler, perfect for performance upgrades.',
    price: 125000.00,
    category: 'Parts',
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'
  },
{
     name: 'Brake Pads Set',
     description: 'High-quality brake pads set for reliable stopping power and durability.',
     price: 4500.00,
     category: 'Parts',
     stock: 5,
     imageUrl: 'https://images.unsplash.com/photo-1610524304934-2bc77bf0d7c8?w=500&q=80'
   },
  {
    name: 'LED Headlight Conversion Kit',
    description: 'Plug-and-play LED headlight kit with 6500K cool white light. Includes bulbs, drivers, and wiring harness.',
    price: 8500.00,
    category: 'Accessories',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1593359677890-a4553f867908?w=500&q=80'
  },
  {
    name: 'Hydraulic Floor Jack (3-Ton)',
    description: 'Professional 3-ton capacity hydraulic floor jack with rapid pump technology and safety valve.',
    price: 12000.00,
    category: 'Tools',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1587829922009-17c9ac12e84e?w=500&q=80'
  },
  {
    name: 'Winter Tire Set (4-Piece)',
    description: 'Set of four studless winter tires with excellent ice and snow traction. Includes mounting and balancing.',
    price: 48000.00,
    category: 'Tyres',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1607233565013-2d7c3b01ee7a?w=500&q=80'
  },
  {
    name: 'Fully Synthetic Engine Oil (5L)',
    description: 'Full synthetic 5W-40 motor oil for extended drain intervals and maximum engine protection in extreme conditions.',
    price: 2200.00,
    category: 'Oil & Fluids',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1609043047186-4fcfa5d1dc12?w=500&q=80'
  },
{
     name: 'Performance Exhaust System',
     description: 'High-performance exhaust system for improved engine efficiency and sporty sound. Includes headers, catalytic converter, and muffler.',
     price: 85000.00,
     category: 'Parts',
     stock: 7,
     imageUrl: 'https://images.unsplash.com/photo-1604175642213-2e0b1b6b5a5e?w=500&q=80'
   },
  {
    name: 'OBD-II Pro Diagnostic Scanner',
    description: 'Professional-grade OBD-II scanner with live data, freeze frame, emission readiness, and ECU programming.',
    price: 25000.00,
    category: 'Tools',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1615179510974-a7444ff26134?w=500&q=80'
  },
  {
    name: 'Racing Spark Plug Set (4-Piece)',
    description: 'Iridium racing spark plugs for improved ignition, better fuel economy, and increased horsepower.',
    price: 3500.00,
    category: 'Parts',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1598903882-90b5b5f8e3e9?w=500&q=80'
  },
  {
    name: 'Coilover Suspension Kit',
    description: 'Adjustable coilover suspension system with damping control for superior handling and ride quality.',
    price: 95000.00,
    category: 'Parts',
    stock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-616fbcd51c9f?w=500&q=80'
  },
  {
    name: 'Performance Air Filter',
    description: 'High-flow reusable air filter for increased airflow and engine performance. Washable and reusable.',
    price: 2800.00,
    category: 'Parts',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1601945522149-2fcfa5d4a2e1?w=500&q=80'
  },
  {
    name: 'Leather Steering Wheel Cover',
    description: 'Premium genuine leather steering wheel cover for improved grip and luxury feel. Universal fit.',
    price: 1800.00,
    category: 'Accessories',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1587052721682-b3b8b5f2e2e1?w=500&q=80'
  },
  {
    name: 'Alloy Wheel Set (4-Piece)',
    description: 'Lightweight alloy wheel set with attractive design. Includes tires, mounting, and balancing.',
    price: 65000.00,
    category: 'Parts',
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-616fbcd51c9f?w=500&q=80'
  },
  {
    name: 'Dashboard Camera (Dual Channel)',
    description: 'Front and rear facing dash camera with night vision, GPS tracking, and loop recording.',
    price: 12000.00,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1593359677890-a4553f867908?w=500&q=80'
  },
  {
    name: 'Brake Fluid (DOT 4, 1L)',
    description: 'High-performance DOT 4 brake fluid for superior braking performance under extreme conditions.',
    price: 850.00,
    category: 'Oil & Fluids',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1609043047186-4fcfa5d1dc12?w=500&q=80'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Authenticate and sync database
    await sequelize.authenticate();
    console.log('🔌 Database connection established');
    
    // Sync models (this will create tables if they don't exist)
    await sequelize.sync({ force: true }); // force: true will drop and recreate tables
    console.log('📦 Database synchronized');
    
    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('🗑️  Cleared existing products');
    
    // Insert sample products
    const createdProducts = await Product.bulkCreate(sampleProducts);
    console.log(`✅ Seeded ${createdProducts.length} products:`);
    
    createdProducts.forEach(product => {
      console.log(`   - ${product.name} (₹${product.price.toLocaleString('en-IN')})`);
    });
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
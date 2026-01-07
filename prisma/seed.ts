import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai seeding...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@clodream.com' },
    update: {},
    create: {
      email: 'admin@clodream.com',
      name: 'Admin Clodream',
      password: hashedPassword,
      role: 'admin',
    },
  })
  
  console.log('✅ Admin berhasil dibuat:', admin.email)

  await prisma.product.createMany({
    data: [
      {
        name: 'Clodream Signature Tee',
        price: 150000,
        description: 'Kaos katun bambu premium dengan sablon plastisol tahan lama.',
        image: '/images/tshirt-black.jpg',
      },
      {
        name: 'Urban Bomber Jacket',
        price: 450000,
        description: 'Jaket bomber anti angin cocok untuk riding malam.',
        image: '/images/bomber-green.jpg',
      },
      {
        name: 'Streetwear Cargo Pants',
        price: 325000,
        description: 'Celana cargo dengan banyak saku fungsional.',
        image: '/images/cargo-grey.jpg',
      },
    ],
    skipDuplicates: true, 
  })

  console.log('✅ Produk berhasil dibuat.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
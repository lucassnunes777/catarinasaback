import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Saback#2025!', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'catarina@sabackimoveis.com' },
    update: {},
    create: {
      email: 'catarina@sabackimoveis.com',
      password: hashedPassword,
      name: 'Catarina Saback',
      creci: '35622'
    }
  })

  console.log('Created admin user:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


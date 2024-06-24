import { faker } from 'https://esm.sh/@faker-js/faker'
import User from '../User'
import Curriculum from '../Curriculum'

// Generate seed data for users
const generateUsers = async (numUsers) => {
  try {
    for (let i = 0; i < numUsers; i++) {
      const hashedPassword = await hashPassword(faker.internet.password())
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
      })
      await user.save()
    }
    console.log(`${numUsers} users seeded successfully.`)
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}

// Generate seed data for curricula
// const generateCurricula = async (numCurricula) => {
//   try {
//     for (let i = 0; i < numCurricula; i++) {
//       const curriculum = new Curriculum({
//         title: faker.lorem.words(3),
//         description: faker.lorem.sentence(),
//         // Add any other curriculum properties you need
//       })
//       await curriculum.save()
//     }
//     console.log(`${numCurricula} curricula seeded successfully.`)
//   } catch (error) {
//     console.error('Error seeding curricula:', error)
//   }
// }

// Call the functions to generate seed data
const numUsers = 10 // Number of users to generate
// const numCurricula = 5 // Number of curricula to generate

generateUsers(numUsers)
// generateCurricula(numCurricula)

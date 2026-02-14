import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockingModule.js';
import Users from '../dao/Users.dao.js';
import Pets from '../dao/Pets.dao.js';

const router = Router();
const usersService = new Users();
const petsService = new Pets();


router.get('/mockingusers', async (req, res) => {
    try {
        const mockUsers = generateMockUsers(50);
        
        res.status(200).json({
            status: 'success',
            payload: mockUsers
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await usersService.get({});
        
        const usersWithPets = await Promise.all(
            users.map(async (user) => {
                const userObj = user.toObject();
                
                if (userObj.pets && userObj.pets.length > 0) {
                    const petIds = userObj.pets.map(pet => pet._id);
                    const pets = await Promise.all(
                        petIds.map(id => petsService.getBy({ _id: id }))
                    );
                    userObj.pets = pets.filter(pet => pet !== null);
                }
                
                return userObj;
            })
        );
        
        res.status(200).json({
            status: 'success',
            count: usersWithPets.length,
            payload: usersWithPets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/pets', async (req, res) => {
    try {
        const pets = await petsService.get({});
        
        const adopted = pets.filter(pet => pet.adopted);
        const available = pets.filter(pet => !pet.adopted);
        
        res.status(200).json({
            status: 'success',
            count: pets.length,
            summary: {
                total: pets.length,
                adopted: adopted.length,
                available: available.length
            },
            payload: pets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        
        if (!users || !pets || isNaN(users) || isNaN(pets)) {
            return res.status(400).json({
                status: 'error',
                message: 'Los parámetros "users" y "pets" deben ser números válidos'
            });
        }

        const numUsers = parseInt(users);
        const numPetsPerUser = parseInt(pets);
        
        const insertedUsers = [];
        let totalPetsInserted = 0;

        for (let i = 0; i < numUsers; i++) {
            const mockUser = generateMockUsers(1)[0];
            
            const createdUser = await usersService.save(mockUser);
            
            const mockPets = generateMockPets(numPetsPerUser);
            
            const userPetIds = [];
            
            for (const pet of mockPets) {
                pet.owner = createdUser._id;
                pet.adopted = true; 
                
                const createdPet = await petsService.save(pet);
                userPetIds.push({ _id: createdPet._id });
                totalPetsInserted++;
            }
            
            createdUser.pets = userPetIds;
            await usersService.update(createdUser._id, { pets: userPetIds });
            
            insertedUsers.push(createdUser);
        }

        res.status(201).json({
            status: 'success',
            message: `Se generaron ${insertedUsers.length} usuarios, cada uno con ${numPetsPerUser} mascotas`,
            payload: {
                usersInserted: insertedUsers.length,
                petsInserted: totalPetsInserted,
                petsPerUser: numPetsPerUser
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
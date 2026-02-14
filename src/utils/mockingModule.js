import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (count) => {
    const users = [];
    
    for (let i = 0; i < count; i++) {
        const hashedPassword = bcrypt.hashSync('coder123', 10);
        
        const role = faker.helpers.arrayElement(['user', 'admin']);
        
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: role,
            pets: [] 
        };
        
        users.push(user);
    }
    
    return users;
};

export const generateMockPets = (count) => {
    const pets = [];
    
    const species = ['dog', 'cat', 'bird', 'fish', 'hamster', 'rabbit', 'turtle'];
    
    for (let i = 0; i < count; i++) {
        const pet = {
            name: faker.person.firstName(), 
            specie: faker.helpers.arrayElement(species),
            birthDate: faker.date.past({ years: 10 }), 
            adopted: false,
            owner: null 
        };
        
        pets.push(pet);
    }
    
    return pets;
};

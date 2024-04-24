import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserRole } from "src/user/entities/user.entity";

export const sellerSeed:CreateUserDto[] = [
    {
        email: 'cristian@mail.com',
        name: 'Cristian',
        lastName: 'Gomez',
        password: 'CristianGomez',
        roles: [UserRole.SELLER],
    },
    {
        email: 'medina@mail.com',
        name: 'Medina',
        lastName: 'Gomez',
        password: 'MedinaGomez',
        roles: [UserRole.SELLER],
    },
    {
        email: 'david@mail.com',
        name: 'David',
        lastName: 'Gomez',
        password: 'DavidGomez',
        roles: [UserRole.BUYER],
    },{
        email: 'jhondoe@mail.com',
        name: 'Jhon',
        lastName: 'Jackson',
        password: 'JhonDoe',
        roles: [UserRole.BUYER],
    }
];
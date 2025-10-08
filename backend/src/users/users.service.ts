import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    //  Verifica se o usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Criar o novo usuário 
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        // É essencial fazer o hash da senha aqui antes de salvar!
        password: createUserDto.password || 'temp123', 
      },
    });

    return newUser;
  }

  async findAll() {
    // Não precisa declarar uma variável separada se você retorna diretamente
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 1. Verificar se o usuário a ser atualizado existe
    await this.findOne(id); 
    // Reutiliza a função findOne, que já lança HttpException se não encontrar.

    // 2. Verificar se o novo e-mail já está em uso por OUTRO usuário
    if (updateUserDto.email) {
      const emailExists = await this.prisma.user.findFirst({
        where: {
          email: updateUserDto.email,
          NOT: { id }, // Ignora o usuário que está sendo atualizado
        },
      });

      if (emailExists) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    // 3. Atualizar o usuário
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...updateUserDto },
    });
    return updatedUser;
  }

  async remove(id: number) {
    try {
      // Deleta diretamente. O bloco try/catch gerencia o erro se o ID não existir.
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return deletedUser;
    } catch (error) {
      // Captura o erro P2025: Record not found)

      if (error.code === 'P2025') { throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      // Relança erros inesperados
      throw error;
    }
  }
}

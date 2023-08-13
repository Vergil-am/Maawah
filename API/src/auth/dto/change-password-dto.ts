import { UpdateUserDto } from "src/users/dto/update-user.dto";

export class ChangePasswordDto extends UpdateUserDto {
  code: string
} 

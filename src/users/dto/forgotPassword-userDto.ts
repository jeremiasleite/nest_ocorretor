import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordUserDto{
    @ApiProperty()
    readonly email: string
}
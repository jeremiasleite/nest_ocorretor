import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordDto{
    @ApiProperty()
    readonly _id: string
    @ApiProperty()
    readonly token: string
    @ApiProperty()
    readonly password: string
}
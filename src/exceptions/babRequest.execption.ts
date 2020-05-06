import { BadRequestException } from "@nestjs/common";

export class CostumeBadRequestException extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}
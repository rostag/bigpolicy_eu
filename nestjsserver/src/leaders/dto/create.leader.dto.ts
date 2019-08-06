import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class CreateLeaderDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 50)
  @Trim()
  public readonly name: string;
}

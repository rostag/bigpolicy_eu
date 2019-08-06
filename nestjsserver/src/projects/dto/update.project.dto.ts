import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class UpdateProjectDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 50)
  @Trim()
  public readonly title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 50)
  @Trim()
  public readonly description: string;
}

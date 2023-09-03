import {
  IS_NUMBER_STRING,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

interface IsFileOptions {
  mime: ('image/jpg' | 'image/jpeg')[];
}

export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string): void {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return !!(
            value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)
          );
        },
      },
    });
  };
}

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  email: string;

  @IsPhoneNumber('UA')
  @IsNotEmpty()
  phone: string;

  @IsNumberString()
  @IsNotEmpty()
  position_id: number;

  image: any;
}

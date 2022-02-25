import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    return getManager()
      .count(entity, { [args.property]: value })
      .then((count) => count < 1);
  }
}

export function UniqueOnDatabase(
  entity: any,
  validationOptions?: ValidationOptions,
) {
  validationOptions = {
    ...{ message: '$value already exists. Choose another.' },
    ...validationOptions,
  };
  return function (object: unknown, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}

// const user = await this.usersService.getByEmail(registrationData.email);
// if (user) {
//   if (!user.isEmailConfirmed) {
//     await this.emailConfirmService.resendConfirmationLink(user.id);
//   }
//   if (user.isEmailConfirmed) {
//     console.log('here');
//     throw new HttpException(
//       'User with that email already exists',
//       HttpStatus.BAD_REQUEST,
//     );
//   }

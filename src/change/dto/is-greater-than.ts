
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";



export function IsGreaterThan(property: string, validatiionOptions?: ValidationOptions){
    return function(object: Object, propertyName: string){
       registerDecorator({
        name: 'isGreaterThan',
        target: object.constructor,
        propertyName: propertyName,
        options: validatiionOptions,
        constraints: [property],
        validator: {
            validate(value: any, args: ValidationArguments){
                const [relatedPropertyName] = args.constraints;
                const relatedValue = (args.object as any)[relatedPropertyName];
                return typeof value === 'number' && typeof relatedValue === 'number' && value > relatedValue;
            },
            defaultMessage(args: ValidationArguments){
                const [relatedPropertyName] = args.constraints;
                return `${args.property} must be greater than ${relatedPropertyName}`;
            }
        }
       })
    }

}
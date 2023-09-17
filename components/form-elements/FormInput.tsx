import { Control, FieldValues, Path } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type FormInputProps<T> = {
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
    label?: string;
    description?: string;
};

function FormInput<T>({
    control,
    name,
    description,
    label,
}: FormInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    {fieldState.error?.message && (
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}

export default FormInput;

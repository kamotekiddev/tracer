import { Control, FieldValues, Path } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type FormSelectInputProps<T> = {
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
    label?: string;
    description?: string;
    data: { label: string; value: string }[];
    placeholder?: string;
};

function FormSelectInput<T>({
    control,
    name,
    description,
    label,
    data,
    placeholder,
}: FormSelectInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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

export default FormSelectInput;

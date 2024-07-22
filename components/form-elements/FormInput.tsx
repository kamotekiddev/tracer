"use client";

import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

interface Props<T> extends InputProps {
    label?: string;
    description?: string;
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
    formatValue?: (value: string) => string;
}

function FormInput<T>({
    name,
    label,
    description,
    control,
    required,
    formatValue,
    ...props
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>
                        {required ? label?.concat(" *") : label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...props}
                            {...field}
                            onChange={(e) => {
                                if (formatValue)
                                    return field.onChange(
                                        formatValue(e.target.value),
                                    );

                                return field.onChange(e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}

export default FormInput;

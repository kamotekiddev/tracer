"use client";

import React, { ComponentPropsWithRef } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface Props<T> extends ComponentPropsWithRef<"input"> {
    label: string;
    description?: string;
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
}

function FormInput<T>({
    name,
    label,
    description,
    control,
    ...props
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...props} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}

export default FormInput;

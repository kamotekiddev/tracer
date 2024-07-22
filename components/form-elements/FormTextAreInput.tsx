"use client";

import React, { ComponentPropsWithRef } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface Props<T> extends ComponentPropsWithRef<"textarea"> {
    label?: string;
    description?: string;
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
}

function FormTextAreaInput<T>({
    name,
    label,
    description,
    control,
    required,
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
                        <Textarea {...props} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}

export default FormTextAreaInput;

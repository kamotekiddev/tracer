"use client";

import React from "react";
import { ArchiveIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props<T> {
    label?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
    data: Array<{ label: string; value: string }>;
}

function FormSelectInput<T>({
    name,
    label,
    description,
    control,
    placeholder,
    required,
    data,
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
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {!data.length && (
                                    <div className="flex cursor-default items-center gap-2 p-4 text-neutral-400">
                                        <ArchiveIcon />
                                        No data to select
                                    </div>
                                )}
                                {data.map((d) => (
                                    <SelectItem key={d.value} value={d.value}>
                                        {d.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}

export default FormSelectInput;

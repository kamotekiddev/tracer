"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

interface Props<T> {
    label?: string;
    description?: string;
    control: Control<FieldValues & T>;
    name: Path<FieldValues & T>;
    placeholder?: string;
    required?: boolean;
    dateFormat?: string;
}

function FormDateInput<T>({
    name,
    label,
    description,
    control,
    required,
    dateFormat = "MM dd, yyyy",
    placeholder = "Pick a Date",
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                const value = field.value
                    ? format(field.value, dateFormat)
                    : placeholder;

                return (
                    <FormItem>
                        <FormLabel>
                            {required ? label?.concat(" *") : label}
                        </FormLabel>
                        <FormControl>
                            <Popover modal>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {value}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage>{error?.message}</FormMessage>
                    </FormItem>
                );
            }}
        />
    );
}

export default FormDateInput;

import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

//Reusable Input Field! Good for passwords, emails, etc.
const InputField = ({ name, label, placeholder, type = "text", register, error, validation, disabled, value}: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(`form-input`, {'opacity cursor-not-allowed': disabled})}
                {...register(name, validation)}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
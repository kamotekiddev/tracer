"use client";

import NavigationListItem from "./NavigationListItem";

interface Item {
    title: string;
    value: string;
}

interface Props {
    items: Item[];
    value: string;
    onChange: (value: string) => void;
}

function NavigationList({ items, value, onChange }: Props) {
    return (
        <div className="flex gap-2">
            {items.map((item, idx) => (
                <NavigationListItem
                    isActive={item.value === value}
                    key={idx}
                    value={item.value}
                    onClick={() => onChange(item.value)}
                >
                    {item.title}
                </NavigationListItem>
            ))}
        </div>
    );
}

export default NavigationList;

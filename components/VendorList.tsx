"use client";

export default function VendorList({ vendors = [] }: { vendors?: any[] }) {
    if (!vendors.length) return <p className="text-gray-500">No vendors found.</p>;

    return (
        <ul className="space-y-3">
            {vendors.map((vendor) => (
                <li
                    key={vendor.id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col gap-1 bg-white"
                >
                    <span className="font-semibold text-lg text-blue-700">{vendor.name}</span>
                    <span className="text-sm text-gray-500">{vendor.email} | {vendor.phone}</span>
                </li>
            ))}
        </ul>
    );
} 
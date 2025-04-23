import { useState } from "react";
import { useToast } from "../../context/ToastContext.tsx";
import {saveNewUserAddressService} from "../../services/apiServices.ts";
import {Address} from "../../interfaces/user.ts";

interface NewAddressModalProps {
    updateAddressHandler: (address: Address[]) => void;
}

const NewAddressModal = ({ updateAddressHandler }: NewAddressModalProps) => {
    const { showToast } = useToast();
    const [address, setAddress] = useState<Address>({
        fullName: "",
        mobileNumber: "",
        houseNo: "",
        street: "",
        city: "",
        postalCode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!address.fullName || !address.mobileNumber || !address.houseNo || !address.street || !address.city || !address.postalCode) {
            showToast({ type: "error", message: "All fields are required" });
            return;
        }

        const res = await saveNewUserAddressService(address)
        if (res.success) {
            updateAddressHandler(res.body as Address[]);
            // @ts-expect-error close() comes with daisyUI and not recognized by TypeScript
            document.getElementById("my_modal_5")?.close();
            showToast({ type: "success", message: "Address saved successfully!" });
        } else {
            showToast({ type: "error", message: res.message})
        }
    };

    return (
        <dialog id="my_modal_5" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Address</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your address details below:</p>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                        value={address.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="input input-bordered w-full"
                        value={address.mobileNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="houseNo"
                        placeholder="House No"
                        className="input input-bordered w-full"
                        value={address.houseNo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        className="input input-bordered w-full"
                        value={address.street}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="input input-bordered w-full"
                        value={address.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="input input-bordered w-full"
                        value={address.postalCode}
                        onChange={handleChange}
                    />
                </div>

                <div className="modal-action">

                    <button
                        className="btn btn-outline"
                        // @ts-expect-error close() comes with daisyUI and not recognized by TypeScript
                        onClick={() => document.getElementById("my_modal_5")?.close()
                    }>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Address
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default NewAddressModal;

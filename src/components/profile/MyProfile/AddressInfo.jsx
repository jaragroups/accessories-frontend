"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import removeNotification from "@/lib/removeNotification";
import showNotification from "@/lib/showNotification";
import { useEffect, useState } from "react";

export default function AddressInfo({ addressInfo, setUserDetails }) {
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [error, setError] = useState("");
  const axios = useAxiosSecure();

  const { street, city, country, postCode } = addressInfo?.address || {};

  const [addressDetails, setAddressDetails] = useState({
    street,
    city,
    country,
    postCode,
    state: city,
  });

  useEffect(() => {
    setAddressDetails({
      street,
      city,
      country,
      postCode,
      state: city,
    });
  }, [street, city, country, postCode]);

  /**
   * Resets the address form state to the initial values fetched from addressDetails.
   */
  const resetAddressInfo = () => {
    setAddressDetails({
      street,
      city,
      country,
      postCode,
      state: city,
    });
  };

  const handleAddressInfoUpdate = async (e) => {
    e.preventDefault();
    showNotification("loading", "Updating...");

    const data = {
      address: addressDetails,
    };

    try {
      const res = await axios.patch(`/users/${addressInfo?.id}`, data, {
        withCredentials: true,
      });

      setIsAddressEditing(false);
      setUserDetails(res.data?.data);

      removeNotification();
      showNotification("success", "Successfully updated");
    } catch (error) {
      setError(error?.response?.data?.message);

      removeNotification();
      setIsAddressEditing(false);
      setAddressDetails({
        street,
        city,
        country,
        postCode,
        state: city,
      });
      showNotification("error", error?.response?.data?.message);
    }
  };

  return (
    <section className="rounded-lg border px-11 py-9">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-medium">Address</h3>
        <button
          type="button"
          className="hover:text-highlight cursor-pointer text-base text-gray-500 underline duration-300"
          onClick={() =>
            setIsAddressEditing((prev) => {
              if (prev) {
                resetAddressInfo();
                setError("");
              }

              return !prev;
            })
          }
        >
          {isAddressEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleAddressInfoUpdate}>
        <div className="grid grid-cols-2 gap-6">
          <div className="grow">
            <label className="mb-1 block text-sm text-gray-500">Country</label>
            {isAddressEditing ? (
              <input
                type="text"
                placeholder="Enter Country"
                value={addressDetails.country || ""}
                onChange={(e) => {
                  setAddressDetails((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }));
                }}
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="capitalize">{addressDetails.country || "N/A"}</p>
            )}
          </div>

          <div className="grow">
            <label className="mb-1 block text-sm text-gray-500">
              City / State
            </label>
            {isAddressEditing ? (
              <input
                type="text"
                placeholder="Enter City / State"
                value={addressDetails.city || ""}
                onChange={(e) => {
                  setAddressDetails((prev) => ({
                    ...prev,
                    city: e.target.value,
                    state: e.target.value,
                  }));
                }}
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="capitalize">{addressDetails.city || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Postal Code
            </label>
            {isAddressEditing ? (
              <input
                type="text"
                placeholder="Enter Postal Code"
                value={addressDetails.postCode || ""}
                onChange={(e) => {
                  setAddressDetails((prev) => ({
                    ...prev,
                    postCode: e.target.value,
                  }));
                }}
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p>{addressDetails.postCode || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Street Address
            </label>
            {isAddressEditing ? (
              <input
                type="text"
                placeholder="Enter Street Address"
                value={addressDetails.street || ""}
                onChange={(e) => {
                  setAddressDetails((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }));
                }}
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="capitalize">{addressDetails.street || "N/A"}</p>
            )}
          </div>
        </div>

        {error && <p className="mt-4 text-red-500 capitalize">{error}</p>}

        {isAddressEditing && (
          <div className="mt-6">
            <button
              className="cursor-pointer rounded-md bg-[#2F9ECF] px-4 py-2 text-white transition-colors hover:bg-[#2681a8]"
              type="submit"
            >
              Update
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

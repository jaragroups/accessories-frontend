"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import removeNotification from "@/lib/removeNotification";
import showNotification from "@/lib/showNotification";
import { useEffect, useState } from "react";

export default function PersonalInfo({
  userDetails = {
    id: 101101,
    fname: "User",
    lname: "101101",
    email: "jB7yX@example.com",
    phone: "+880 123 456 789",
    gender: "male",
  },
  setUserDetails,
}) {
  const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
  const axios = useAxiosSecure();

  const { id, fname, lname, email, phone, gender } = userDetails || {};

  const [userData, setUserData] = useState({
    fname,
    lname,
    email,
    phone,
    gender,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setUserData({
      fname,
      lname,
      email,
      phone,
      gender,
    });
  }, [fname, lname, email, phone, gender]);

  /**
   * Resets the user data state to the initial values fetched from userDetails.
   */
  const resetPersonalInfo = () => {
    setUserData({ fname, lname, email, phone, gender });
  };

  /**
   * Update Personal Info Handler
   */
  const handlePersonalInfoUpdate = async (e) => {
    e.preventDefault();
    showNotification("loading", "Updating...");

    try {
      const res = await axios.patch(`/users/${id}`, userData, {
        withCredentials: true,
      });

      setIsPersonalInfoEditing(false);
      setUserDetails(res.data?.data);

      removeNotification();
      showNotification("success", "Successfully updated");
    } catch (error) {
      removeNotification();
      setIsPersonalInfoEditing(false);
      setUserData({ fname, lname, email, phone, gender });
      showNotification("error", error?.response?.data?.message);
    }
  };

  return (
    <section className="my-4 rounded-lg border px-11 py-9">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-medium">Personal Information</h3>
        <button
          type="button"
          className="hover:text-highlight cursor-pointer text-base text-gray-500 underline duration-300"
          onClick={() =>
            setIsPersonalInfoEditing((prev) => {
              if (prev) {
                resetPersonalInfo();
                setError("");
              }

              return !prev;
            })
          }
        >
          {isPersonalInfoEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handlePersonalInfoUpdate}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm text-gray-500">
              First Name
            </label>
            {isPersonalInfoEditing ? (
              <input
                type="text"
                value={userData.fname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    fname: e.target.value,
                  })
                }
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p>User </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Last Name
            </label>
            {isPersonalInfoEditing ? (
              <input
                type="text"
                value={userData.lname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    lname: e.target.value,
                  })
                }
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p>101101</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Email Address
            </label>
            {isPersonalInfoEditing ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p>jB7yX@example.com</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">Phone</label>
            {isPersonalInfoEditing ? (
              <div className="flex">
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="box-border w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <p>+880 123 456 789</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-sm text-gray-500">Gender</label>
            {isPersonalInfoEditing ? (
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={userData.gender === "male"}
                    value={"male"}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="h-4 w-4 border-primary"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={userData.gender === "female"}
                    value={"female"}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            ) : (
              <p className="capitalize">{userData.gender || "N/A"}</p>
            )}
          </div>
        </div>
        {error && <p className="mt-4 text-red-500 capitalize">{error}</p>}
        {isPersonalInfoEditing && (
          <div className="mt-6">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-[#2F9ECF] px-4 py-2 text-white transition-colors hover:bg-[#2681a8]"
            >
              Update
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

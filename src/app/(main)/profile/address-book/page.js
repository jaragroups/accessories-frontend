"use client";

import AddressCard from "@/components/profile/AddressBook/AddressCard";
import AddressForm from "@/components/profile/AddressBook/AddressForm";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function Page() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const user = {
    emailAddresses: [
      {
        emailAddress: "lahodyj@mailinator.com",
      },
    ],
  };
  const axios = useAxiosSecure();

  useEffect(() => {
    async function fetchUserAddresses() {
      try {
        const res = await axios.get(
          `/v1/user/delivery-addresses?user_email=${user?.emailAddresses?.[0]?.emailAddress}`,
        );

        if (!res?.data) {
          throw new Error("No data received from server");
        }

        const { data } = res?.data;
        if (!data) {
          throw new Error("Invalid data structure received");
        }

        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    }

    if (user?.emailAddresses?.[0]?.emailAddress) {
      fetchUserAddresses();
    }

    return () => {};
  }, [axios, user?.emailAddresses]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {!!addresses?.length &&
          addresses?.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}

        <form>
          <DialogTrigger asChild>
            <Card className="grid h-[8.875rem] max-w-[13rem] cursor-pointer place-items-center px-7 py-5">
              <CardDescription className="space-y-2">
                <FaPlus className="mx-auto block rounded-full bg-[#3EAFE1] p-2 text-3xl text-white" />
                <span className="text-lg">Add a new address</span>
              </CardDescription>
            </Card>
          </DialogTrigger>
          <DialogContent className="px-[35px] sm:max-w-[530px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add a new address</DialogTitle>
            </DialogHeader>
            <AddressForm setOpen={setOpen} setAddresses={setAddresses} />
          </DialogContent>
        </form>
      </section>
    </Dialog>
  );
}

import AddressInfo from "@/components/profile/MyProfile/AddressInfo";
import PersonalInfo from "@/components/profile/MyProfile/PersonalInfo";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <section className="col-span-9">
      <h2 className="border-stroke border-b text-xl/[3rem] font-bold">
        My Profile
      </h2>

      <section className="mt-9">
        {/* Profile Header */}
        <section className="flex items-center gap-x-4 rounded-lg border px-11 py-9 md:gap-x-14">
          <Image
            src={"/user.png"}
            alt="Profile"
            width={130}
            height={130}
            className="size-[8.125rem] rounded-full object-cover shadow"
          />
          <div>
            <h2 className="text-2xl font-medium">{"User 101101"}</h2>
            <p className="text-mute text-sm">+880 123 456 789</p>
            <p className="text-mute text-sm">jB7yX@example.com</p>
          </div>
        </section>

        <PersonalInfo />
        <AddressInfo />
      </section>
    </section>
  );
}

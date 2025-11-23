import AddressCard from "@/components/profile/Dashboard/AddressCard";
import OrderHistory from "@/components/profile/Dashboard/OrderHistory";
import UserCard from "@/components/profile/Dashboard/UserCard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl">Manage My Dashboard</h1>

      <section className="mt-5 grid grid-cols-3 gap-x-5">
        <UserCard />
        <AddressCard />
      </section>

      <section className="mt-5 rounded bg-gray-100/60 p-4">
        <h2 className="text-xl">Order History</h2>

        <OrderHistory />
      </section>
    </div>
  );
}

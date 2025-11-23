export default function AddressCard() {
  return (
    <section className="col-span-2 rounded bg-gray-100/60 p-4">
      <h2 className="font-base text-xl">Address Book</h2>

      <div className="flex items-start justify-between gap-x-4 divide-x-2">
        <AddressDetails type="Home" />
        <AddressDetails type="Work" />
      </div>
    </section>
  );
}

function AddressDetails({ type }) {
  return (
    <div className="mt-4 min-h-25 w-1/2">
      <p className="font-base text-lg text-gray-500">{type}</p>

      <h4 className="font-semibold">John Doe</h4>
      <p className="font-light">123 Main St, New York, NY 10001</p>
      <p className="font-light">123-456-7890</p>
    </div>
  );
}

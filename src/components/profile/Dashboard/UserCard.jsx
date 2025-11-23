export default function UserCard() {
  return (
    <div className="rounded bg-gray-100/60 p-4">
      <h2 className="font-base text-xl">Personal Profile</h2>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <span className="font-base text-sm">Name:</span>
          <span className="font-base text-sm">John Doe</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-base text-sm">Email:</span>
          <span className="font-base text-sm">john.doe@example.com</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-base text-sm">Phone:</span>
          <span className="font-base text-sm">123-456-7890</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-base text-sm">Address:</span>
          <span className="font-base text-sm">
            123 Main St, New York, NY 10001
          </span>
        </div>
      </div>
    </div>
  );
}

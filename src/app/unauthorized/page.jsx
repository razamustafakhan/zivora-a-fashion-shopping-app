import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Access Denied</h1>

      <p>You do not have permission to access this page.</p>

      <Link href="/" className="mt-4 inline-block text-blue-600">
        Back to Home
      </Link>
    </main>
  );
}

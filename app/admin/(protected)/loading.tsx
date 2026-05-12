export default function AdminLoading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 animate-pulse rounded-2xl bg-white" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-32 animate-pulse rounded-3xl bg-white" />
        <div className="h-32 animate-pulse rounded-3xl bg-white" />
        <div className="h-32 animate-pulse rounded-3xl bg-white" />
      </div>
    </div>
  );
}

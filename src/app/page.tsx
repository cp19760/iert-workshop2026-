import Link from 'next/link';

type Pipeline = {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  lastRun: string;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const resolvedParams = await searchParams;
  const viewState = resolvedParams?.state || 'data';

  const pipelines: Pipeline[] =
    viewState === 'empty'
      ? []
      : [
          {
            id: 'wf_01',
            name: 'stripe-invoice-webhook',
            status: 'Active',
            lastRun: '2 mins ago',
          },
          {
            id: 'wf_02',
            name: 'supabase-user-audit',
            status: 'Active',
            lastRun: '14 mins ago',
          },
        ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Workflow Pipelines
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage active webhook endpoints and inspect execution health.
            </p>
          </div>

          {/* State Switcher Links (Zero Client-Side Crash) */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard?state=data"
              className={`text-xs font-mono px-3 py-1.5 rounded border ${
                viewState === 'data'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              Data View
            </Link>
            <Link
              href="/dashboard?state=loading"
              className={`text-xs font-mono px-3 py-1.5 rounded border ${
                viewState === 'loading'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              Loading State
            </Link>
            <Link
              href="/dashboard?state=empty"
              className={`text-xs font-mono px-3 py-1.5 rounded border ${
                viewState === 'empty'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              Empty State
            </Link>
            <Link
              href="/dashboard?state=error"
              className={`text-xs font-mono px-3 py-1.5 rounded border ${
                viewState === 'error'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              Error State
            </Link>
          </div>
        </div>

        {/* 1. LOADING STATE */}
        {viewState === 'loading' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 space-y-4">
            <div className="h-4 w-48 bg-slate-800 rounded animate-pulse" />
            <div className="h-12 w-full bg-slate-800/60 rounded animate-pulse" />
            <div className="h-12 w-full bg-slate-800/60 rounded animate-pulse" />
          </div>
        )}

        {/* 2. ERROR STATE */}
        {viewState === 'error' && (
          <div className="bg-slate-900 border border-red-900/60 rounded-lg p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-red-400">
                Connection Timeout (ERR_DB_504)
              </h3>
              <p className="text-sm text-slate-400">
                Unable to fetch pipeline telemetry from the local cluster.
              </p>
            </div>
            <Link
              href="/dashboard?state=data"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shrink-0"
            >
              Retry Sync
            </Link>
          </div>
        )}

        {/* 3. EMPTY STATE */}
        {viewState === 'empty' && (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-lg p-12 text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-sm text-slate-400">
              0
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">
                No active pipelines
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Deploy your first deterministic webhook pipeline to start
                capturing verified event logs.
              </p>
            </div>
            <Link
              href="/dashboard?state=data"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Create Pipeline
            </Link>
          </div>
        )}

        {/* 4. POPULATED DATA STATE */}
        {viewState === 'data' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg divide-y divide-slate-800">
            {pipelines.map((item) => (
              <div
                key={item.id}
                className="p-6 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-white">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-600/10 text-blue-400 border border-blue-600/20">
                      {item.status}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-500">
                    ID: {item.id}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Last run: {item.lastRun}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

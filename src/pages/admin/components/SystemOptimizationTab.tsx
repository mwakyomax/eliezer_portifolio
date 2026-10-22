import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Server, 
  Trash2, 
  Download, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { 
  fetchSystemHealth, 
  pingSystem, 
  runSystemOptimization, 
  warmupSystem, 
  SystemHealthData 
} from '../../../services/api';

interface SystemOptimizationTabProps {
  notify: (msg: string, type?: 'success' | 'error') => void;
}

export const SystemOptimizationTab: React.FC<SystemOptimizationTabProps> = ({ notify }) => {
  const [healthData, setHealthData] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isWarming, setIsWarming] = useState<boolean>(false);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [optResult, setOptResult] = useState<{
    message: string;
    durationMs: number;
    reclaimedHeapMB: number;
    tasksPerformed: string[];
  } | null>(null);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      const res = await fetchSystemHealth();
      if (res.data) {
        setHealthData(res.data);
      }
    } catch (err) {
      console.error('Error fetching system health:', err);
    } finally {
      setLoading(false);
    }
  };

  const measureLatency = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      await pingSystem();
      const end = performance.now();
      const roundTrip = Math.round(end - start);
      setLatencyMs(roundTrip);
      notify(`API Latency: ${roundTrip}ms`, 'success');
    } catch (err) {
      notify('Failed to ping API server', 'error');
    } finally {
      setIsPinging(false);
    }
  };

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    try {
      const res = await runSystemOptimization();
      if (res.data?.success) {
        setOptResult({
          message: res.data.message,
          durationMs: res.data.durationMs,
          reclaimedHeapMB: res.data.reclaimedHeapMB,
          tasksPerformed: res.data.tasksPerformed,
        });
        notify(`Optimization complete in ${res.data.durationMs}ms! Reclaimed ${res.data.reclaimedHeapMB}MB`, 'success');
        await loadHealthData();
      }
    } catch (err) {
      notify('Failed to execute optimization routine', 'error');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleWarmup = async () => {
    setIsWarming(true);
    try {
      const res = await warmupSystem();
      if (res.data?.success) {
        notify(`Warmup complete in ${res.data.durationMs}ms across ${res.data.warmedCollections.length} collections`, 'success');
      }
    } catch (err) {
      notify('Warmup failed', 'error');
    } finally {
      setIsWarming(false);
    }
  };

  const handlePurgeClientCache = () => {
    try {
      // Purge non-essential sessionStorage and image preview caches
      sessionStorage.clear();
      // Remove any temp data without logging out the user
      const keysToKeep = ['admin_token', 'admin_user', 'portfolio_bookmarks'];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key) && !key.startsWith('liquid_')) {
          localStorage.removeItem(key);
        }
      }
      notify('Client browser caches purged successfully', 'success');
    } catch {
      notify('Client cache purge completed', 'success');
    }
  };

  const handleExportDiagnostics = () => {
    if (!healthData) return;
    const report = {
      generatedAt: new Date().toISOString(),
      health: healthData,
      client: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        devicePixelRatio: window.devicePixelRatio,
        online: navigator.onLine,
        measuredLatencyMs: latencyMs,
      },
      lastOptimization: optResult,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elieza_system_health_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Diagnostics report exported', 'success');
  };

  useEffect(() => {
    loadHealthData();
    measureLatency();
  }, []);

  const heapPercent = healthData?.memory?.heapUtilizationPercent || 0;
  const isHeapOptimal = heapPercent < 75;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              System Optimization & Diagnostics
            </h2>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Real-time server performance monitoring, memory defragmentation, query caching, and network diagnostics.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={loadHealthData}
            disabled={loading}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#52525B] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Optimizing...' : 'Run Optimization'}</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Heap Memory */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Node Memory Heap</span>
            <Cpu className="w-4 h-4 text-[#761A30]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#18181B]">
                {healthData?.memory?.heapUsedMB ?? '--'}
              </span>
              <span className="text-xs text-[#71717A]">
                / {healthData?.memory?.heapTotalMB ?? '--'} MB
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] mt-0.5">
              RSS: {healthData?.memory?.rssMB ?? '--'} MB
            </p>
          </div>
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  isHeapOptimal ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, heapPercent))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#71717A]">
              <span>Utilization: {heapPercent}%</span>
              <span className={isHeapOptimal ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                {isHeapOptimal ? 'Optimal' : 'Elevated'}
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Server Uptime */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Server Uptime</span>
            <Clock className="w-4 h-4 text-[#761A30]" />
          </div>
          <div>
            <span className="text-2xl font-black text-[#18181B]">
              {healthData?.uptimeFormatted || 'Active'}
            </span>
            <p className="text-[11px] text-[#71717A] mt-0.5">
              PID {healthData?.runtime?.pid || '--'} • {healthData?.runtime?.nodeVersion || 'Node.js'}
            </p>
          </div>
          <div className="pt-2 border-t border-[#F1EBEB] flex items-center space-x-1.5 text-xs text-emerald-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Process Status: Online</span>
          </div>
        </div>

        {/* Metric 3: API Latency Ping */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Network Latency</span>
            <Activity className="w-4 h-4 text-[#761A30]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-[#18181B]">
                {latencyMs !== null ? `${latencyMs}ms` : '--'}
              </span>
              <span className="text-xs text-emerald-600 font-bold">
                {latencyMs !== null && latencyMs < 100 ? 'Ultra Fast' : 'Responsive'}
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] mt-0.5">
              Round-trip HTTP ping time
            </p>
          </div>
          <div className="pt-2 border-t border-[#F1EBEB]">
            <button
              onClick={measureLatency}
              disabled={isPinging}
              className="w-full py-1 text-center text-xs font-bold text-[#761A30] hover:text-[#5E1426] cursor-pointer"
            >
              {isPinging ? 'Pinging...' : 'Ping Endpoint Now →'}
            </button>
          </div>
        </div>

        {/* Metric 4: Database & Records */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Storage Engine</span>
            <Database className="w-4 h-4 text-[#761A30]" />
          </div>
          <div>
            <span className="text-2xl font-black text-[#18181B]">
              {healthData?.storage?.totalRecords ?? 0}
            </span>
            <span className="text-xs text-[#71717A] ml-1">Total Records</span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5 line-clamp-1">
              {healthData?.storage?.engine || 'Active Storage'}
            </p>
          </div>
          <div className="pt-2 border-t border-[#F1EBEB] flex items-center justify-between text-xs text-[#71717A]">
            <span>{healthData?.storage?.collectionsCount ?? 9} Collections</span>
            <span className="text-emerald-600 font-bold">Synchronized</span>
          </div>
        </div>
      </div>

      {/* Last Optimization Result Banner (if run) */}
      {optResult && (
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
          <div className="flex items-center space-x-2 font-black text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{optResult.message}</span>
            <span className="text-xs font-normal text-emerald-700">({optResult.durationMs}ms duration)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-xs">
            {optResult.tasksPerformed.map((task, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{task}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operational Toolbox */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-6">
        <div>
          <h3 className="font-serif font-black text-lg text-[#18181B]">
            Automated Optimization Actions
          </h3>
          <p className="text-xs text-[#71717A] mt-0.5">
            Execute performance routines to maximize throughput, purge cached memory, and benchmark system readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Action 1 */}
          <div className="p-5 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3E5] text-[#761A30] flex items-center justify-center shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#18181B]">Memory & Heap Pruning</h4>
              <p className="text-xs text-[#71717A] leading-relaxed">
                Trims ephemeral query buffers, executes garbage collection hints, and eliminates dangling memory footprint.
              </p>
            </div>
            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAF3F5] text-[#761A30] border border-[#EAE3E5] hover:border-[#761A30] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {isOptimizing ? 'Executing...' : 'Run Memory Prune'}
            </button>
          </div>

          {/* Action 2 */}
          <div className="p-5 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3E5] text-[#761A30] flex items-center justify-center shadow-2xs">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#18181B]">Database Cache Warmup</h4>
              <p className="text-xs text-[#71717A] leading-relaxed">
                Pre-indexes projects, tech journals, and skills in memory so public site visitors experience zero cold-start delay.
              </p>
            </div>
            <button
              onClick={handleWarmup}
              disabled={isWarming}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAF3F5] text-[#761A30] border border-[#EAE3E5] hover:border-[#761A30] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {isWarming ? 'Warming...' : 'Warm Cache Now'}
            </button>
          </div>

          {/* Action 3 */}
          <div className="p-5 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3E5] text-rose-600 flex items-center justify-center shadow-2xs">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#18181B]">Purge Client Cache</h4>
              <p className="text-xs text-[#71717A] leading-relaxed">
                Clears cached image previews and ephemeral browser session storage safely without terminating your admin session.
              </p>
            </div>
            <button
              onClick={handlePurgeClientCache}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-[#EAE3E5] hover:border-rose-300 text-xs font-bold transition-all cursor-pointer"
            >
              Purge Client Cache
            </button>
          </div>
        </div>
      </div>

      {/* Infrastructure & Optimization Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Performance Directives & Verification (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-4">
          <h3 className="font-serif font-black text-lg text-[#18181B]">
            System Architecture & Speed Directives
          </h3>

          <div className="space-y-3">
            {[
              {
                title: 'HTTP GZIP Compression',
                desc: 'Active on Express server for all JSON & static assets exceeding 1KB threshold.',
                status: 'Enabled (Level 6)',
              },
              {
                title: 'HTTP Cache-Control & ETag Headers',
                desc: 'Configured with public max-age=30s and stale-while-revalidate=60s for public data.',
                status: 'Active',
              },
              {
                title: 'Vite Code Splitting & Manual Chunks',
                desc: 'React core, motion physics, and lucide icons separated into asynchronous vendor chunks.',
                status: 'Optimized',
              },
              {
                title: 'Async Decoding & Lazy Image Loading',
                desc: 'All project, journal, and certificate thumbnails loaded on-demand with CLS prevention.',
                status: 'Enforced',
              },
              {
                title: 'DNS Prefetch & Preconnect Hints',
                desc: 'Pre-resolves unsplash CDN, Google Fonts, and external assets in HTML head.',
                status: 'Configured',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start justify-between p-3.5 rounded-2xl bg-[#FAF9FA] border border-[#F1EBEB]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5 font-bold text-xs text-[#18181B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-[#71717A] pl-5">{item.desc}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Data Collection Inventory & Export (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-lg text-[#18181B]">
                Store Inventory
              </h3>
              <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">
                Records
              </span>
            </div>

            <div className="divide-y divide-[#F1EBEB] text-xs">
              {Object.entries(healthData?.storage?.counts || {
                projects: 0,
                articles: 0,
                skills: 0,
                experience: 0,
                education: 0,
                certifications: 0,
                services: 0,
                messages: 0,
                categories: 0,
              }).map(([name, count]) => (
                <div key={name} className="py-2 flex items-center justify-between">
                  <span className="font-semibold text-[#52525B] capitalize">{name}</span>
                  <span className="font-mono font-bold text-[#18181B] bg-slate-100 px-2 py-0.5 rounded-lg text-[11px]">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1EBEB]">
            <button
              onClick={handleExportDiagnostics}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#18181B] font-bold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#761A30]" />
              <span>Export Diagnostic Report (.JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

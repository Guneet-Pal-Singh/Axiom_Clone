'use client';

import { Suspense, useState } from 'react';
import NavBar from '@/components/navigation/NavBar';
import PulseHeader from '@/components/layout/PulseHeader';
import TokenColumn from '@/components/tokens/TokenColumn';
import StatusBar from '@/components/layout/StatusBar';
import MobileTabBar from '@/components/navigation/MobileTabBar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-8">
      <div className="max-w-md rounded-lg border border-red-500 bg-red-500/10 p-6 text-center">
        <h2 className="mb-2 text-lg font-semibold text-red-500">Something went wrong</h2>
        <p className="text-sm text-gray-400">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500" />
        <p className="text-sm text-gray-400">Loading tokens...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'newPairs' | 'finalStretch' | 'migrated'>('newPairs');
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TooltipProvider>
        <></>
        <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
          <NavBar />
          
          <PulseHeader />
          
          <main className="flex-1 flex flex-col h-[calc(100vh-8.5rem)]">
            <Suspense fallback={<LoadingFallback />}>
              <div className="block h-full lg:hidden">
                <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="h-[calc(100vh-12rem)] overflow-y-auto">
                  {activeTab === 'newPairs' && (
                    <TokenColumn type="newPairs" title="New Pairs" />
                  )}
                  {activeTab === 'finalStretch' && (
                    <TokenColumn type="finalStretch" title="Final Stretch" />
                  )}
                  {activeTab === 'migrated' && (
                    <TokenColumn type="migrated" title="Migrated" />
                  )}
                </div>
              </div>
              <div className="hidden w-full h-full lg:grid lg:grid-cols-3 lg:divide-x lg:divide-gray-800">
                <TokenColumn type="newPairs" title="New Pairs" />
                <TokenColumn type="finalStretch" title="Final Stretch" />
                <TokenColumn type="migrated" title="Migrated" />
              </div>
            </Suspense>
          </main>
          
          <StatusBar />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

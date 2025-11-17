import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/layouts/RootLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const VehicleListPage = lazy(() => import('@/pages/VehicleList'));
const VehicleDetailPage = lazy(() => import('@/pages/VehicleDetail'));
const VehicleContactPage = lazy(() => import('@/pages/VehicleContact'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @router appRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleListPage />
          </Suspense>
        ),
      },
      {
        path: 'vehicles',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleListPage />
          </Suspense>
        ),
      },
      {
        path: 'vehicles/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'vehicles/:id/contact',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleContactPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

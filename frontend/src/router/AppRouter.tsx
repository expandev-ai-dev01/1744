import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

/**
 * @component AppRouter
 * @summary Router provider component that wraps the entire application
 * with routing capabilities
 * @domain core
 * @type router-provider
 * @category navigation
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

import type { HomePageProps } from './types';

/**
 * @page HomePage
 * @summary Home page displaying welcome message
 * @domain core
 * @type page-component
 * @category public
 */
export const HomePage = (props: HomePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Carros</h1>
      <p className="text-lg text-gray-600">Bem-vindo ao catálogo de veículos</p>
    </div>
  );
};

export default HomePage;

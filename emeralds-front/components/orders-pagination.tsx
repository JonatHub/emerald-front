import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function OrdersPagination({ 
  currentPage, 
  totalPages, 
  totalElements, 
  size, 
  onPageChange, 
  loading = false 
}: OrdersPaginationProps) {
  if (totalPages <= 1) return null;

  const startElement = currentPage * size + 1;
  const endElement = Math.min((currentPage + 1) * size, totalElements);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow border">
      {/* Info de elementos */}
      <div className="text-sm text-gray-600">
        Mostrando {startElement} a {endElement} de {totalElements} órdenes
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || loading}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
            // Mostrar solo algunas páginas para no saturar la UI
            if (
              page === 0 || // Primera página
              page === totalPages - 1 || // Última página
              (page >= currentPage - 1 && page <= currentPage + 1) // Páginas alrededor de la actual
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className="w-10 h-10"
                >
                  {page + 1}
                </Button>
              );
            } else if (
              page === currentPage - 2 || 
              page === currentPage + 2
            ) {
              return (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || loading}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, Search } from 'lucide-react';

interface CatalogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  sortBy: 'name' | 'price' | 'caratWeight';
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: 'name' | 'price' | 'caratWeight', order: 'asc' | 'desc') => void;
  totalProducts: number;
  filteredProducts: number;
}

export default function CatalogFilters({
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  sortOrder,
  onSortChange,
  totalProducts,
  filteredProducts,
}: CatalogFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">
            Buscar
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Buscar esmeraldas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <Label htmlFor="minPrice" className="text-sm font-medium text-gray-700">
            Precio mínimo (USD)
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="mt-1"
          />
        </div>

        {/* Max Price */}
        <div>
          <Label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
            Precio máximo (USD)
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="50000"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="mt-1"
          />
        </div>

        {/* Sort */}
        <div>
          <Label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Ordenar por
          </Label>
          <select
            id="sort"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              onSortChange(field as 'name' | 'price' | 'caratWeight', order as 'asc' | 'desc');
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
            <option value="caratWeight-asc">Peso (Menor a Mayor)</option>
            <option value="caratWeight-desc">Peso (Mayor a Menor)</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Mostrando {filteredProducts} de {totalProducts} productos
      </div>
    </div>
  );
} 
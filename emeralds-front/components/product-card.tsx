import { ProductType } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  
  const isInCart = items.some(item => item.id === product.id);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrls[0] || '/placeholder-emerald.jpg'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-emerald.jpg';
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </CardTitle>
        
        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex justify-between">
            <span>Precio:</span>
            <span className="font-semibold text-green-600">{formatPrice(product.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>Peso:</span>
            <span>{product.caratWeight} ct</span>
          </div>
          <div className="flex justify-between">
            <span>Origen:</span>
            <span className="text-right">{product.origin}</span>
          </div>
          <div className="flex justify-between">
            <span>Color:</span>
            <span>{product.color}</span>
          </div>
          <div className="flex justify-between">
            <span>Claridad:</span>
            <span>{product.clarity}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => window.location.href = `/product/${product.id}`}
          >
            Ver Detalles
          </Button>
                            <Button 
                    variant={isInCart ? "default" : "outline"}
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    title={isInCart ? "Ya está en el carrito" : "Agregar al carrito"}
                  >
                    {isInCart ? "✓" : "+"}
                  </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
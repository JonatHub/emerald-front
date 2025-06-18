import { ProductType } from "@/types/product";

export type InfoProductProps = {
  product: ProductType;
}

const infoProduct = (props: InfoProductProps) => {
  const { product } = props;
  return (
    <div>
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.name}</h1>
        <div className="flex items-center justify-center gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white w-fit">
            {product.origin}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white w-fit">
            {product.certification}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Descripción:</span>
        <p>{product.description}</p>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Peso (Quilates):</span>
        <span> {product.caratWeight} ct</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Color:</span>
        <span> {product.color}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Claridad:</span>
        <span> {product.clarity}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Stock disponible:</span>
        <span> {product.stockQuantity}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Dimensiones:</span>
        <span> {product.lengthMm}mm x {product.widthMm}mm</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Precio:</span>
        <span> ${product.price}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Imágenes:</span>
        <div className="flex gap-2 mt-1">
          {product.imageUrls.map((url, idx) => (
            <img key={idx} src={url} alt={product.name} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      </div>
      <div className="mb-2 text-xs text-gray-500">
        <span>Creado: {new Date(product.createdAt).toLocaleDateString()}</span>
        <span className="ml-4">Actualizado: {new Date(product.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default infoProduct;
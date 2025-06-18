import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  caratWeight: number;
  origin: string;
  certification: string;
  clarity: string;
  color: string;
  imageUrls: string[]
  stockQuantity: number;
  lengthMm: number;
  widthMm: number;
  createdAt: string;
  updatedAt: string;
}



const CarouselProduct = (props: CarouselProductProps) => {
  console.log("Carousel props:", props);
  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {props.imageUrls.map((url, index) => (
            <CarouselItem key={index} className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <img
                  src={url}
                  alt={`${props.name} - ${index + 1}`}
                  className="h-[400px] w-[400px] object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
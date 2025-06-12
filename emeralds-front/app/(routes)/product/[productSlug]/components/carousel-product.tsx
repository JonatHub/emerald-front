import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
  imageUrl: string;
  stockQuantity: number;
  lengthMm: number;
  widthMm: number;
  createdAt: string;
  updatedAt: string;
}


const CarouselProduct =(props:CarouselProductProps) => {
  return (
    <div className="sm:px-16">
        <Carousel>
            <CarouselContent>
                <CarouselItem key={props.id} className="flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <img
                            src={props.imageUrl}
                            alt={props.name}
                            className="h-[400px] w-[400px] object-cover rounded-lg"
                        />
                    </div>
                </CarouselItem>


            </CarouselContent>

        </Carousel>
    </div>
  )
}

export default CarouselProduct;
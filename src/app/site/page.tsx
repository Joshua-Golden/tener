import Image from "next/image";

import { pricingCards } from "@/lib/constants";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full md:pt-36 px-5 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <p className="text-center">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">Tener</h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={`/assets/preview.png`}
            alt="Banner Image"

            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
          
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 px-5 md:!mt-20 mt-[-40px]">
        <h2 className="text-4xl text-center"> Choose what fits you right! </h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If {" you're"} not ready to commit you can get started for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map(( card, index) => (
            <Card key={card.title} className={clsx('w-[300px] md:min-h-[250px] flex flex-col justify-between', {"border-2 border-primary": card.title === 'Unlimited Saas',})}>
              <CardHeader>
                <CardTitle className={clsx('', {'text-muted-foreground': card.title !== 'Unlimited Saas'})}>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <CheckIcon />
                      <p className="text-muted-foreground">{feature}</p>
                      
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={clsx('w-full text-center bg-primary p-2 rounded-md', {'!bg-muted-foreground': card.title !== 'Unlimited Saas',})}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      </>
  );
}

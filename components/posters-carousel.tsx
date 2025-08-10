"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { posters } from "@/data/posters";

export const PostersCarousel = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const onPreview = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  return (
    <section id="posters" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Poster Showcase
            </h2>
            <p className="text-white/60 mt-2">
              Designed in Photoshop/Illustrator. Hover to preview in high
              quality.
            </p>
          </div>
        </div>

        <Carousel
          className="relative"
          opts={{ align: "center", loop: true, skipSnaps: false }}
          setApi={(embla) => setApi(embla)}
        >
          <CarouselContent>
            {posters.map((p, idx) => {
              const length = posters.length;
              const rawDiff = Math.abs(idx - selectedIndex);
              const distance = Math.min(rawDiff, length - rawDiff);
              const isCenter = distance === 0;
              const isNear = distance === 1;
              const scale = isCenter
                ? "scale-100"
                : isNear
                ? "scale-95"
                : "scale-90";
              const blur = isCenter
                ? "blur-0"
                : isNear
                ? "blur-[1.5px]"
                : "blur-[3px]";
              const opacity = isCenter
                ? "opacity-100"
                : isNear
                ? "opacity-80"
                : "opacity-60";
              const translateY = isCenter
                ? "translate-y-0"
                : isNear
                ? "translate-y-1"
                : "translate-y-2";

              return (
                <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 ${scale} ${opacity} ${translateY}`}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={p.thumb}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 30vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${blur}`}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button
                          size="sm"
                          className="pointer-events-auto rounded-full bg-orange-500 hover:bg-orange-400"
                          onClick={() => onPreview(idx)}
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{p.title}</h3>
                        {p.year && (
                          <span className="text-xs text-white/60">
                            {p.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="border-white/20 bg-black/50 text-white hover:bg-black/70" />
          <CarouselNext className="border-white/20 bg-black/50 text-white hover:bg-black/70" />
        </Carousel>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl bg-black/90">
            <DialogHeader>
              <DialogTitle>
                {activeIndex != null ? posters[activeIndex].title : ""}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full">
              {activeIndex != null && (
                <div className="relative mx-auto aspect-[3/4] w-full max-w-3xl">
                  <Image
                    src={posters[activeIndex].full}
                    alt={posters[activeIndex].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

// Sync selected center index with Embla API
export default function PostersCarouselWithSync() {
  return <PostersCarousel />;
}

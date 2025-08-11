"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { appConfig } from "@/config/app.config";
import { posterImages } from "@/data/posters";
import { DotBackground } from "@/components/dot-background";
import { SiAdobephotoshop } from "react-icons/si";
import { RiImageCircleAiFill } from "react-icons/ri";

type Slide = {
  id: string;
  title: string;
  imagePath: string;
  tools: string[];
};

// Image cache utility
class ImageCache {
  private static instance: ImageCache;
  private cache = new Map<string, boolean>();
  private preloadPromises = new Map<string, Promise<void>>();

  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  preloadImage(src: string): Promise<void> {
    if (this.cache.has(src)) {
      return Promise.resolve();
    }

    if (this.preloadPromises.has(src)) {
      return this.preloadPromises.get(src)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        this.cache.set(src, true);
        this.preloadPromises.delete(src);
        resolve();
      };
      img.onerror = () => {
        this.preloadPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });

    this.preloadPromises.set(src, promise);
    return promise;
  }

  preloadImages(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map((src) => this.preloadImage(src)));
  }

  isImageCached(src: string): boolean {
    return this.cache.has(src);
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export const PostersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const slides: Slide[] = useMemo(
    () =>
      posterImages.map((p) => ({
        id: p.id,
        title: p.title,
        imagePath: `${appConfig.CLOUDINARY_URL}${p.name}`,
        tools: p.tools,
      })),
    []
  );

  const imageCache = useMemo(() => ImageCache.getInstance(), []);

  // Preload all images on component mount
  useEffect(() => {
    const preloadAllImages = async () => {
      const imageSources = slides.map((slide) => slide.imagePath);
      let loadedCount = 0;

      // Load images in batches to avoid overwhelming the browser
      const batchSize = 3;
      for (let i = 0; i < imageSources.length; i += batchSize) {
        const batch = imageSources.slice(i, i + batchSize);

        await Promise.allSettled(
          batch.map(async (src) => {
            try {
              await imageCache.preloadImage(src);
              loadedCount++;
              setLoadingProgress((loadedCount / imageSources.length) * 100);
            } catch (error) {
              console.warn(`Failed to preload image: ${src}`, error);
              loadedCount++; // Still count as "processed"
              setLoadingProgress((loadedCount / imageSources.length) * 100);
            }
          })
        );

        // Small delay between batches to prevent UI blocking
        if (i + batchSize < imageSources.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      setImagesLoaded(true);
    };

    preloadAllImages();
  }, [slides, imageCache]);

  // Preload adjacent images when current index changes
  useEffect(() => {
    const preloadAdjacentImages = () => {
      const totalSlides = slides.length;
      const adjacentIndices = [
        (currentIndex - 1 + totalSlides) % totalSlides,
        (currentIndex + 1) % totalSlides,
      ];

      adjacentIndices.forEach((index) => {
        const src = slides[index]?.imagePath;
        if (src && !imageCache.isImageCached(src)) {
          imageCache
            .preloadImage(src)
            .catch((err) =>
              console.warn(`Failed to preload adjacent image: ${src}`, err)
            );
        }
      });
    };

    if (slides.length > 0) {
      preloadAdjacentImages();
    }
  }, [currentIndex, slides, imageCache]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, imagesLoaded]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    const id = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(id);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    const id = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(id);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    const id = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(id);
  }, [slides.length]);

  const onPreview = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  }, []);

  // Loading screen while images are being cached
  if (!imagesLoaded) {
    return (
      <section
        id="posters"
        className="relative py-20 overflow-hidden min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-gray-900 to-black" />

        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
              <div
                className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"
                style={{
                  transform: `rotate(${(loadingProgress / 100) * 360}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              ></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Loading Gallery
            </h3>

            <p className="text-white/60 mb-4">
              Caching images for smooth experience...
            </p>

            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="mt-2 text-sm text-white/50 font-mono">
              {Math.round(loadingProgress)}% ({imageCache.getCacheSize()}/
              {slides.length})
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posters" className="relative py-20 overflow-hidden">
      {/* Dynamic blurred poster background */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={slides[currentIndex]?.imagePath}
          alt={slides[currentIndex]?.title || "Poster background"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 blur-2xl scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-orange-300 to-white bg-clip-text text-transparent p-2">
            Design Showcase
          </h2>
          <p className="text-white/70 mt-3 text-lg">
            Modern poster collection with smooth animations
          </p>
        </div>

        {/* Main display with glassmorphism and DotBackground */}
        <div className="relative h-[520px] md:h-[640px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_10px_60px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />

          {/* DotBackground wrapper */}
          <DotBackground>
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-out h-full w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((poster, index) => (
                <div key={poster.id} className="min-w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 md:px-10">
                    {/* Poster image */}
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -inset-4 rounded-2xl bg-black/40 blur-2xl" />
                      <div className="relative h-[22rem] w-[16rem] md:h-[28rem] md:w-[20rem]">
                        <Image
                          src={poster.imagePath}
                          alt={poster.title}
                          fill
                          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"
                          className="rounded-xl border border-white/10 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                          priority={Math.abs(index - currentIndex) <= 1}
                          quality={90}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Poster info */}
                    <div className="flex-1 max-w-2xl text-center md:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        <span className="bg-gradient-to-r from-white via-white to-orange-300 bg-clip-text text-transparent">
                          {poster.title}
                        </span>
                      </h3>
                      <div className="text-white/70 text-base md:text-lg mb-6 leading-relaxed font-light">
                        {poster.tools.length > 0 ? (
                          <span className="flex flex-col gap-2">
                            Tools:{" "}
                            <span className="flex gap-2">
                              {poster.tools.includes("Photoshop") && (
                                <SiAdobephotoshop className="text-2xl text-[#31A8FF]" />
                              )}
                              {poster.tools.includes("AI") && (
                                <RiImageCircleAiFill className="text-2xl text-white" />
                              )}
                            </span>
                          </span>
                        ) : (
                          <span>Creative poster artwork</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="w-12 h-0.5 bg-white/60 rounded-full" />
                        <span className="text-sm text-white/60 font-mono">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(slides.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-6 flex justify-center md:justify-start">
                        <Button
                          onClick={() => onPreview(index)}
                          className="rounded-full bg-orange-500 hover:bg-orange-400 text-white"
                          size="sm"
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DotBackground>

          {/* Controls */}
          <button
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-black/60 hover:border-white/30 transition-all duration-300 group z-20"
          >
            <ChevronLeft className="w-6 h-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-black/60 hover:border-white/30 transition-all duration-300 group z-20"
          >
            <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((s, index) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-4 justify-center">
            {slides.map((poster, index) => (
              <button
                key={poster.id}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden transition-all duration-300 border ${
                  index === currentIndex
                    ? "border-white/80 scale-110 opacity-100"
                    : "border-white/20 opacity-50 hover:opacity-80 hover:border-white/40"
                }`}
                aria-label={`Select slide ${index + 1}`}
              >
                <Image
                  src={poster.imagePath}
                  alt={poster.title}
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 8vw"
                  className="object-cover"
                  quality={75}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-white/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60 font-mono">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isAutoPlaying ? "bg-orange-400 animate-pulse" : "bg-white/40"
            }`}
          />
          {isAutoPlaying ? "Auto-playing" : "Paused"}
        </div>

        {/* Preview dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-black/90 border border-white/10 p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-xl mb-4">
                {previewIndex != null ? slides[previewIndex].title : ""}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full flex items-center justify-center">
              {previewIndex != null && (
                <div className="relative w-full max-w-2xl">
                  <div className="relative w-full aspect-[3/4] max-h-[70vh]">
                    <Image
                      src={slides[previewIndex].imagePath}
                      alt={slides[previewIndex].title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 90vw, 60vw"
                      priority
                      quality={95}
                    />
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default function PostersCarouselWithSync() {
  return <PostersCarousel />;
}

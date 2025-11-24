import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Frame, BookOpen, Calendar, Image, Sparkles, X, Upload, Eye, Maximize2, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as THREE from 'three';

// Simple scroll reveal hook
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

// Placeholder images
const frameClassic = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%238B4513' width='400' height='300'/%3E%3Crect fill='%23D2691E' x='20' y='20' width='360' height='260'/%3E%3C/svg%3E";
const frameModern = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Crect fill='%23555' x='15' y='15' width='370' height='270'/%3E%3C/svg%3E";
const albumPortrait = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%234A0E0E' width='300' height='400'/%3E%3Crect fill='%236B1616' x='30' y='30' width='240' height='340'/%3E%3C/svg%3E";
const albumLandscape = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%232C1810' width='400' height='300'/%3E%3Crect fill='%234A2C1A' x='30' y='30' width='340' height='240'/%3E%3C/svg%3E";
const calendarImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23fff' width='400' height='300'/%3E%3Crect fill='%23F59E0B' width='400' height='180'/%3E%3Crect fill='%23fff' y='180' width='400' height='120'/%3E%3C/svg%3E";
const magazineImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%23fff' width='300' height='400'/%3E%3Crect fill='%23D97706' width='300' height='280'/%3E%3C/svg%3E";

interface PrintType {
  id: string;
  name: string;
  icon: any;
  description: string;
  variants?: { name: string; image: string }[];
  features?: string[];
}

const printTypes: PrintType[] = [
  {
    id: "frames",
    name: "Premium Frames",
    icon: Frame,
    description: "Beautiful custom frames in various styles",
    features: ["Museum-quality materials", "Custom sizing available", "UV protection glass", "Professional mounting"],
    variants: [
      { name: "Classic Wooden Frame", image: frameClassic },
      { name: "Modern Metal Frame", image: frameModern },
      { name: "Vintage Gold Frame", image: frameClassic },
      { name: "Minimalist Black Frame", image: frameModern },
      { name: "Rustic Oak Frame", image: frameClassic },
      { name: "Contemporary White Frame", image: frameModern }
    ]
  },
  {
    id: "portrait-album",
    name: "Portrait Albums",
    icon: BookOpen,
    description: "Elegant portrait orientation photo albums",
    features: ["Leather bound covers", "Archival quality paper", "Customizable layouts", "Premium finish"],
    variants: [
      { name: "Leather Bound Portrait", image: albumPortrait },
      { name: "Classic Portrait Album", image: albumPortrait },
      { name: "Premium Portrait Collection", image: albumPortrait },
      { name: "Modern Portrait Book", image: albumPortrait }
    ]
  },
  {
    id: "landscape-album",
    name: "Landscape Albums",
    icon: BookOpen,
    description: "Stunning landscape orientation albums",
    features: ["Wide format pages", "Panoramic spreads", "Hardcover binding", "Photo-safe materials"],
    variants: [
      { name: "Panoramic Landscape Album", image: albumLandscape },
      { name: "Wide Format Collection", image: albumLandscape },
      { name: "Premium Landscape Book", image: albumLandscape },
      { name: "Modern Landscape Edition", image: albumLandscape }
    ]
  },
  {
    id: "calendar",
    name: "Custom Calendars",
    icon: Calendar,
    description: "Personalized calendars with your memories",
    features: ["12-month layouts", "Custom start date", "High-quality printing", "Spiral or saddle binding"],
    variants: [
      { name: "Wall Calendar 2024", image: calendarImg },
      { name: "Desk Calendar", image: calendarImg },
      { name: "Premium Wall Calendar", image: calendarImg },
      { name: "Photo Calendar Collection", image: calendarImg }
    ]
  },
  {
    id: "magazine",
    name: "Photo Magazines",
    icon: Image,
    description: "Professional magazine-style photo books",
    features: ["Glossy or matte finish", "Editorial layouts", "Custom page count", "Professional binding"],
    variants: [
      { name: "Glossy Magazine Format", image: magazineImg },
      { name: "Matte Finish Magazine", image: magazineImg },
      { name: "Premium Photo Journal", image: magazineImg },
      { name: "Modern Photo Magazine", image: magazineImg }
    ]
  },
  {
    id: "canvas",
    name: "Canvas Prints",
    icon: Sparkles,
    description: "Museum-quality canvas prints",
    features: ["Gallery-wrap finish", "Fade-resistant inks", "Ready to hang", "Multiple sizes"],
    variants: [
      { name: "Stretched Canvas", image: frameModern },
      { name: "Framed Canvas Print", image: frameClassic },
      { name: "Gallery Wrap Canvas", image: frameModern },
      { name: "Premium Canvas Collection", image: frameClassic }
    ]
  }
];

// 3D Viewer Component
const ThreeDViewer = ({ productType, userImage }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);

    const productGroup = new THREE.Group();
    frameRef.current = productGroup;

    if (productType === 'frame') {
      createFrame(productGroup, userImage);
    } else if (productType === 'magazine') {
      createMagazine(productGroup, userImage);
    } else if (productType === 'calendar') {
      createCalendar(productGroup, userImage);
    } else if (productType === 'album') {
      createAlbum(productGroup, userImage);
    }

    scene.add(productGroup);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (frameRef.current) {
        frameRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !frameRef.current) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      frameRef.current.rotation.y += deltaX * 0.01;
      frameRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [productType, userImage]);

  const createFrame = (group, userImage) => {
    const frameGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c1810,
      roughness: 0.7,
      metalness: 0.3
    });
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameMesh.castShadow = true;
    frameMesh.receiveShadow = true;
    group.add(frameMesh);

    const innerGeometry = new THREE.BoxGeometry(2.6, 3.6, 0.15);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5dc,
      roughness: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    innerMesh.position.z = 0.1;
    group.add(innerMesh);

    const photoGeometry = new THREE.PlaneGeometry(2.2, 3.2);
    let photoMaterial;

    if (userImage) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(userImage);
      photoMaterial = new THREE.MeshStandardMaterial({ map: texture });
    } else {
      photoMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.5
      });
    }

    const photoMesh = new THREE.Mesh(photoGeometry, photoMaterial);
    photoMesh.position.z = 0.16;
    group.add(photoMesh);

    const glassGeometry = new THREE.PlaneGeometry(2.5, 3.5);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.z = 0.2;
    group.add(glassMesh);
  };

  const createMagazine = (group, userImage) => {
    const coverGeometry = new THREE.BoxGeometry(2.5, 3.5, 0.05);
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1
    });
    const coverMesh = new THREE.Mesh(coverGeometry, coverMaterial);
    coverMesh.castShadow = true;
    group.add(coverMesh);

    const imageGeometry = new THREE.PlaneGeometry(2.4, 2.8);
    let imageMaterial;

    if (userImage) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(userImage);
      imageMaterial = new THREE.MeshStandardMaterial({ map: texture });
    } else {
      imageMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.4
      });
    }

    const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.set(0, 0.35, 0.026);
    group.add(imageMesh);

    for (let i = 0; i < 10; i++) {
      const pageGeometry = new THREE.BoxGeometry(2.48, 3.48, 0.01);
      const pageMaterial = new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        roughness: 0.8
      });
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
      pageMesh.position.z = -0.026 - (i * 0.005);
      group.add(pageMesh);
    }

    const spineGeometry = new THREE.BoxGeometry(0.15, 3.5, 0.15);
    const spineMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6
    });
    const spineMesh = new THREE.Mesh(spineGeometry, spineMaterial);
    spineMesh.position.set(-1.325, 0, -0.025);
    group.add(spineMesh);
  };

  const createCalendar = (group, userImage) => {
    const boardGeometry = new THREE.BoxGeometry(3, 3.5, 0.1);
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5
    });
    const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
    boardMesh.castShadow = true;
    group.add(boardMesh);

    const photoGeometry = new THREE.PlaneGeometry(2.8, 2);
    let photoMaterial;

    if (userImage) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(userImage);
      photoMaterial = new THREE.MeshStandardMaterial({ map: texture });
    } else {
      photoMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.4
      });
    }

    const photoMesh = new THREE.Mesh(photoGeometry, photoMaterial);
    photoMesh.position.set(0, 0.7, 0.051);
    group.add(photoMesh);

    const monthBarGeometry = new THREE.PlaneGeometry(2.8, 0.3);
    const monthBarMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4
    });
    const monthBarMesh = new THREE.Mesh(monthBarGeometry, monthBarMaterial);
    monthBarMesh.position.set(0, -0.45, 0.051);
    group.add(monthBarMesh);

    const gridGeometry = new THREE.PlaneGeometry(2.8, 1);
    const gridMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.position.set(0, -1.2, 0.051);
    group.add(gridMesh);

    for (let i = 0; i < 12; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.08, 0.02, 16, 32);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.8,
        roughness: 0.2
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.set(-1.3 + (i * 0.24), 1.8, 0);
      ringMesh.rotation.y = Math.PI / 2;
      group.add(ringMesh);
    }
  };

  const createAlbum = (group, userImage) => {
    const coverGeometry = new THREE.BoxGeometry(3, 3.5, 0.15);
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x7f1d1d,
      roughness: 0.8,
      metalness: 0.1
    });
    const coverMesh = new THREE.Mesh(coverGeometry, coverMaterial);
    coverMesh.castShadow = true;
    group.add(coverMesh);

    const borderGeometry = new THREE.BoxGeometry(2.6, 3.1, 0.02);
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.7
    });
    const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
    borderMesh.position.z = 0.076;
    group.add(borderMesh);

    const photoGeometry = new THREE.PlaneGeometry(2, 2.5);
    let photoMaterial;

    if (userImage) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(userImage);
      photoMaterial = new THREE.MeshStandardMaterial({ map: texture });
    } else {
      photoMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.5
      });
    }

    const photoMesh = new THREE.Mesh(photoGeometry, photoMaterial);
    photoMesh.position.set(0, 0.3, 0.087);
    group.add(photoMesh);

    const titleGeometry = new THREE.BoxGeometry(2, 0.4, 0.03);
    const titleMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.6
    });
    const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.position.set(0, -1.2, 0.09);
    group.add(titleMesh);

    for (let i = 0; i < 15; i++) {
      const pageGeometry = new THREE.BoxGeometry(2.95, 3.45, 0.01);
      const pageMaterial = new THREE.MeshStandardMaterial({
        color: 0xfefce8,
        roughness: 0.9
      });
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
      pageMesh.position.z = -0.076 - (i * 0.003);
      group.add(pageMesh);
    }

    const spineGeometry = new THREE.BoxGeometry(0.2, 3.5, 0.2);
    const spineMaterial = new THREE.MeshStandardMaterial({
      color: 0x7f1d1d,
      roughness: 0.8
    });
    const spineMesh = new THREE.Mesh(spineGeometry, spineMaterial);
    spineMesh.position.set(-1.6, 0, -0.075);
    group.add(spineMesh);
  };

  return (
    <div ref={containerRef} className="w-full h-[500px] rounded-xl bg-gradient-to-br from-primary/5 to-accent/5" />
  );
};

const Prints = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedPrint, setSelectedPrint] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [show3DPopup, setShow3DPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("frame");
  const [selected3DProduct, setSelected3DProduct] = useState(null);
  const fileInputRef = useRef(null);
  const popupFileInputRef = useRef(null);

  const handleOrder = (printType, variant) => {
    const message = variant
      ? `Hi! I'd like to order ${variant} from ${printType}`
      : `Hi! I'd like to know more about ${printType}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
    toast.success("Redirecting to WhatsApp...");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handle3DView = (variant) => {
    setSelected3DProduct(variant);
    setShow3DViewer(true);
  };

  return (
    <section id="prints" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        {/* Banner */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl relative group">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px', borderRadius: '1rem' }}>
              <div className="w-full h-full bg-background rounded-2xl" />
            </div>

            <CardContent className="p-0 relative z-10">
              <div className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-6 flex-1">
                    {/* Icon with glow effect */}
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary shadow-lg group-hover:scale-110 transition-transform duration-500 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500" />
                      <Sparkles className="w-10 h-10 relative z-10" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Try Our New 3D Preview!
                        </h3>
                        <Badge variant="secondary" className="animate-bounce">New</Badge>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                        Upload your photo and see how it looks in realistic 3D. Rotate, zoom, and explore your memories in stunning detail before ordering.
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShow3DPopup(true)}
                      className="try-now-btn group/btn relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                        <Eye className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-300" />
                        Try Now
                        <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-4 px-4 py-2 text-sm">Print Services</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Print Your Memories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your digital moments into timeless physical treasures
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {printTypes.map((print, index) => {
                const Icon = print.icon;
                return (
                  <CarouselItem key={print.id} className="pl-2 md:pl-4 basis-3/4 md:basis-1/2 lg:basis-1/3">
                    <Card
                      className={`group hover-lift border overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        transitionDelay: `${index * 0.05}s`
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden rounded-t-xl">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                          <div className="relative">
                            <div className="mb-4 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                              <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {print.name}
                            </h3>
                          </div>
                        </div>

                        <div className="p-6">
                          <p className="text-muted-foreground mb-4">{print.description}</p>

                          <ul className="space-y-2 mb-6">
                            {print.features?.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1"
                              onClick={() => setSelectedPrint(print)}
                            >
                              View Options
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleOrder(print.name, null)}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-6 md:-left-10" />
            <CarouselNext className="-right-6 md:-right-10" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border-0 shadow-lg inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Custom Print Solutions</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Can't find what you're looking for? We offer custom printing solutions tailored to your needs.
              </p>
              <Button
                size="lg"
                className="group"
                onClick={() => handleOrder("Custom Print Solutions", null)}
              >
                Contact Us for Custom Orders
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Variants Dialog */}
      <Dialog open={!!selectedPrint} onOpenChange={() => setSelectedPrint(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <div className="p-6 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl -m-6 mb-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                  {selectedPrint && <selectedPrint.icon className="w-8 h-8" />}
                </div>
                <DialogTitle className="text-3xl font-bold mb-2">{selectedPrint?.name}</DialogTitle>
                <DialogDescription className="text-white/90">
                  Browse through our {selectedPrint?.name.toLowerCase()} options and select your favorite
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-6">
            {selectedPrint?.variants?.map((variant, index) => (
              <div
                key={variant.name}
                className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="border-0 shadow-lg overflow-hidden hover-lift">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold text-lg mb-2">{variant.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Premium quality {variant.name.toLowerCase()} with professional finishing
                      </p>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handle3DView(variant)}
                          className="flex-1"
                          size="sm"
                        >
                          <Maximize2 className="w-4 h-4 mr-2" />
                          3D View
                        </Button>
                        <Button
                          onClick={() => handleOrder(selectedPrint.name, variant.name)}
                          variant="outline"
                          size="sm"
                        >
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 3D Viewer Dialog */}
      <Dialog open={show3DViewer} onOpenChange={setShow3DViewer}>
        <DialogContent className="max-w-5xl max-h-[90vh] rounded-xl">
          <DialogHeader>
            <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl -m-6 mb-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <button
                onClick={() => setShow3DViewer(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                  <Eye className="w-8 h-8" />
                </div>
                <DialogTitle className="text-3xl font-bold mb-2">
                  3D Product Viewer
                </DialogTitle>
                <DialogDescription className="text-white/90">
                  {selected3DProduct?.name} • Drag to rotate • Scroll to zoom
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            <ThreeDViewer
              productType={selectedProduct}
              userImage={previewImage}
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => setShow3DViewer(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  handleOrder(selected3DProduct?.name || selectedProduct, null);
                  setShow3DViewer(false);
                }}
                className="group"
              >
                Order This Product
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl rounded-xl">
          <DialogHeader>
            <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl -m-6 mb-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                  <Eye className="w-8 h-8" />
                </div>
                <DialogTitle className="text-3xl font-bold mb-2">Product Preview</DialogTitle>
                <DialogDescription className="text-white/90">
                  See how your photo looks in our {selectedProduct} product
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            <ThreeDViewer
              productType={selectedProduct}
              userImage={previewImage}
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  handleOrder(`${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)} Print`, null);
                  setShowPreview(false);
                }}
                className="group"
              >
                Order This Product
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New 3D Preview Popup Modal */}
      <Dialog open={show3DPopup} onOpenChange={setShow3DPopup}>
        <DialogContent className="max-w-6xl max-h-[95vh] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient-shift p-8 text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

            {/* Close button */}
            <button
              onClick={() => setShow3DPopup(false)}
              className="absolute top-4 right-4 p-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-90 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    3D Product Preview
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 animate-pulse">
                      Interactive
                    </Badge>
                  </h2>
                  <p className="text-white/90 text-lg">
                    Upload your image and visualize it in stunning 3D • Drag to rotate • Scroll to zoom
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-[calc(95vh-200px)] overflow-y-auto">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column: 3D Viewer (Takes up 7/12 columns) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <Card className="border-2 border-primary/30 overflow-hidden shadow-xl flex-1 min-h-[500px] relative">
                  <CardContent className="p-0 h-full">
                    <div className="absolute top-4 left-4 z-10">
                      <h3 className="text-2xl font-bold mb-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg inline-block">3D Preview</h3>
                      <p className="text-sm text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg inline-block mt-1">
                        Drag to rotate • Scroll to zoom
                      </p>
                    </div>
                    {previewImage && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="secondary" className="animate-pulse shadow-lg">
                          <Eye className="w-3 h-3 mr-1" />
                          Live Preview
                        </Badge>
                      </div>
                    )}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
                      <ThreeDViewer
                        productType={selectedProduct}
                        userImage={previewImage}
                      />
                      {!previewImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm pointer-events-none">
                          <div className="text-center p-8 bg-background/90 rounded-xl shadow-lg">
                            <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-bounce" />
                            <p className="text-lg font-semibold mb-2">Upload an image to preview</p>
                            <p className="text-sm text-muted-foreground">
                              Your photo will appear here in 3D
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Controls (Takes up 5/12 columns) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Image Upload Card */}
                <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                        <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Upload Your Photo</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          Choose an image to preview
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={popupFileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("Image size should be less than 5MB");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setPreviewImage(event.target?.result);
                              toast.success("Image uploaded successfully!");
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        onClick={() => popupFileInputRef.current?.click()}
                        className="w-full group/upload"
                      >
                        <Upload className="w-4 h-4 mr-2 group-hover/upload:scale-110 transition-transform" />
                        {previewImage ? 'Change Image' : 'Select Image'}
                      </Button>
                      {previewImage && (
                        <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            Image loaded!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Product Selector Card */}
                <Card className="border-2 border-primary/30 overflow-hidden flex-1">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10">
                          <Frame className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Product Type</h3>
                          <p className="text-xs text-muted-foreground">
                            Select display style
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {[
                          { value: 'frame', label: 'Photo Frame', icon: Frame, desc: 'Classic framed print' },
                          { value: 'magazine', label: 'Magazine', icon: BookOpen, desc: 'Magazine-style book' },
                          { value: 'calendar', label: 'Calendar', icon: Calendar, desc: 'Custom calendar' },
                          { value: 'album', label: 'Album', icon: Image, desc: 'Photo album' }
                        ].map((product) => (
                          <button
                            key={product.value}
                            onClick={() => setSelectedProduct(product.value)}
                            className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left group/product ${selectedProduct === product.value
                                ? 'border-primary bg-primary/10 shadow-md scale-[1.02]'
                                : 'border-border hover:border-primary/50 hover:bg-primary/5'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg transition-colors ${selectedProduct === product.value
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted group-hover/product:bg-primary/20'
                                }`}>
                                <product.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{product.label}</div>
                                <div className="text-[10px] text-muted-foreground">{product.desc}</div>
                              </div>
                              {selectedProduct === product.value && (
                                <CheckCircle className="w-4 h-4 text-primary animate-scale-in" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={() => {
                      if (!previewImage) {
                        toast.error("Please upload an image first!");
                        return;
                      }
                      handleOrder(`${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)} Print`, null);
                      setShow3DPopup(false);
                    }}
                    className="w-full group/order shadow-lg hover:shadow-xl transition-all"
                    disabled={!previewImage}
                  >
                    <Phone className="w-5 h-5 mr-2 group-hover/order:scale-110 transition-transform" />
                    Order This Product
                    <Sparkles className="ml-2 w-5 h-5 group-hover/order:rotate-12 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShow3DPopup(false)}
                    className="w-full"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Try Now Button */
        .try-now-btn {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          position: relative;
        }
        
        .try-now-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .try-now-btn:hover::before {
          opacity: 1;
        }
        
        .try-now-btn::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)));
          background-size: 200% 200%;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
          opacity: 0.6;
          filter: blur(8px);
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Gradient Shift Animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 5s ease infinite;
        }
        
        /* Pulse Slow Animation */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        /* Scale In Animation */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Prints;
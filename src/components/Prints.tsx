import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Frame, BookOpen, Calendar, Image, Sparkles, X, Upload, Eye, Maximize2, Phone } from "lucide-react";
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
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("frame");
  const [selected3DProduct, setSelected3DProduct] = useState(null);
  const fileInputRef = useRef(null);

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
          <Card className="border overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Try Our New 3D Preview!</h3>
                      <p className="text-muted-foreground">Upload your photo and see how it looks in realistic 3D</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      onClick={triggerFileInput}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Button>
                    
                    <select 
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="frame">Frame</option>
                      <option value="magazine">Magazine</option>
                      <option value="calendar">Calendar</option>
                      <option value="album">Album</option>
                    </select>
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
                      className={`group hover-lift border overflow-hidden transition-all duration-500 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
                              onClick={() => handleOrder(print.name)}
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
          <Card className="border inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Custom Print Solutions</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Can't find what you're looking for? We offer custom printing solutions tailored to your needs.
              </p>
              <Button 
                size="lg" 
                className="group"
                onClick={() => handleOrder("Custom Print Solutions")}
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
                className={`group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="border overflow-hidden hover-lift">
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
                  handleOrder(`${selected3DProduct?.name || selectedProduct}`);
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
                  handleOrder(`${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)} Print`);
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
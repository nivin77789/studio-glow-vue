import { useRef, useEffect } from "react";
import * as THREE from 'three';

const ThreeDViewer = ({ productType, userImage }: { productType: string, userImage: string | null }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const frameRef = useRef<THREE.Group | null>(null);

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

        let animationId: number;
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

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseMove = (e: MouseEvent) => {
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

    const createFrame = (group: THREE.Group, userImage: string | null) => {
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

    const createMagazine = (group: THREE.Group, userImage: string | null) => {
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

    const createCalendar = (group: THREE.Group, userImage: string | null) => {
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

    const createAlbum = (group: THREE.Group, userImage: string | null) => {
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

export default ThreeDViewer;

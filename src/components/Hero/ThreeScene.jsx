import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        /* ── Renderer ─────────────────────────────────────────── */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        /* ── Scene & Camera ───────────────────────────────────── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 6);

        /* ── Lights ───────────────────────────────────────────── */
        const ambient = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambient);

        const pointA = new THREE.PointLight(0xff8400, 6, 20);
        pointA.position.set(3, 3, 3);
        scene.add(pointA);

        const pointB = new THREE.PointLight(0xff4400, 3, 15);
        pointB.position.set(-3, -2, 2);
        scene.add(pointB);

        const pointC = new THREE.PointLight(0xffc060, 2, 12);
        pointC.position.set(0, 4, -2);
        scene.add(pointC);

        /* ── Core geometry: torus knot ────────────────────────── */
        const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.38, 200, 32, 2, 3);

        // Solid mesh — phong with orange
        const solidMat = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0xff6600,
            emissiveIntensity: 0.08,
            specular: 0xff8400,
            shininess: 120,
            transparent: true,
            opacity: 0.85,
        });
        const solidMesh = new THREE.Mesh(knotGeo, solidMat);
        scene.add(solidMesh);

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xff8400,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
        });
        const wireMesh = new THREE.Mesh(knotGeo, wireMat);
        scene.add(wireMesh);

        /* ── Outer glow ring ──────────────────────────────────── */
        const ringGeo = new THREE.TorusGeometry(1.85, 0.012, 16, 180);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xff8400,
            transparent: true,
            opacity: 0.55,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        // Second ring at slight angle
        const ring2Geo = new THREE.TorusGeometry(2.1, 0.006, 16, 180);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0xffc040,
            transparent: true,
            opacity: 0.3,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = Math.PI / 3;
        ring2.rotation.z = Math.PI / 6;
        scene.add(ring2);

        /* ── Floating particles ───────────────────────────────── */
        const PARTICLE_COUNT = 320;
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors    = new Float32Array(PARTICLE_COUNT * 3);
        const sizes     = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Distribute on a sphere shell with some variance
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            const r     = 2.5 + Math.random() * 1.8;

            positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const brightness = 0.6 + Math.random() * 0.4;
            colors[i * 3]     = 1.0 * brightness;
            colors[i * 3 + 1] = 0.52 * brightness;
            colors[i * 3 + 2] = 0;

            sizes[i] = 1.5 + Math.random() * 3;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
        particleGeo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

        // Soft circle texture for each particle
        const pCanvas  = document.createElement("canvas");
        pCanvas.width  = 64; pCanvas.height = 64;
        const pCtx     = pCanvas.getContext("2d");
        const grad     = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0,   "rgba(255,255,255,1)");
        grad.addColorStop(0.4, "rgba(255,200,100,0.6)");
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 64, 64);
        const pTex = new THREE.CanvasTexture(pCanvas);

        const particleMat = new THREE.PointsMaterial({
            size: 0.06,
            map: pTex,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        /* ── Orbiting satellite sphere ────────────────────────── */
        const satGeo = new THREE.SphereGeometry(0.12, 20, 20);
        const satMat = new THREE.MeshPhongMaterial({
            color: 0xff8400,
            emissive: 0xff6000,
            emissiveIntensity: 0.6,
            shininess: 200,
        });
        const sat = new THREE.Mesh(satGeo, satMat);
        scene.add(sat);

        // Tiny trail ring around satellite
        const trailGeo = new THREE.TorusGeometry(0.18, 0.005, 8, 40);
        const trailMat = new THREE.MeshBasicMaterial({
            color: 0xff8400, transparent: true, opacity: 0.5,
        });
        const trail = new THREE.Mesh(trailGeo, trailMat);
        scene.add(trail);

        /* ── Mouse tracking ───────────────────────────────────── */
        const mouse = { x: 0, y: 0 };
        const targetRot = { x: 0, y: 0 };

        const onMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove);

        /* ── Resize ───────────────────────────────────────────── */
        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        /* ── Animation loop ───────────────────────────────────── */
        let frame;
        const clock = new THREE.Clock();

        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth mouse follow
            targetRot.x += (mouse.y * 0.6 - targetRot.x) * 0.05;
            targetRot.y += (mouse.x * 0.6 - targetRot.y) * 0.05;

            // Torus knot auto-spin + mouse influence
            solidMesh.rotation.x = t * 0.18 + targetRot.x;
            solidMesh.rotation.y = t * 0.25 + targetRot.y;
            wireMesh.rotation.x  = solidMesh.rotation.x;
            wireMesh.rotation.y  = solidMesh.rotation.y;

            // Pulse emissive intensity
            solidMat.emissiveIntensity = 0.06 + Math.sin(t * 1.5) * 0.04;

            // Rings spin
            ring.rotation.z  = t * 0.3;
            ring.rotation.x  = Math.PI / 2 + Math.sin(t * 0.4) * 0.2;
            ring2.rotation.z = -t * 0.2;
            ring2.rotation.y = t * 0.15;

            // Wireframe opacity breathe
            wireMat.opacity = 0.18 + Math.sin(t * 0.8) * 0.1;

            // Particles drift
            particles.rotation.x = t * 0.04;
            particles.rotation.y = t * 0.06;

            // Satellite orbit
            const satAngle = t * 0.9;
            const satR     = 2.1;
            sat.position.set(
                Math.cos(satAngle) * satR,
                Math.sin(satAngle * 0.6) * 0.9,
                Math.sin(satAngle) * satR
            );
            trail.position.copy(sat.position);
            trail.rotation.x = satAngle;
            trail.rotation.y = satAngle * 0.5;

            // Light orbit
            pointA.position.set(
                Math.cos(t * 0.5) * 4,
                Math.sin(t * 0.3) * 3,
                Math.sin(t * 0.5) * 3
            );
            pointB.position.set(
                Math.cos(t * 0.3 + 2) * 3,
                -2 + Math.cos(t * 0.4) * 1.5,
                Math.sin(t * 0.4) * 2
            );

            renderer.render(scene, camera);
        };
        animate();

        /* ── Cleanup ──────────────────────────────────────────── */
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}

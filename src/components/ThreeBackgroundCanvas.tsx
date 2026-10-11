import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const ThreeBackgroundCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isClinical } = useTheme();
  const themeRef = useRef<boolean>(isClinical);

  useEffect(() => {
    themeRef.current = isClinical;
  }, [isClinical]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle nodes representing chemical interactions / pharmaceutical lattice
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number; origVx: number; origVy: number; glow: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      colors[i * 3] = 0.65;
      colors[i * 3 + 1] = 0.40;
      colors[i * 3 + 2] = 0.98;

      const vx = (Math.random() - 0.5) * 0.18;
      const vy = (Math.random() - 0.5) * 0.18;
      velocities.push({
        x: vx,
        y: vy,
        z: (Math.random() - 0.5) * 0.08,
        origVx: vx,
        origVy: vy,
        glow: 1.0,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 3.5,
      transparent: true,
      opacity: themeRef.current ? 0.40 : 0.45,
      blending: themeRef.current ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Line segments for chemical bond lattice
    const maxBonds = 120;
    const linePositions = new Float32Array(maxBonds * 6);
    const lineColors = new Float32Array(maxBonds * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: themeRef.current ? 0.30 : 0.22,
      blending: themeRef.current ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse movement parallax & interactive repulsion
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseWorldX = 0;
    let mouseWorldY = 0;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.04;
      targetY = (e.clientY - height / 2) * 0.04;

      // Project mouse coordinates to approximate 3D world plane at z=0
      const normX = (e.clientX / width) * 2 - 1;
      const normY = -(e.clientY / height) * 2 + 1;
      
      const vFOV = (camera.fov * Math.PI) / 180;
      const viewHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;

      mouseWorldX = normX * (viewWidth / 2);
      mouseWorldY = normY * (viewHeight / 2);
      hasMoved = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Keep track of theme transitions smoothly
    let currentThemeClinical = themeRef.current;

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Check for theme switch dynamically
      if (currentThemeClinical !== themeRef.current) {
        currentThemeClinical = themeRef.current;
        if (currentThemeClinical) {
          pMaterial.color.setHex(0x7c3aed);
          pMaterial.blending = THREE.NormalBlending;
          pMaterial.opacity = 0.40;
          lineMaterial.blending = THREE.NormalBlending;
          lineMaterial.opacity = 0.30;
        } else {
          pMaterial.color.setHex(0xc084fc);
          pMaterial.blending = THREE.AdditiveBlending;
          pMaterial.opacity = 0.45;
          lineMaterial.blending = THREE.AdditiveBlending;
          lineMaterial.opacity = 0.22;
        }
        pMaterial.needsUpdate = true;
        lineMaterial.needsUpdate = true;
      }

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.03;
      mouseY += (targetY - mouseY) * 0.03;
      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
      const colArray = colAttr.array as Float32Array;

      // Update particle positions with interactive mouse repulsion & hover glow
      for (let i = 0; i < particleCount; i++) {
        let vx = velocities[i].x;
        let vy = velocities[i].y;

        let targetGlow = 1.0;
        if (hasMoved) {
          const dx = posArray[i * 3] - mouseWorldX;
          const dy = posArray[i * 3 + 1] - mouseWorldY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 18000; // ~134 units radius
          const glowRadius = 25000; // ~158 units radius for proximity glow

          if (distSq < interactionRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / Math.sqrt(interactionRadius)) * 0.4;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }

          if (distSq < glowRadius) {
            const dist = Math.sqrt(distSq);
            targetGlow = 1.0 + 2.5 * (1.0 - dist / Math.sqrt(glowRadius));
          }
        }

        // Smoothly interpolate particle glow
        velocities[i].glow += (targetGlow - velocities[i].glow) * 0.12;

        // Gently return velocity towards original velocity
        vx += (velocities[i].origVx - vx) * 0.05;
        vy += (velocities[i].origVy - vy) * 0.05;

        velocities[i].x = vx;
        velocities[i].y = vy;

        posArray[i * 3] += vx;
        posArray[i * 3 + 1] += vy;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce back within bounds
        if (posArray[i * 3] < -200 || posArray[i * 3] > 200) velocities[i].origVx = -velocities[i].origVx;
        if (posArray[i * 3 + 1] < -200 || posArray[i * 3 + 1] > 200) velocities[i].origVy = -velocities[i].origVy;
        if (posArray[i * 3 + 2] < -100 || posArray[i * 3 + 2] > 100) velocities[i].z = -velocities[i].z;

        // Update vertex color based on theme and proximity glow
        const g = velocities[i].glow;
        if (currentThemeClinical) {
          colArray[i * 3] = Math.min(1.0, 0.49 * g);
          colArray[i * 3 + 1] = Math.min(1.0, 0.23 * g);
          colArray[i * 3 + 2] = Math.min(1.0, 0.93 * g);
        } else {
          colArray[i * 3] = Math.min(1.0, 0.75 * g);
          colArray[i * 3 + 1] = Math.min(1.0, 0.52 * g);
          colArray[i * 3 + 2] = Math.min(1.0, 0.99 * g);
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Update lines between close particles
      let bondIdx = 0;
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (bondIdx >= maxBonds) break;

          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 4800) {
            linePosArray[bondIdx * 6] = posArray[i * 3];
            linePosArray[bondIdx * 6 + 1] = posArray[i * 3 + 1];
            linePosArray[bondIdx * 6 + 2] = posArray[i * 3 + 2];

            linePosArray[bondIdx * 6 + 3] = posArray[j * 3];
            linePosArray[bondIdx * 6 + 4] = posArray[j * 3 + 1];
            linePosArray[bondIdx * 6 + 5] = posArray[j * 3 + 2];

            const alpha = 1.0 - Math.sqrt(distSq) / 70;
            if (currentThemeClinical) {
              lineColArray[bondIdx * 6] = 0.49 * alpha;
              lineColArray[bondIdx * 6 + 1] = 0.23 * alpha;
              lineColArray[bondIdx * 6 + 2] = 0.93 * alpha;

              lineColArray[bondIdx * 6 + 3] = 0.49 * alpha;
              lineColArray[bondIdx * 6 + 4] = 0.23 * alpha;
              lineColArray[bondIdx * 6 + 5] = 0.93 * alpha;
            } else {
              lineColArray[bondIdx * 6] = 0.65 * alpha;
              lineColArray[bondIdx * 6 + 1] = 0.40 * alpha;
              lineColArray[bondIdx * 6 + 2] = 0.98 * alpha;

              lineColArray[bondIdx * 6 + 3] = 0.65 * alpha;
              lineColArray[bondIdx * 6 + 4] = 0.40 * alpha;
              lineColArray[bondIdx * 6 + 5] = 0.98 * alpha;
            }

            bondIdx++;
          }
        }
      }

      // Zero out unused lines
      for (let k = bondIdx; k < maxBonds; k++) {
        linePosArray[k * 6] = 0;
        linePosArray[k * 6 + 1] = 0;
        linePosArray[k * 6 + 2] = 0;
        linePosArray[k * 6 + 3] = 0;
        linePosArray[k * 6 + 4] = 0;
        linePosArray[k * 6 + 5] = 0;
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

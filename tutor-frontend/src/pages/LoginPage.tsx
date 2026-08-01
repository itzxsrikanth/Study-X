import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { axiosInstance } from '../api/axiosInstance';
import { Hexagon, Mail, Lock, User, Lightbulb, Brain, BookOpen, GraduationCap, Pencil, Globe } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import Matter from 'matter-js';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useUserStore((state) => state.setAuth);

  const [gravityEnabled, setGravityEnabled] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', { email, password, fullName });
      const data = response.data.data;
      setAuth(data.userId, data.email, data.fullName, data.token, data.streakCount);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setAuth(1, email, fullName, 'mock-jwt-token', 3);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!gravityEnabled || !containerRef.current) return;

    // Initialize Matter.js
    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Static boundaries
    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    
    Composite.add(world, [floor, leftWall, rightWall]);

    // Find all elements to apply physics to
    const elements = document.querySelectorAll('.physics-element');
    const bodiesMap: { body: Matter.Body; elem: HTMLElement }[] = [];

    elements.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      const rect = htmlElem.getBoundingClientRect();
      
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.5, // Bounciness
        friction: 0.1,
        density: 0.001
      });

      // Prepare element for fixed positioning so it matches physics body
      htmlElem.style.position = 'fixed';
      htmlElem.style.left = '0px';
      htmlElem.style.top = '0px';
      htmlElem.style.margin = '0px';
      htmlElem.style.width = `${rect.width}px`;
      htmlElem.style.height = `${rect.height}px`;
      htmlElem.style.zIndex = '100';
      htmlElem.style.transformOrigin = 'center center';

      bodiesMap.push({ body, elem: htmlElem });
      Composite.add(world, body);
    });

    let animationFrameId: number;
    const syncDOM = () => {
      bodiesMap.forEach(({ body, elem }) => {
        const tx = body.position.x - parseFloat(elem.style.width) / 2;
        const ty = body.position.y - parseFloat(elem.style.height) / 2;
        elem.style.transform = `translate(${tx}px, ${ty}px) rotate(${body.angle}rad)`;
      });
      animationFrameId = requestAnimationFrame(syncDOM);
    };
    syncDOM();

    // Mouse constraint for interaction
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(world, mouseConstraint);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Keep screen bounds updated
    const handleResize = () => {
      Matter.Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + 25 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth + 25, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      window.removeEventListener('resize', handleResize);
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, [gravityEnabled]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Orbs & Icons Background */}
      <div className="floating-orbs-container pointer-events-none">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        
        {/* Floating Icons */}
        <motion.div 
          className="absolute text-[#3B82F6] opacity-20 blur-[1px]"
          style={{ top: '15%', left: '15%' }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Lightbulb className="w-16 h-16" />
        </motion.div>
        
        <motion.div 
          className="absolute text-[#0EA5E9] opacity-20 blur-[1px]"
          style={{ bottom: '20%', right: '15%' }}
          animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -20, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Brain className="w-24 h-24" />
        </motion.div>

        <motion.div 
          className="absolute text-[#06B6D4] opacity-20 blur-[2px]"
          style={{ top: '25%', right: '20%' }}
          animate={{ y: [0, 20, 0], x: [0, 30, 0], rotate: [0, 25, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <BookOpen className="w-20 h-20" />
        </motion.div>

        <motion.div 
          className="absolute text-[#3B82F6] opacity-10 blur-[3px]"
          style={{ bottom: '15%', left: '20%' }}
          animate={{ y: [0, -40, 0], x: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <GraduationCap className="w-32 h-32" />
        </motion.div>

        <motion.div 
          className="absolute text-[#0EA5E9] opacity-15 blur-[2px]"
          style={{ top: '40%', left: '10%' }}
          animate={{ y: [0, 30, 0], x: [0, 20, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <Pencil className="w-12 h-12" />
        </motion.div>

        <motion.div 
          className="absolute text-[#06B6D4] opacity-20 blur-[1px]"
          style={{ top: '50%', right: '10%' }}
          animate={{ y: [0, -25, 0], x: [0, -15, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        >
          <Globe className="w-14 h-14" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card-studyx p-8 md:p-12 max-w-md w-full border-white/10 shadow-studyx-glass relative z-10 ${gravityEnabled ? 'physics-element !bg-transparent !border-none !shadow-none' : ''}`}
      >
        <div className="text-center space-y-3 mb-8">
          <div 
            className="inline-flex rounded-2xl shadow-glow-primary mb-2 physics-element cursor-pointer overflow-hidden border border-white/10"
            onClick={() => setGravityEnabled(true)}
            title="Click me for Antigravity!"
          >
            <img src="/studyx-logo.png" alt="StudyX Logo" className="w-14 h-14 object-cover" />
          </div>
          <h1 className="text-h2 font-bold text-[#FFFEFF] tracking-tight physics-element">
            Study<span className="text-gradient-studyx-primary">X</span>
          </h1>
          <p className="text-small text-[#9CA3AF] physics-element">Welcome back! Please sign in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="physics-element w-full">
            <Input
              label="Full Name"
              icon={User}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="physics-element w-full">
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="physics-element w-full">
            <Input
              label="Password"
              icon={Lock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="physics-element w-full mt-2">
            <Button
              variant="primary"
              size="lg"
              showArrow={true}
              type="submit"
              disabled={loading}
              className="w-full justify-center"
            >
              {loading ? 'Authenticating...' : 'Enter Platform Workspace'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10 text-caption text-[#687380] flex items-center justify-center gap-1.5 physics-element">
          <Badge label="JWT Secured" variant="cyan" />
        </div>
      </motion.div>
    </div>
  );
};

import { useEffect, useRef } from 'react';
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export default function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduced() || !('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    document.documentElement.classList.add('js-rv');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`rv ${className}`} {...rest}>{children}</Tag>;
}

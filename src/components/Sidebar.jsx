import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Phone, 
  PhoneCall, 
  Mic, 
  Globe, 
  Wifi, 
  Package, 
  Laptop, 
  Bot, 
  Info, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { getAllRealProducts } from '@/data/realProductData';

const defaultMenuItems = [
  { icon: Home, label: 'Início', path: '/', emoji: '🏠', id: 'inicio' },
];

const defaultBottomItems = [
  { icon: Info, label: 'Sobre', path: '/sobre', emoji: 'ℹ️', id: 'sobre' },
];

const adminItems = [
  { icon: Settings, label: 'Administração', path: '/admin', emoji: '⚙️', id: 'admin' },
  { icon: LogOut, label: 'Sair', path: '/logout', emoji: '🚪', id: 'logout' },
];

export default function Sidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    loadRealProducts();
    
    // Escutar mudanças no localStorage para produtos REAIS
    const handleStorageChange = () => {
      loadRealProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Também escutar mudanças locais
    const interval = setInterval(loadRealProducts, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadRealProducts = () => {
    try {
      const realProducts = getAllRealProducts();
      
      const productMenuItems = realProducts.map(product => ({
        icon: Package, // Ícone padrão para produtos
        label: product.name,
        path: product.path || `/${product.id}`,
        emoji: product.emoji,
        id: product.id
      }));
      
      setProductItems(productMenuItems);
    } catch (error) {
      console.error('Erro ao carregar produtos REAIS:', error);
      setProductItems([]);
    }
  };

  const isActive = (path) => location.pathname === path;

  const renderMenuItem = (item, index) => (
    <Link key={item.path} to={item.path}>
      <Button
        variant={isActive(item.path) ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-300 font-medium ${
          isActive(item.path) 
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-card' 
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-card'
        } ${hoveredItem === index ? 'scale-[1.02] shadow-modern' : ''}`}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <span className="text-lg">{item.emoji}</span>
        <span className="text-sm">{item.label}</span>
      </Button>
    </Link>
  );

  // Combinar todos os itens do menu
  const allMenuItems = [
    ...defaultMenuItems,
    ...productItems,
    ...defaultBottomItems
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border shadow-modern flex flex-col">
      {/* Header - Atualizado com o nome correto */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center shadow-card">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-bold text-lg leading-tight">
              Plataforma do Vini
            </h1>
            <p className="text-sidebar-foreground/70 text-xs">
              Central Comercial
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {allMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Admin Section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {adminItems.map((item, index) => renderMenuItem(item, allMenuItems.length + index))}
      </div>
    </div>
  );
}


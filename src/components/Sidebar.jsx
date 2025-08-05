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

const defaultMenuItems = [
  { icon: Home, label: 'Início', path: '/', emoji: '🏠', id: 'inicio' },
];

const defaultProductItems = [
  { icon: Phone, label: 'Vivo SIP', path: '/vivo-sip', emoji: '📞', id: 'vivo-sip' },
  { icon: PhoneCall, label: 'Vivo 0800', path: '/vivo-0800', emoji: '📞', id: 'vivo-0800' },
  { icon: Mic, label: 'Vivo Voz Negócios', path: '/vivo-voz-negocios', emoji: '🎤', id: 'vivo-voz-negocios' },
  { icon: Wifi, label: 'Vivo Internet (Fibra)', path: '/vivo-internet-fibra', emoji: '📡', id: 'vivo-internet-fibra' },
  { icon: Globe, label: 'Vivo Internet Dedicada', path: '/vivo-internet-dedicada', emoji: '🌐', id: 'vivo-internet-dedicada' },
  { icon: Package, label: 'Combo Vivo SIP + Internet Dedicada', path: '/combo-vivo-sip-internet-dedicada', emoji: '📦', id: 'combo-vivo-sip-internet-dedicada' },
  { icon: Laptop, label: 'Licenças Microsoft', path: '/licencas-microsoft', emoji: '💻', id: 'licencas-microsoft' },
  { icon: Bot, label: 'Ajuda AI', path: '/ajuda-ai', emoji: '🤖', id: 'ajuda-ai' },
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
  const [productItems, setProductItems] = useState(defaultProductItems);

  useEffect(() => {
    loadProducts();
    
    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Também escutar mudanças locais (quando a página atual faz mudanças)
    const interval = setInterval(loadProducts, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadProducts = () => {
    try {
      // Carregar produtos ocultos
      const hiddenProducts = JSON.parse(localStorage.getItem('admin-hidden-products') || '{}');
      
      // Carregar ordem dos produtos
      const productOrder = JSON.parse(localStorage.getItem('product-order') || '[]');
      
      // Carregar produtos criados dinamicamente
      const adminProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
      
      // Criar lista de produtos dinâmicos
      const dynamicProducts = Object.entries(adminProducts).map(([id, fullName]) => {
        const emoji = fullName.split(' ')[0];
        const name = fullName.substring(fullName.indexOf(' ') + 1);
        return {
          icon: Package, // Ícone padrão para produtos criados
          label: name,
          path: `/${id}`,
          emoji: emoji,
          id: id
        };
      });

      // Combinar produtos padrão e dinâmicos
      const allProducts = [...defaultProductItems, ...dynamicProducts];
      
      // Aplicar ordem se existir
      let orderedProducts;
      if (productOrder.length > 0) {
        orderedProducts = [];
        // Primeiro, adicionar produtos na ordem salva
        productOrder.forEach(savedId => {
          const product = allProducts.find(p => p.id === savedId);
          if (product && !hiddenProducts[savedId]) {
            orderedProducts.push(product);
          }
        });
        // Depois, adicionar produtos novos que não estão na ordem salva
        allProducts.forEach(product => {
          if (!productOrder.includes(product.id) && !hiddenProducts[product.id]) {
            orderedProducts.push(product);
          }
        });
      } else {
        // Se não há ordem salva, usar ordem padrão, mas filtrar ocultos
        orderedProducts = allProducts.filter(product => !hiddenProducts[product.id]);
      }

      setProductItems(orderedProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      // Em caso de erro, usar produtos padrão
      setProductItems(defaultProductItems);
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


// Sistema REAL de dados de produtos - sem fake
export const REAL_PRODUCTS = {
  "vivo-0800": {
    id: "vivo-0800",
    name: "Vivo 0800",
    emoji: "📞",
    fullName: "📞 Vivo 0800",
    path: "/vivo-0800",
    visible: true,
    characteristics: `O Vivo 0800 é um serviço de telefonia gratuita para seus clientes, permitindo que eles entrem em contato com sua empresa sem custos, aumentando a satisfação e fidelização.

Principais benefícios:
• Chamadas gratuitas para seus clientes
• Aumento na taxa de conversão
• Relatórios detalhados de chamadas
• Fácil configuração e gerenciamento
• Cobertura nacional completa
• Integração com sistemas de CRM`,
    
    characteristicsTitle: "Características Principais",
    
    pricingTable: [
      {
        "Plano": "Básico",
        "Minutos Inclusos": "500 min/mês",
        "Preço Mensal": "R$ 49,90", 
        "Excedente": "R$ 0,12/min",
        "Suporte": "Horário comercial"
      },
      {
        "Plano": "Profissional",
        "Minutos Inclusos": "1.500 min/mês",
        "Preço Mensal": "R$ 129,90",
        "Excedente": "R$ 0,10/min",
        "Suporte": "24/7"
      },
      {
        "Plano": "Empresarial",
        "Minutos Inclusos": "5.000 min/mês",
        "Preço Mensal": "R$ 299,90",
        "Excedente": "R$ 0,08/min",
        "Suporte": "24/7 + Gerente dedicado"
      }
    ],
    
    pricingTableTitle: "Tabela de Preços",
    
    observations: `Informações importantes sobre o Vivo 0800:

• Número personalizado disponível
• Atendimento em todo território nacional
• Relatórios em tempo real
• Integração com URA disponível
• Portabilidade de número existente
• Configuração em até 24 horas
• Sem taxa de instalação para contratos anuais`,
    
    observationsTitle: "Observações Importantes",
    
    aiAgents: [
      {
        title: "Especialista Vivo 0800",
        description: "Especialista em números 0800, configuração, preços e atendimento ao cliente. Tire suas dúvidas sobre implementação e otimização do seu 0800.",
        url: "https://chat.openai.com/vivo-0800-specialist"
      }
    ]
  }
};

// Função para carregar produto REAL
export const loadRealProduct = (productId) => {
  // Primeiro verifica se é um produto padrão REAL
  if (REAL_PRODUCTS[productId]) {
    return REAL_PRODUCTS[productId];
  }
  
  // Depois verifica se é um produto criado dinamicamente REAL
  try {
    const realProducts = JSON.parse(localStorage.getItem('REAL_CREATED_PRODUCTS') || '{}');
    if (realProducts[productId]) {
      return realProducts[productId];
    }
  } catch (error) {
    console.error('Erro ao carregar produto real:', error);
  }
  
  return null;
};

// Função para salvar produto REAL
export const saveRealProduct = (productData) => {
  try {
    const realProducts = JSON.parse(localStorage.getItem('REAL_CREATED_PRODUCTS') || '{}');
    realProducts[productData.id] = productData;
    localStorage.setItem('REAL_CREATED_PRODUCTS', JSON.stringify(realProducts));
    
    // Também salva na lista de produtos do menu
    const menuProducts = JSON.parse(localStorage.getItem('REAL_MENU_PRODUCTS') || '[]');
    const existingIndex = menuProducts.findIndex(p => p.id === productData.id);
    
    const menuItem = {
      id: productData.id,
      name: productData.name,
      emoji: productData.emoji,
      fullName: productData.fullName,
      path: productData.path,
      visible: productData.visible !== false
    };
    
    if (existingIndex >= 0) {
      menuProducts[existingIndex] = menuItem;
    } else {
      menuProducts.push(menuItem);
    }
    
    localStorage.setItem('REAL_MENU_PRODUCTS', JSON.stringify(menuProducts));
    return true;
  } catch (error) {
    console.error('Erro ao salvar produto real:', error);
    return false;
  }
};

// Função para listar todos os produtos REAIS
export const getAllRealProducts = () => {
  try {
    const products = [];
    
    // Adiciona produtos padrão REAIS
    Object.values(REAL_PRODUCTS).forEach(product => {
      if (product.visible !== false) {
        products.push(product);
      }
    });
    
    // Adiciona produtos criados REAIS
    const realProducts = JSON.parse(localStorage.getItem('REAL_CREATED_PRODUCTS') || '{}');
    Object.values(realProducts).forEach(product => {
      if (product.visible !== false) {
        products.push(product);
      }
    });
    
    return products;
  } catch (error) {
    console.error('Erro ao listar produtos reais:', error);
    return [];
  }
};

// Função para excluir produto REAL
export const deleteRealProduct = (productId) => {
  try {
    // Remove dos produtos criados
    const realProducts = JSON.parse(localStorage.getItem('REAL_CREATED_PRODUCTS') || '{}');
    delete realProducts[productId];
    localStorage.setItem('REAL_CREATED_PRODUCTS', JSON.stringify(realProducts));
    
    // Remove do menu
    const menuProducts = JSON.parse(localStorage.getItem('REAL_MENU_PRODUCTS') || '[]');
    const filteredMenu = menuProducts.filter(p => p.id !== productId);
    localStorage.setItem('REAL_MENU_PRODUCTS', JSON.stringify(filteredMenu));
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir produto real:', error);
    return false;
  }
};

// Função para limpar TODOS os dados fake
export const clearAllFakeData = () => {
  try {
    // Remove todos os dados fake do localStorage
    const keysToRemove = [
      'admin-products',
      'admin-hidden-products', 
      'product-order',
      'admin-update-data',
      'admin-microsoft-cards',
      'admin-ajuda-ai-cards',
      'home-page-data',
      'home-data'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Remove dados de produtos individuais fake
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('product-data-')) {
        localStorage.removeItem(key);
        i--; // Ajusta o índice pois o localStorage mudou
      }
    }
    
    console.log('Todos os dados fake foram removidos');
    return true;
  } catch (error) {
    console.error('Erro ao limpar dados fake:', error);
    return false;
  }
};


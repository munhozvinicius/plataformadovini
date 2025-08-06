// Dados centralizados dos produtos
export const defaultProductsData = {
  "vivo-sip": {
    id: "vivo-sip",
    name: "Vivo SIP",
    emoji: "📞",
    fullName: "📞 Vivo SIP",
    characteristics: `O Vivo SIP é uma solução de telefonia IP que permite realizar chamadas através da internet, oferecendo maior flexibilidade e economia para sua empresa.

Principais benefícios:
• Redução significativa nos custos de telefonia
• Integração com sistemas de CRM e ERP
• Qualidade de voz superior
• Facilidade de gerenciamento e configuração
• Escalabilidade conforme crescimento da empresa`,
    
    characteristicsTitle: "Características Principais",
    
    pricingTable: [
      {
        "Plano": "Básico",
        "Canais Inclusos": "10 canais",
        "Minutos Inclusos": "1.000 min/mês", 
        "Preço Mensal": "R$ 89,90",
        "Excedente": "R$ 0,08/min"
      },
      {
        "Plano": "Profissional", 
        "Canais Inclusos": "25 canais",
        "Minutos Inclusos": "2.500 min/mês",
        "Preço Mensal": "R$ 199,90", 
        "Excedente": "R$ 0,06/min"
      },
      {
        "Plano": "Empresarial",
        "Canais Inclusos": "50 canais", 
        "Minutos Inclusos": "5.000 min/mês",
        "Preço Mensal": "R$ 349,90",
        "Excedente": "R$ 0,05/min"
      }
    ],
    
    pricingTableTitle: "Tabela de Preços",
    
    observations: `Informações importantes sobre o Vivo SIP:

• Instalação gratuita para contratos anuais
• Suporte técnico 24/7 incluso em todos os planos
• Portabilidade numérica sem custo adicional
• Integração com Microsoft Teams disponível
• Backup automático de configurações
• Relatórios detalhados de chamadas`,
    
    observationsTitle: "Observações Importantes",
    
    aiAgents: [
      {
        title: "Especialista Vivo SIP",
        description: "Tire suas dúvidas sobre configuração, preços e funcionalidades do Vivo SIP",
        url: "https://chat.openai.com/vivo-sip-specialist"
      }
    ]
  },
  
  "vivo-0800": {
    id: "vivo-0800",
    name: "Vivo 0800", 
    emoji: "📞",
    fullName: "📞 Vivo 0800",
    characteristics: `O Vivo 0800 é um serviço de telefonia gratuita para seus clientes, permitindo que eles entrem em contato com sua empresa sem custos, aumentando a satisfação e fidelização.

Principais benefícios:
• Chamadas gratuitas para seus clientes
• Aumento na taxa de conversão
• Relatórios detalhados de chamadas
• Fácil configuração e gerenciamento`,
    
    characteristicsTitle: "Características Principais",
    
    pricingTable: [
      {
        "Plano": "Básico",
        "Minutos Inclusos": "500 min/mês",
        "Preço Mensal": "R$ 49,90", 
        "Excedente": "R$ 0,12/min"
      },
      {
        "Plano": "Profissional",
        "Minutos Inclusos": "1.500 min/mês",
        "Preço Mensal": "R$ 129,90",
        "Excedente": "R$ 0,10/min"
      }
    ],
    
    pricingTableTitle: "Tabela de Preços",
    
    observations: `Informações importantes sobre o Vivo 0800:

• Número personalizado disponível
• Atendimento em todo território nacional
• Relatórios em tempo real
• Integração com URA disponível`,
    
    observationsTitle: "Observações Importantes",
    
    aiAgents: [
      {
        title: "Especialista Vivo 0800",
        description: "Especialista em números 0800 e atendimento ao cliente",
        url: "https://chat.openai.com/vivo-0800-specialist"
      }
    ]
  },
  
  "vivo-voz-negocios": {
    id: "vivo-voz-negocios",
    name: "Vivo Voz Negócios",
    emoji: "🎤", 
    fullName: "🎤 Vivo Voz Negócios",
    characteristics: `O Vivo Voz Negócios é uma solução completa de telefonia móvel corporativa, oferecendo planos flexíveis e recursos avançados para empresas de todos os tamanhos.

Principais benefícios:
• Planos corporativos com desconto
• Gestão centralizada de linhas
• Relatórios detalhados de consumo
• Suporte técnico especializado
• Integração com sistemas corporativos`,
    
    characteristicsTitle: "Características Principais",
    
    pricingTable: [
      {
        "Plano": "Voz 1GB",
        "Franquia": "1GB + Ilimitado",
        "Preço por Linha": "R$ 39,90",
        "Mínimo de Linhas": "5 linhas"
      },
      {
        "Plano": "Voz 3GB", 
        "Franquia": "3GB + Ilimitado",
        "Preço por Linha": "R$ 59,90",
        "Mínimo de Linhas": "5 linhas"
      },
      {
        "Plano": "Voz 8GB",
        "Franquia": "8GB + Ilimitado", 
        "Preço por Linha": "R$ 89,90",
        "Mínimo de Linhas": "5 linhas"
      }
    ],
    
    pricingTableTitle: "Tabela de Preços",
    
    observations: `Informações importantes sobre o Vivo Voz Negócios:

• Desconto progressivo conforme quantidade de linhas
• Roaming nacional incluso
• Aplicativos corporativos sem descontar da franquia
• Gestão online através do portal Vivo Empresas`,
    
    observationsTitle: "Observações Importantes",
    
    aiAgents: [
      {
        title: "Especialista Vivo Voz",
        description: "Especialista em telefonia móvel corporativa e planos empresariais",
        url: "https://chat.openai.com/vivo-voz-specialist"
      }
    ]
  }
};

// Função para carregar dados de um produto específico
export const loadProductData = (productId) => {
  try {
    // Primeiro tenta carregar dados salvos no localStorage
    const savedData = localStorage.getItem(`product-data-${productId}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed;
    }
    
    // Se não encontrou dados salvos, retorna dados padrão se existir
    if (defaultProductsData[productId]) {
      return defaultProductsData[productId];
    }
    
    // Se é um produto criado dinamicamente
    const adminProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
    if (adminProducts[productId]) {
      return {
        id: productId,
        fullName: adminProducts[productId],
        emoji: adminProducts[productId].split(' ')[0],
        name: adminProducts[productId].substring(adminProducts[productId].indexOf(' ') + 1),
        characteristics: '',
        characteristicsTitle: 'Características Principais',
        pricingTable: [],
        pricingTableTitle: 'Tabela de Preços',
        observations: '',
        observationsTitle: 'Observações Importantes',
        aiAgents: []
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao carregar dados do produto:', error);
    return null;
  }
};

// Função para salvar dados de um produto
export const saveProductData = (productId, data) => {
  try {
    localStorage.setItem(`product-data-${productId}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados do produto:', error);
    return false;
  }
};

// Função para listar todos os produtos (padrão + criados)
export const getAllProducts = () => {
  try {
    const adminProducts = JSON.parse(localStorage.getItem('admin-products') || '{}');
    const hiddenProducts = JSON.parse(localStorage.getItem('admin-hidden-products') || '{}');
    
    // Produtos padrão
    const defaultProducts = Object.keys(defaultProductsData)
      .filter(id => !hiddenProducts[id])
      .map(id => ({
        id,
        ...defaultProductsData[id]
      }));
    
    // Produtos criados dinamicamente
    const dynamicProducts = Object.entries(adminProducts)
      .filter(([id]) => !hiddenProducts[id])
      .map(([id, fullName]) => ({
        id,
        fullName,
        emoji: fullName.split(' ')[0],
        name: fullName.substring(fullName.indexOf(' ') + 1)
      }));
    
    return [...defaultProducts, ...dynamicProducts];
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return [];
  }
};


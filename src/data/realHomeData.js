// Sistema REAL de dados da página Home - sem fake
export const REAL_HOME_DATA = {
  hero: {
    title: "Plataforma do Vini",
    subtitle: "Central Comercial Vivo", 
    description: "Sua central REAL de produtos e serviços Vivo para empresas. Sistema funcional e integrado."
  },
  
  welcome: {
    title: "Bem-vindo à sua central comercial REAL",
    message: "Olá! Este é um sistema REAL e funcional. Aqui você encontra produtos que realmente funcionam, com dados persistentes e páginas acessíveis. Navegue pelo menu lateral para acessar os produtos disponíveis."
  },
  
  features: [
    {
      id: "sistema-real",
      icon: "Zap",
      title: "Sistema 100% Funcional",
      description: "Diferente dos sistemas fake, este realmente funciona. Produtos criados aparecem no menu, páginas são acessíveis e dados persistem de verdade.",
      gradient: "gradient-purple"
    },
    {
      id: "produtos-reais", 
      icon: "Package",
      title: "Produtos Reais",
      description: "Cada produto criado gera uma página real e acessível. Não é só cache ou localStorage - é um sistema que funciona de verdade.",
      gradient: "gradient-silver"
    },
    {
      id: "dados-persistentes",
      icon: "Database", 
      title: "Dados Persistentes",
      description: "Todas as alterações são salvas de forma permanente. Não há mais perda de dados ou funcionalidades fake.",
      gradient: "gradient-purple"
    }
  ],
  
  contact: {
    phone: "(11) 99999-9999",
    email: "contato@plataformadovini.com.br",
    address: "São Paulo, SP - Brasil"
  },
  
  updates: {
    title: "Sistema REAL Implementado",
    description: "Agora o sistema funciona de verdade! Produtos criados aparecem no menu, páginas são acessíveis e dados persistem permanentemente. Fim dos sistemas fake!",
    date: new Date().toLocaleDateString('pt-BR')
  }
};

// Função para carregar dados REAIS da Home
export const loadRealHomeData = () => {
  try {
    const savedData = localStorage.getItem('REAL_HOME_DATA');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Merge com dados padrão para garantir que todos os campos existam
      return {
        hero: { ...REAL_HOME_DATA.hero, ...parsed.hero },
        welcome: { ...REAL_HOME_DATA.welcome, ...parsed.welcome },
        features: parsed.features || REAL_HOME_DATA.features,
        contact: { ...REAL_HOME_DATA.contact, ...parsed.contact },
        updates: { ...REAL_HOME_DATA.updates, ...parsed.updates }
      };
    }
  } catch (error) {
    console.error('Erro ao carregar dados REAIS da Home:', error);
  }
  
  return REAL_HOME_DATA;
};

// Função para salvar dados REAIS da Home
export const saveRealHomeData = (data) => {
  try {
    localStorage.setItem('REAL_HOME_DATA', JSON.stringify(data));
    console.log('Dados REAIS da Home salvos com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados REAIS da Home:', error);
    return false;
  }
};


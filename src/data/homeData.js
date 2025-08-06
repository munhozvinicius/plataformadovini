// Dados centralizados da página Home
export const defaultHomeData = {
  hero: {
    title: "Plataforma do Vini",
    subtitle: "Central Comercial", 
    description: "Sua central de produtos e serviços Vivo para empresas"
  },
  
  welcome: {
    title: "Sua nova central de inteligência comercial",
    message: "Olá, consultor Vivo! Seja muito bem-vindo ao sistema que vai transformar seu dia a dia em vendas. Aqui, tudo o que você precisa está reunido num só lugar."
  },
  
  features: [
    {
      id: "agentes",
      icon: "Bot",
      title: "Agentes Especialistas 24/7",
      description: "Um time virtual especializado em cada produto Vivo — Internet Dedicada, Voz, SIP Trunk, SD-WAN, Segurança, Microsoft 365 e muito mais — disponível sempre que você precisar.",
      gradient: "gradient-purple"
    },
    {
      id: "precos", 
      icon: "DollarSign",
      title: "Preços Sempre Atualizados",
      description: "Tarifas negociadas em tempo real, sem planilhas ou trocas de e-mail: consulte valores e condições com um só clique.",
      gradient: "gradient-silver"
    },
    {
      id: "interface",
      icon: "Zap", 
      title: "Interface Ágil e Intuitiva",
      description: "Compare pacotes, simule cenários e gere propostas em segundos — ganhe tempo para atender ainda mais clientes.",
      gradient: "gradient-purple"
    }
  ],
  
  contact: {
    phone: "(11) 99999-9999",
    email: "contato@plataformadovini.com.br",
    address: "São Paulo, SP - Brasil"
  },
  
  updates: {
    title: "Última Atualização",
    description: "Sistema atualizado com novas funcionalidades e melhorias na interface. Confira os novos recursos disponíveis na área administrativa.",
    date: "31/07/2025"
  }
};

// Função para carregar dados da Home (localStorage + defaults)
export const loadHomeData = () => {
  try {
    const savedData = localStorage.getItem('home-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Merge com dados padrão para garantir que todos os campos existam
      return {
        hero: { ...defaultHomeData.hero, ...parsed.hero },
        welcome: { ...defaultHomeData.welcome, ...parsed.welcome },
        features: parsed.features || defaultHomeData.features,
        contact: { ...defaultHomeData.contact, ...parsed.contact },
        updates: { ...defaultHomeData.updates, ...parsed.updates }
      };
    }
  } catch (error) {
    console.error('Erro ao carregar dados da Home:', error);
  }
  
  return defaultHomeData;
};

// Função para salvar dados da Home
export const saveHomeData = (data) => {
  try {
    localStorage.setItem('home-data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados da Home:', error);
    return false;
  }
};

